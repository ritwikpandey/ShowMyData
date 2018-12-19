package com.wells.digital.personalization.recommender.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.ThresholdUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.UserBasedRecommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class UserRecommendation {

	@Autowired
	private MongoConnector mongoConnector;

	public Map<String, Integer> getMostLikedProductsByUser(String userId) {
		mongoConnector.getConnection().getCollection("");
		return null;
	}
	
	UserBasedRecommender recommender;
	public void trainUserModel() throws TasteException, IOException {
		DataModel model = new FileDataModel(new File("userProducts.csv"));
		UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
		UserNeighborhood neighborhood = new ThresholdUserNeighborhood(0.1, similarity, model);
		recommender = new GenericUserBasedRecommender(model, neighborhood, similarity);

	}

	public void getRecommendations() throws TasteException {
		List<RecommendedItem> recommendations = recommender.recommend(1099, 3);
		for (RecommendedItem recommendation : recommendations) {
			System.out.println(recommendation);
		}
	}
	
	public static void main(String[] args) throws TasteException, IOException {
		UserRecommendation ur = new UserRecommendation();
		ur.trainUserModel();
		ur.getRecommendations();
	}
}
