package com.wells.digital.personalization.product.service;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class ProductServiceImpl implements ProductService {

	@Autowired
	private MongoConnector mongoConnector;
	
	@Override
	public String getAllProducts() {
		MongoDatabase db = mongoConnector.getConnection();
		MongoCursor<Document> cursor = db.getCollection("product").find().iterator();
		List<Document> products = new ArrayList<>();
		while(cursor.hasNext()) {
			Document product = cursor.next();
			products.add(product);
		}
		Gson gson = new Gson();
		String productsJson = "";
		productsJson = gson.toJson(products);
		return productsJson;
	}

	@Override
	public String getProductByProductId(String productId) {
		return null;
	}

	@Override
	public String getProductsByCategory(String categoryName, String value) {
		return null;
	}
}