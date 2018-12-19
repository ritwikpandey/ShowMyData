package com.wells.digital.personalization.recommendation.user;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class UserBasedRecommendation {

	private String inputFileName;
	private String userId;
	private String productId;
	private List<List<String>> dataset;
	private Map<String, Map<String, List<Float>>> userDataset;
	private Map<String, Map<String, List<Float>>> productDataset;
	private int k;

	@Autowired
	private MongoConnector mongoConnector;

	public static void main(String[] args) throws FileNotFoundException {
		String inputFileName = "data.tsv";
		String userId = "A";
		String productId = "M14";
		int k = 2;
		UserBasedRecommendation ubr = new UserBasedRecommendation(inputFileName, userId, productId, k);
		ubr.validateInputParameters(inputFileName, userId, productId, k);
		Map<String, Double> nearestNeighbors = ubr.kNearestNeighbors(userId, k);
		Double prediction = ubr.predict(userId, productId, nearestNeighbors);
		ubr.display(nearestNeighbors, prediction);
	}

	public void generatePredictions() {
		int k = Constants.NEAREST_NEIGHBORS;
		loadDataFromMongo();
		updateRecommendedProducts();
	}

	private void updateNearestNeighbors(String userId, Map<String, Double> nearestNeighbors) {
		Document filter = new Document();
		filter.append("userId", userId);
		Document neighbors = new Document();
		Document update = new Document();
		neighbors.append("neighbors", nearestNeighbors);
		update.append("$set", neighbors);
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).updateOne(filter, update);
	}

	private void updateRecommendedProducts() {
		for (Entry<String, Map<String, List<Float>>> entry : userDataset.entrySet()) {
			Map<String, Double> nearestNeighbors = kNearestNeighbors(entry.getKey(), k);
			Map<String, Double> productsLikelihood = new HashMap<>();
			for (Entry<String, List<Float>> prods : entry.getValue().entrySet()) {
				Double prediction = predict(entry.getKey(), prods.getKey(), nearestNeighbors);
				productsLikelihood.put(prods.getKey(), prediction);
			}
			// Sort prodsLikelihood in reverse order of likelihood score for each product.
			productsLikelihood = sortMapByValueReverse(productsLikelihood);
			Document filter = new Document();
			filter.append("userId", entry.getKey());
			Document update = new Document();
			Document likes = new Document();
			likes.append("likelihood", productsLikelihood);
			update.append("$set", likes);
			mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).updateOne(filter, update);
			updateNearestNeighbors(entry.getKey(), nearestNeighbors);
		}
	}

	private void loadDataFromMongo() {
		userDataset = new HashMap<>();
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find()
				.iterator();
		while (cursor.hasNext()) {
			Document doc = cursor.next();
			String userId = doc.getString("userId");
			Map<String, Double> productScore = (Map<String, Double>) doc.get("score");

			for (Entry<String, Double> entry : productScore.entrySet()) {
				if (userDataset.containsKey(userId)) {
					if (userDataset.get(userId).containsKey(entry.getKey())) {
						userDataset.get(userId).get(entry.getKey()).add(new Float(entry.getValue()));
					} else {
						List<Float> score = new ArrayList<Float>();
						score.add(new Float(entry.getValue()));
						userDataset.get(userId).put(entry.getKey(), score);
					}
				} else {
					Map<String, List<Float>> prods = new HashMap<String, List<Float>>();
					List<Float> score = new ArrayList<Float>();
					score.add(new Float(entry.getValue()));
					prods.put(userId, score);
					userDataset.put(userId, prods);
				}
			}
		}
	}

	UserBasedRecommendation() {

	}

	UserBasedRecommendation(String inputFileName, String userId, String productId, int k) {
		this.inputFileName = inputFileName;
		this.userId = userId;
		this.productId = productId;
		this.k = k;
	}

	private boolean validateInputParameters(String inputFileName, String userId, String productId, int k)
			throws FileNotFoundException {
		boolean validated = false;
		if (inputFileName != null && inputFileName.length() < 1) {
			System.out.println("Invalid name provided for file");
			return validated;
		}
		File inputFile = new File(inputFileName);
		if (!inputFile.exists() || inputFile.isDirectory() || inputFile.length() <= 0) {
			System.out.println("Input file path is incorrect or a directory or an empty file");
			return validated;
		}

		loadData(inputFile);

		if (!userDataset.containsKey(userId)) {
			System.out.println("User does not exist in input data set.");
			return validated;
		}

		/*
		 * if(!productDataset.containsKey(productId)) {
		 * System.out.println("Product does not exist in the input data set."); return
		 * validated; }
		 */
		validated = true;
		return validated;
	}

	private void loadData(File inputFile) throws FileNotFoundException {
		dataset = new ArrayList<List<String>>();
		userDataset = new HashMap<>();
		productDataset = new HashMap<>();
		Scanner scanner = new Scanner(inputFile);
		String line = "";
		while (scanner.hasNextLine()) {
			line = scanner.nextLine();
			String[] cols = line.split("\t");
			List<String> row = new ArrayList<>();
			row.add(cols[0]);
			row.add(cols[2]);
			row.add(cols[1]);
			dataset.add(row);
			Map<String, List<Float>> map = new HashMap<String, List<Float>>();
			if (userDataset.containsKey(cols[0])) {
				if (userDataset.get(cols[0]).containsKey(cols[2])) {
					userDataset.get(cols[0]).get(cols[2]).add(Float.parseFloat(cols[1]));
				} else {
					List<Float> score = new ArrayList<Float>();
					score.add(Float.parseFloat(cols[1]));
					userDataset.get(cols[0]).put(cols[2], score);
				}
			} else {
				Map<String, List<Float>> prods = new HashMap<String, List<Float>>();
				List<Float> score = new ArrayList<Float>();
				score.add(Float.parseFloat(cols[1]));
				prods.put(cols[0], score);
				userDataset.put(cols[0], prods);
			}
			// productDataset.put(cols[2], new HashMap<>(cols[0], cols[1]));
		}
	}

	public Map<String, Double> kNearestNeighbors(String userId, int k) {
		Map<String, Double> neighbors = new HashMap<String, Double>();
		Map<String, Double> result = new LinkedHashMap<String, Double>();
		for (Entry<String, Map<String, List<Float>>> entry : userDataset.entrySet()) {
			if (userId == entry.getKey())
				continue;
			Double upc = pearsonCorrelation(userId, entry.getKey());
			neighbors.put(entry.getKey(), upc);
		}
		neighbors = sortMapByValueReverse(neighbors);
		int i = 0;
		for (Entry<String, Double> en : neighbors.entrySet()) {
			if (i >= neighbors.size())
				break;
			result.put(en.getKey(), en.getValue());
			i++;
		}
		return result;
	}

	public Map<String, Double> sortMapByValueReverse(Map<String, Double> neighbors) {
		Map<String, Double> sorted = neighbors.entrySet().stream()
				.sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
		return sorted;
	}

	// Passing user ids of user 1 and 2.
	public Double pearsonCorrelation(String user1, String user2) {
		Double result = 0.0;
		Map<String, List<Float>> user1Data = this.userDataset.get(user1);
		Map<String, List<Float>> user2Data = this.userDataset.get(user2);
		float rx_avg = userAverageScore(user1Data);
		Float ry_avg = userAverageScore(user2Data);
		List<String> sxy = commonItems(user1Data, user2Data);
		Float top_result = 0f;
		Double bottom_left_result = 0.0;
		Double bottom_right_result = 0.0;
		for (String prod : sxy) {
			Float rxs = user1Data.get(prod).get(0);
			Float rys = user2Data.get(prod).get(0);
			top_result += (rxs - rx_avg) * (rys - ry_avg);
			bottom_left_result += Math.pow((rxs - rx_avg), 2);
			bottom_right_result += Math.pow((rys - ry_avg), 2);
		}
		bottom_left_result = Math.sqrt(bottom_left_result);
		bottom_right_result = Math.sqrt(bottom_right_result);
		result = top_result / (bottom_left_result * bottom_right_result);
		return result;
	}

	public float userAverageScore(Map<String, List<Float>> userData) {
		Float avgScore = 0f;
		int size = userData.size();
		for (Entry<String, List<Float>> entry : userData.entrySet()) {
			avgScore += entry.getValue().get(0);
		}
		avgScore /= size;
		return avgScore;
	}

	public List<String> commonItems(Map<String, List<Float>> user1Data, Map<String, List<Float>> user2Data) {
		List<String> result = new ArrayList<String>();
		Map<String, Integer> ht = new HashMap<String, Integer>();
		for (Entry<String, List<Float>> entry : user1Data.entrySet()) {
			if (!ht.containsKey(entry.getKey()))
				ht.put(entry.getKey(), 0);
			ht.put(entry.getKey(), ht.get(entry.getKey()) + 1);
		}

		for (Entry<String, List<Float>> entry : user2Data.entrySet()) {
			if (!ht.containsKey(entry.getKey()))
				ht.put(entry.getKey(), 0);
			ht.put(entry.getKey(), ht.get(entry.getKey()) + 1);
		}

		for (Entry<String, Integer> entry : ht.entrySet()) {
			if (entry.getValue() == 2) {
				result.add(entry.getKey());
			}
		}
		return result;
	}

	public Double predict(String userId, String productId, Map<String, Double> kNearestNeighbors) {
		Map<String, Double> validNeighbors = checkNeighborsValidation(productId, kNearestNeighbors);
		if (validNeighbors.size() <= 0)
			return -0.01;
		Double topResult = 0.0;
		Double bottomResult = 0.0;
		Double result = 0.0;
		for (Entry<String, Double> e : validNeighbors.entrySet()) {
			String neighborId = e.getKey();
			Double neighborSimilarity = e.getValue();
			Double score = new Double(userDataset.get(neighborId).get(productId).get(0));
			topResult += (neighborSimilarity * score);
			bottomResult += neighborSimilarity;
		}
		result = topResult / bottomResult;
		return result;
	}

	public Map<String, Double> checkNeighborsValidation(String productId, Map<String, Double> kNearestNeighbors) {
		Map<String, Double> result = new LinkedHashMap<>();
		for (Entry<String, Double> e : kNearestNeighbors.entrySet()) {
			if (userDataset.get(e.getKey()).keySet().contains(productId)) {
				result.put(e.getKey(), e.getValue());
			}
		}
		return result;
	}

	public void display(Map<String, Double> kNearestNeighbors, Double prediction) {
		for (Entry<String, Double> e : kNearestNeighbors.entrySet()) {
			System.out.print("    " + e.getKey());
			System.out.println("     " + e.getValue());
		}
		System.out.println(prediction);
	}

}