package com.wells.digital.personalization.mongo.connector;


import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

/*
 * Provides connection to MongoDB.
 */
@Component
public class MongoConnector {

	@Value("${mongo.host}")
	private String host;

	@Value("${mongo.port}")
	private String port;

	@Value("${mongo.db}")
	private String database;


	private MongoClient mongo = null;
	private static String className = MongoConnector.class.getCanonicalName();

	/* @PostConstruct */
	private synchronized void initializeMongoClient() {
		if (mongo == null) {
			System.out.println("Initializing Mongo client for host: " + host + " and port : " + port);
			System.out.println("Host : " + host);
			System.out.println("Port : " + port);
			mongo = new MongoClient(host, Integer.parseInt(port));
			System.out.println("Mongo client initialized");
		}
	}

	public MongoDatabase getConnection() {
		initializeMongoClient();
		return mongo.getDatabase(database);
	}

	@PreDestroy
	public void closeConnection() {
		mongo.close();
	}

}
