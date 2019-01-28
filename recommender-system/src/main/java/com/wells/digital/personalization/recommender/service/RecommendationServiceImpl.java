package com.wells.digital.personalization.recommender.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class RecommendationServiceImpl implements RecommendationService {

	@Autowired
	private MongoConnector mongoConnector;

	@Value("${cutoff.likelihood}")
	private String cutoffUserLikelihood;

	@Autowired
	private GuestRecommendationServiceImpl guestRecommendationService;

	@Override
	public String getRcentProducts(String userId, boolean notRecent) {
		String recentProducts = "{[]}";
		boolean showPopularProducts = true;
		MongoCollection<Document> collection = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_ACTIVITY);
		Document document = collection.find(new Document("cookieId", userId)).first();
		if (document != null) {
			List<Document> recent = document.get("recentActivities", List.class);
			List<Document> uniqueRecents = new ArrayList<>();
			Set<String> uniqueProductIds = new HashSet<>();
			if (recent != null) {
				if (recent.size() > 5) {
					// recent = recent.subList(recent.size() - 5, recent.size() - 1);
					for (int i = recent.size() - 1; i >= 0; i--) {
						String productId = recent.get(i).getString("productId");
						if (uniqueProductIds.add(productId)) {
							uniqueRecents.add(recent.get(i));
							if (uniqueRecents.size() >= 5)
								break;
						}
					}
					showPopularProducts = false;
				} else if (recent.size() > 0) {
					showPopularProducts = false;
				}
				recentProducts = getProductDetails(recent, notRecent);
			}
		}

		if (showPopularProducts) {
			recentProducts = getPopularProducts();
		}
		return recentProducts;
	}

	@Override
	public String getProductRecommendations(String userId) {
		return "{[]}";
	}

	@Override
	public String getUserRecommendations(String userId) {
		boolean newCookie = isNewCookie(userId);
		if (newCookie)
			return getProducts(guestRecommendationService.getSuggestedProductIds(userId));
		Map<String, Double> likes = new HashMap<>();
		List<Document> products = new ArrayList<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER)
				.find(new Document("cookieId", userId)).iterator();
		while (cursor.hasNext()) {
			Document doc = cursor.next();
			likes = (Map<String, Double>) doc.get("likelihood");
		}
		if (likes != null)
			for (Entry<String, Double> e : likes.entrySet()) {
				if (e.getValue() >= Double.parseDouble(cutoffUserLikelihood)) {
					products.add(fetchProductById(e.getKey()));
				}
			}
		String productsToDisplay = new Gson().toJson(products);
		return productsToDisplay;
	}

	private String getProducts(List<String> productIds) {
		List<Document> products = new ArrayList<>();
		for (String productId : productIds) {
			products.add(fetchProductById(productId));
		}
		return new Gson().toJson(products);
	}

	private boolean isNewCookie(String userId) {
		long userCount = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER)
				.count(new Document("cookieId", userId));
		return userCount > 0 ? false : true;

	}

	// TODO Implement this
	private String getPopularProducts() {
		return "[]";
	}

	private String getProductDetails(List<Document> recentActivities, boolean notRecent) {
		List<Document> products = new ArrayList<>();
		for (Document activity : recentActivities) {
			String productId = activity.getString("productId");
			// TODO Skip processing if product id already exists.
			Document product = fetchProductById(productId);
			if (product != null) {
				products.add(product);
			}
		}
		if (notRecent) {
			Collections.shuffle(products);
		}
		String productsToDisplay = new Gson().toJson(products);
		return productsToDisplay;
	}

	private Document fetchProductById(String productId) {
		MongoCollection<Document> collection = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_PRODUCT);
		MongoCursor<Document> cursor = collection.find().iterator();
		while (cursor.hasNext()) {
			Document currentProduct = cursor.next();
			if (currentProduct.getString("productId").equals(productId)) {
				return currentProduct;
			} else if (productId.contains(currentProduct.getString("productId"))) {
				currentProduct = searchProduct(currentProduct, false, productId);
				if (currentProduct != null) {
					return currentProduct;
				}
			}
		}
		return null;
	}

	private Document searchProduct(Document currentProduct, boolean found, String productId) {
		if (currentProduct.getString("productId").equals(productId)) {
			found = true;
			return currentProduct;
		}
		if ((productId.contains(currentProduct.getString("productId"))) && currentProduct.get("hierarchy") != null) {
			List<Document> products = currentProduct.get("hierarchy", List.class);
			for (Document product : products) {
				if (productId.contains(product.getString("productId"))) {
					return searchProduct(product, false, productId);
				}
			}
		}
		return null;
	}

	@Override
	public String getContentRecommendations(String cookieId) {
		int lastItemLevel = -1;
		String recommendedContentId = "";
		List<Map<String, String>> browsedItems = getBrowsedItems(cookieId);
		Map<String, String> lastItem = new HashMap<>();
		// To contain list of content ids user has already seen and clicked
		List<String> displayedContentIds = new ArrayList<>();
		if (browsedItems != null && browsedItems.size() > 0) {
			lastItem = browsedItems.get(browsedItems.size() - 1);
			for (Map<String, String> content : browsedItems) {
				displayedContentIds.add(content.get("contentId"));
			}
		}
		if (lastItem.get("level") != null) {
			lastItemLevel = Integer.parseInt(lastItem.get("level"));
			if (lastItemLevel < 2) {
				recommendedContentId = lastItem.get("contentId");
			}
			else {
				lastItemLevel = -1;
			}
		}
		Map<String, String> segments = new HashMap<>();
		if (recommendedContentId.equalsIgnoreCase("")) {
			// Equivalent to making call to DMP service.
			segments = getCookieSegments(cookieId);
			if(segments!=null && segments.get("segment")!=null) {
				List<String> seg = Arrays.asList(segments.get("segment").split("_"));
				recommendedContentId = getMatchingContentId(seg, displayedContentIds);
			}
		}
		if(recommendedContentId==null || recommendedContentId.equalsIgnoreCase(""))
			recommendedContentId = "mortgage_temp1_laptop";
		Document doc = getContent(recommendedContentId);
		if(lastItemLevel!=-1) {
			doc.put("level", lastItemLevel);
		}
		fillPlaceHolders(doc, segments);
		return new Gson().toJson(doc);
	}

	private void fillPlaceHolders(Document doc, Map<String, String> segments) {
		String price = "";
		if (doc != null && doc.get("data") != null) {
			if(segments.get("price")!=null) {
				price = segments.get("price").split("-")[0];
			}
			if(price.equalsIgnoreCase(""))
				price = "240000";
			Document data = (Document) doc.get("data");
			if (data.get("loanAmount") != null) {
				data.put("loanAmount", price);
			}
			if (data.get("emi") != null) {
				Double amt = Double.parseDouble(price);
				amt = amt*0.8;
				Double emi = (amt*(.045/12)*(Math.pow((1+(.045)/12), 360)))/Math.pow((1+(.045)/12), 360-1);
				DecimalFormat df = new DecimalFormat("##.## ");
				data.put("emi", df.format(emi));
			}
		}
	}

	private Document getContent(String recommendedContentId) {
		Document doc = new Document();
		Document filter = new Document();
		filter.append("contentId", recommendedContentId);
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_CONTENT).find(filter)
				.iterator();
		if (cursor.hasNext()) {
			doc = cursor.next();
		}
		return doc;
	}

	private String getMatchingContentId(List<String> seg, List<String> displayedContentIds) {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_CONTENT).find()
				.iterator();
		int count = 0;
		int maxCount = 0;
		int bestContentTotalCount = 0;
		String bestContentId = "";
		while (cursor.hasNext()) {
			count = 0;
			Document document = cursor.next();
			String contentId = document.getString("contentId");
			List<String> contentTags = Arrays.asList(contentId.split("_"));
			for (String s : seg) {
				if (contentTags.contains(s))
					count++;
			}
			if ((count >= maxCount) && !(displayedContentIds.contains(contentId))) {
				if(count==maxCount && contentTags.size()>bestContentTotalCount) {
					continue;
				}
				maxCount = count;
				bestContentId = contentId;
				bestContentTotalCount = contentTags.size();
			}
		}
		return bestContentId;
	}

	private List<Map<String, String>> getBrowsedItems(String cookieId) {
		List<Map<String, String>> history = new ArrayList<>();
		Document filter = new Document();
		filter.append("cookieId", cookieId);
		MongoCursor<Document> cursor = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_RECOMMENDATION_HISTORY).find(filter).iterator();
		if (cursor.hasNext()) {
			Document doc = cursor.next();
			history = (List<Map<String, String>>) doc.get("history");
		}
		return history;
	}

	private Map<String, String> getCookieSegments(String cookieId) {
		Map<String, String> attributes = new HashMap<>();
		Document filter = new Document();
		filter.append("cookieId", cookieId);
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_SEGMENT)
				.find(filter).iterator();
		if (cursor.hasNext()) {
			Document document = cursor.next();
			attributes = (Map<String, String>) document.get("attributes");
		}
		return attributes;
	}

}
