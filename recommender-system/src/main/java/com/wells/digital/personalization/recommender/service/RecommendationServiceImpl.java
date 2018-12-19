package com.wells.digital.personalization.recommender.service;

import java.util.ArrayList;
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
//					recent = recent.subList(recent.size() - 5, recent.size() - 1);
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
		if(newCookie)
			return getProducts(guestRecommendationService.getSuggestedProductIds(userId));
		Map<String, Double> likes = new HashMap<>();
		List<Document> products = new ArrayList<>();
		MongoCursor<Document> cursor = 
				mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find(new Document("cookieId", userId)).iterator();
		while(cursor.hasNext()) {
			Document doc = cursor.next();
			likes = (Map<String, Double>) doc.get("likelihood");
		}
		if(likes!=null)
		for(Entry<String, Double> e: likes.entrySet()) {
			if(e.getValue()>=Double.parseDouble(cutoffUserLikelihood)) {
				products.add(fetchProductById(e.getKey()));
			}
		}
		String productsToDisplay = new Gson().toJson(products);
		return productsToDisplay;
	}
	
	private String getProducts(List<String> productIds){
		List<Document> products = new ArrayList<>();
		for(String productId:productIds) {
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
		if(notRecent) {
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
	
}
