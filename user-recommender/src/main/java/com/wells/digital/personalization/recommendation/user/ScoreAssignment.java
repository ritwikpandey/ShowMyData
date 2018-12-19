package com.wells.digital.personalization.recommendation.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class ScoreAssignment {

	
	@Autowired
	private MongoConnector mongoConnector;
	
	public void updateScoreForUsers() {
		// Fetch all users
		MongoCursor<Document> cursor = 
				mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find().iterator();
		while(cursor.hasNext()) {
			Document doc = cursor.next();
			Map<String, Double> productScore = assignScore(doc.getString("userId"));
			Document filter = new Document();
			filter.append("userId", doc.getString("userId"));
			Document update = new Document();
			Document score = new Document();
			score.append("score", productScore);
			update.append("$set", score);
			mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).updateOne(filter, update);
		}
	}
	
	public Map<String, Double> assignScore(String userId) {
		Map<String, Double> weights = getWeightsForActivities();
		// Sum all activity types of productActivityCount.
		Map<String, Double> productScore = new HashMap<>();
		// Map of product -> (Activity->Count)
		Map<String, Map<String, Double>> productActivityCount = getProductActivityCount(userId, weights, productScore);
		return productScore;
	}

	private Map<String, Map<String, Double>> getProductActivityCount(String userId, Map<String, Double> weights,
			Map<String, Double> productScore) {
		Map<String, Map<String, Double>> productActivityCount = new HashMap<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_ACTIVITY)
				.find(new Document("userId", userId)).iterator();
		while (cursor.hasNext()) {
			Document document = cursor.next();
			List<Document> activities = (List<Document>) document.get("recentActivities");
			if(activities==null) {
				activities = new ArrayList<>();
			}
			for (Document doc : activities) {
				String productId = doc.getString("productId");
				String activityType = doc.getString("activityType");
				if (!productActivityCount.containsKey(productId)) {
					Map<String, Double> activityTypes = new HashMap<>();
					productActivityCount.put(productId, activityTypes);
				}
				if (!productActivityCount.get(productId).containsKey(activityType)) {
					productActivityCount.get(productId).put(activityType, 0.0);
				}
				productActivityCount.get(productId).put(activityType,
						productActivityCount.get(productId).get(activityType) + 1);
			}
		}
		
		// Multiply by weights assigned to each activity
		for(Entry<String, Map<String, Double>> e: productActivityCount.entrySet()) {
			productScore.put(e.getKey(), 0.0);
			for(Entry<String, Double> e1:e.getValue().entrySet()) {
				e1.setValue(weights.get(e1.getKey())*e1.getValue());
				productScore.put(e.getKey(), productScore.get(e.getKey()) + e1.getValue());
			}
		}
		return productActivityCount;
	}

	private Map<String, Double> getWeightsForActivities() {
		Map<String, Double> weights = new HashMap<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_PARAMETERS).find().iterator();
		while(cursor.hasNext()) {
			Document document = cursor.next();
			List<Document> activityWeights = (List<Document>) document.get("weights");
			for(Document doc:activityWeights) {
				weights.put(doc.getString("activityType"), doc.getDouble("weight"));
			}
		}
		return weights;
	}
}