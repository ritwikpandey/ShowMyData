package com.wells.digital.personalization.recommender.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.activity.service.ActivityService;
import com.wells.digital.personalization.cookie.service.CookieService;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;
import com.wells.digital.personalization.mongo.entity.Activity;
import com.wells.digital.personalization.mongo.entity.ProductCount;

@Component
public class GuestRecommendationServiceImpl {

	@Autowired
	private CookieService cookieService;

	@Autowired
	private MongoConnector mongoConnector;
	
	@Autowired
	private ActivityService activityService;

	public void createUserProfile(String cookieId) {

	}

	public List<String> getSuggestedProductIds(String cookieId) {
		// Returns attributes for the user's search in web
		Map<String, String> attributes = cookieService.getSegmentId(cookieId);
		Map<String, List<String>> userAttributes = new HashMap<>();
		Map<String, Map<String, String>> cookieAttributes = getCookieAttributes();
		for (Entry<String, String> e : attributes.entrySet()) {
			if (e.getValue().contains("-")) {
				String[] range = e.getValue().split("-");
				List<String> values = new ArrayList<String>();
				values.add(range[0]);
				values.add(range[1]);
				userAttributes.put(e.getKey(), values);
			}
		}
		Map<String, Double> neighbors = getCloseUsers(userAttributes, cookieAttributes);
		//List<String> productIds = getProductsHeld(neighbors);
		List<String> productIds = getVisitedProductsForNeighbors(neighbors);
		if(productIds.isEmpty()) {
			productIds = getTopProducts();
		}
		return productIds;
	}

	private List<String> getTopProducts() {
		Document filter = new Document();
		Document nestedFilter = new Document();
		nestedFilter.append("$ne", null);
		filter.append("likelihood", nestedFilter);
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find(filter).iterator();
		Map<String,Double> products = new HashMap<>();
		while(cursor.hasNext()) {
			Document document = cursor.next();
			Map<String, Double> newProducts = (Map<String, Double>) document.get("likelihood");
			for(Entry<String, Double> entry:newProducts.entrySet()) {
				if(!products.containsKey(entry.getKey())){
					products.put(entry.getKey(), 0.0);
				}
				products.put(entry.getKey(), products.get(entry.getKey())+entry.getValue());
			}
		}
		products = sortMapByValueReverse(products);
		return new ArrayList(products.keySet());
	}

	// TODO check if it is user id or cookie id
	private List<String> getVisitedProductsForNeighbors(Map<String,Double> neighbors) {
		Map<String, Double> products = new HashMap<>();
		for (Entry<String, Double> e : neighbors.entrySet()) {
			if (e.getValue() > 0) {
				String userId = activityService.getUserIdForCookieId(e.getKey());
				MongoCursor<Document> cursor = mongoConnector.getConnection()
						.getCollection(Constants.COLLECTION_ACTIVITY).find(new Document("userId", userId)).iterator();
				if (cursor.hasNext()) {
					Document document = cursor.next();
					List<ProductCount> productCounts = new Activity()
							.getproductCountsFromDocument(document.get("productCounts", List.class));
					for (ProductCount product : productCounts) {
						if (!products.containsKey(product.getProductId())) {
							products.put(product.getProductId(), product.getCount() * e.getValue());
						} else
							products.put(product.getProductId(),
									products.get(product.getProductId()) + product.getCount() * e.getValue());
					}
				}
			}
		}
		products = sortMapByValueReverse(products);
		for(Entry<String, Double> p:products.entrySet()) {
			if(p.getValue()<0)
				products.remove(p.getKey());
		}
		return new ArrayList(products.keySet());
	}
	
	private List<String> getProductsHeld(Map<String, Double> neighbors) {
		List<String> productIds = new ArrayList<>();
		for(Entry<String, Double> e: neighbors.entrySet()) {
			if(e.getValue()>0.0) {
				MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find(new Document("cookieId", e.getKey())).iterator();
				if(cursor.hasNext()) {
					Document doc = cursor.next();
					productIds.addAll((List<String>)doc.get("products"));
				}
			}
		}
		return productIds;
	}

	// Returns the close users id with the score of neighborhood
	private Map<String, Double> getCloseUsers(Map<String, List<String>> userAttributes, Map<String, Map<String, String>> cookieAttributes) {
		Map<String, Double> neighbors = new HashMap<>();
		for (Entry<String, Map<String, String>> entry : cookieAttributes.entrySet()) {
			Map<String, String> currentUserAttributes = entry.getValue();
			// Insert user's cookie id and initialize the similarity score to 0.
			neighbors.put(entry.getKey(), 0.0);
			for (Entry<String, String> e : currentUserAttributes.entrySet()) {
				if (userAttributes.get(e.getKey()) == null)
					neighbors.put(entry.getKey(), neighbors.get(entry.getKey()) - 0.5);
				else {
					if (isInRange(e.getKey(), e.getValue(), userAttributes.get(e.getKey()))) {
						neighbors.put(entry.getKey(), neighbors.get(entry.getKey()) + 4.0);
					}
				}
			}
		}
		neighbors = sortMapByValueReverse(neighbors);
		return neighbors;
	}
	
	public Map<String, Double> sortMapByValueReverse(Map<String, Double> neighbors) {
		Map<String, Double> sorted = neighbors.entrySet().stream()
				.sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
		return sorted;
	}

	private boolean isInRange(String attribute, String currentUserAttributeValue, List<String> prospectRange) {
		try {
			switch (attribute) {
			case "zipcode":
				if (prospectRange.size() >= 1) {
					if (Double.parseDouble(prospectRange.get(0)) - Double.parseDouble(currentUserAttributeValue) < 5)
						return true;
				}
				return false;
			case "price":
				if (prospectRange.size() >= 2) {
					if (Double.parseDouble(prospectRange.get(0)) <= Double.parseDouble(currentUserAttributeValue)
							&& Double.parseDouble(currentUserAttributeValue) <= Double
									.parseDouble(prospectRange.get(1)))
						return true;
				}
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return false;
	}

	// Returns the attributes of all the cookies which have a valid userId and
	// product attributes available.
	private Map<String, Map<String, String>> getCookieAttributes() {
		Map<String, Map<String, String>> map = new HashMap<>();
		Map<String, List<String>> userAttributes = new HashMap<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find()
				.iterator();
		while (cursor.hasNext()) {
			Document doc = cursor.next();
			if (doc.getString("userId") == null)
				continue;
			Map<String, String> productAttributes = (Map<String, String>) doc.get("productAttributes");
			if (productAttributes == null || productAttributes.size() <= 0)
				continue;
			List<String> cookieIds = (List<String>) doc.get("cookieId");
			for(String cookie:cookieIds) {
				map.put(cookie, productAttributes);
			}
		}
		return map;
	}

	private List<String> getCookieIds() {
		List<String> cookies = new ArrayList<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find()
				.iterator();
		while (cursor.hasNext()) {
			Document doc = cursor.next();
			cookies.addAll((List<String>)doc.get("cookieId"));
		}
		return cookies;
	}

}