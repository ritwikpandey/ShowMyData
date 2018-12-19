package com.wells.digital.personalization.activity.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;
import com.wells.digital.personalization.mongo.entity.Activity;
import com.wells.digital.personalization.mongo.entity.ActivityRequest;
import com.wells.digital.personalization.mongo.entity.ProductCount;
import com.wells.digital.personalization.mongo.entity.RecentActivity;
import com.wells.digital.personalization.mongo.entity.Utility;

@Component
public class ActivityServiceImpl implements ActivityService {

	@Autowired
	private MongoConnector mongoConnector;

	@Override
	public void addUserActivity(ActivityRequest activityRequest) {

		// Means user is coming for the first time, hence activity will not be stored.
		//TODO
		if(!setUserIdInActivity(activityRequest))
			return;
		
		MongoCollection<Document> collection = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_ACTIVITY);

		Activity activity = new Activity();

		// Create a new document for recent activity.
		RecentActivity recentActivity = populateRecentActivity(activityRequest);

		// If no entry is present for specific user's activity, create a new document.
		if (!collection.find(new Document("userId", activityRequest.getUserId())).iterator().hasNext()) {
			createActivity(activityRequest, activity, recentActivity, collection);
		} else {
			updateActivity(activityRequest, activity, recentActivity, collection);
		}

	}

	private boolean setUserIdInActivity(ActivityRequest activityRequest) {
		String userId = getUserIdForCookie(activityRequest.getUserId());
		boolean setUserId = false;
		if(userId!=null) {
			activityRequest.setUserId(userId);
			setUserId = true;
		}
		return setUserId;
	}

	private void createActivity(ActivityRequest activityRequest, Activity activity, RecentActivity recentActivity,
			MongoCollection<Document> collection) {
		// Create a new document for user activity
		List<ProductCount> productCounts = new ArrayList<>();
		productCounts.add(setDefaultProductCount(activityRequest.getProductId()));
		activity.setProductCounts(productCounts);
		List<RecentActivity> recentActivities = new ArrayList<RecentActivity>();
		recentActivities.add(recentActivity);
		activity.setRecentActivities(recentActivities);
		activity.setUserId(activityRequest.getUserId());
		// Insert the user activity in Mongo collection
		collection.insertOne(activity.getMongoDocument());
	}

	private void updateActivity(ActivityRequest activityRequest, Activity activity, RecentActivity recentActivity,
			MongoCollection<Document> collection) {
		// Create a new entry in recentActivity array.
		MongoCursor<Document> cursor = collection.find(new Document("userId", activityRequest.getUserId())).iterator();
		Document document = cursor.next();
		activity.getObjectFromDocument(document);
		if (activity.getRecentActivities() == null) {
			activity.setRecentActivities(new ArrayList<RecentActivity>());
		}
		activity.getRecentActivities().add(recentActivity);

		// Increase the counter for product user has visited.
		boolean productNotUpdated = true;
		if (activity.getProductCounts() == null) {
			activity.setProductCounts(new ArrayList<ProductCount>());
		}
		for (ProductCount productCount : activity.getProductCounts()) {
			if (productCount.getProductId().equalsIgnoreCase(activityRequest.getProductId())) {
				productCount.setCount(productCount.getCount() + 1);
				productCount.setLastViewed(new Date());
				productNotUpdated = false;
				break;
			}
		}

		// If product is not present add a new entry for product.
		if (productNotUpdated) {
			ProductCount productCount = new ProductCount();
			productCount.setCount(1);
			productCount.setLastViewed(new Date());
			productCount.setProductId(activityRequest.getProductId());
			activity.getProductCounts().add(productCount);
		}
		collection.replaceOne(new Document().append("_id", document.get("_id")), activity.getMongoDocument());
	}

	private ProductCount setDefaultProductCount(String productId) {
		ProductCount productCount = new ProductCount();
		productCount.setCount(1);
		productCount.setLastViewed(new Date());
		productCount.setProductId(productId);
		return productCount;
	}

	private RecentActivity populateRecentActivity(ActivityRequest activityRequest) {
		RecentActivity recentActivity = new RecentActivity();
		recentActivity.setActivityId("ACT_" + Utility.getFormattedDate() + "_1");
		recentActivity.setActivityType(activityRequest.getActivityType());
		recentActivity.setProductId(activityRequest.getProductId());
		recentActivity.setTimestamp(new Date());
		// recentActivity.setVersionId(activityRequest.getVersionId());
		return recentActivity;
	}

	@Override
	public void resetActivityForUser(String cookieId) {
		String userId = getUserIdForCookie(cookieId);
		if (userId == null) {
			return;
		}
		Document filter = new Document("userId", userId);
		Document values = new Document();
		values.append("recentActivities", null);
		values.append("productCounts", null);
		Document update = new Document("$set", values);
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_ACTIVITY).updateOne(filter, update);
	}

	private String getUserIdForCookie(String cookieId) {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER)
				.find(new Document("cookieId", cookieId)).iterator();
		String userId = null;
		if (cursor.hasNext()) {
			userId = cursor.next().getString("userId");
		}
		return userId;
	}

	@Override
	public void resetAllActivities() {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find().iterator();
		while(cursor.hasNext()) {
			Document doc = cursor.next();
			if(doc.getString("cookieId")!=null) {
				resetActivityForUser(doc.getString("cookieId"));
			}
		}
	}
	
	public String getUserIdForCookieId(String cookieId) {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find(new Document("cookieId", cookieId)).iterator();
		String userId = "";
		if(cursor.hasNext()) {
			Document document = cursor.next();
			userId = document.getString("userId");
		}
		return userId;
	}

}