package com.wells.digital.personalization.activity.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;
import com.wells.digital.personalization.mongo.entity.Activity;
import com.wells.digital.personalization.mongo.entity.ActivityRequest;
import com.wells.digital.personalization.mongo.entity.ProductCount;
import com.wells.digital.personalization.mongo.entity.RecentActivity;
import com.wells.digital.personalization.mongo.entity.UserProfile;
import com.wells.digital.personalization.mongo.entity.Utility;

@Component
public class ActivityServiceImpl implements ActivityService {

	@Autowired
	private MongoConnector mongoConnector;

	@Override
	public void addUserActivity(ActivityRequest activityRequest) {

		// Means user is coming for the first time, hence activity will not be stored.
		//TODO
		if(!setUserIdInActivity(activityRequest)) {
			createNewUser(activityRequest);
		}
		
		MongoCollection<Document> collection = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_ACTIVITY);

		Activity activity = new Activity();

		// Create a new document for recent activity.
		RecentActivity recentActivity = populateRecentActivity(activityRequest);

		// If no entry is present for specific user's activity, create a new document.
		if (!collection.find(new Document("cookieId", activityRequest.getCookieId())).iterator().hasNext()) {
			createActivity(activityRequest, activity, recentActivity, collection);
		} else {
			updateActivity(activityRequest, activity, recentActivity, collection);
		}
	}

	// Create a new user in ODS table and store the details
	private void createNewUser(ActivityRequest activityRequest) {
		UserProfile userProfile = new UserProfile();
		List<String> cookies = new ArrayList<>();
		if(activityRequest.getCookieId()!=null)
			cookies.add(activityRequest.getCookieId());
		userProfile.setCookieId(cookies);
		List<String> ipAddresses = new ArrayList<>();
		if(activityRequest.getIpAddress()!=null)
			ipAddresses.add(activityRequest.getIpAddress());
		userProfile.setIpAddress(ipAddresses);
		List<String> deviceTypes = new ArrayList<>();
		if(activityRequest.getDeviceType()!=null)
			deviceTypes.add(activityRequest.getDeviceType());
		userProfile.setDeviceType(deviceTypes);
		List<String> macIds = new ArrayList<>();
		if(activityRequest.getMacId()!=null)
			macIds.add(activityRequest.getMacId());
		userProfile.setDeviceId(macIds);
		String userId = String.valueOf(System.currentTimeMillis());
		userProfile.setUserId(userId);
		
		MongoCollection<Document> collection = mongoConnector.getConnection()
				.getCollection(Constants.COLLECTION_USER_PROFILE_ODS);
		
		collection.insertOne(userProfile.getMongoDocument());
	}

	private boolean setUserIdInActivity(ActivityRequest activityRequest) {
		String userId = getUserIdForCookie(activityRequest.getCookieId());
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
		activity.setCookieId(activityRequest.getCookieId());
		// Insert the user activity in Mongo collection
		collection.insertOne(activity.getMongoDocument());
	}

	private void updateActivity(ActivityRequest activityRequest, Activity activity, RecentActivity recentActivity,
			MongoCollection<Document> collection) {
		// Create a new entry in recentActivity array.
		MongoCursor<Document> cursor = collection.find(new Document("cookieId", activityRequest.getCookieId())).iterator();
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
		else {
			cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER_PROFILE_ODS)
					.find(new Document("cookieId", cookieId)).iterator();
			if (cursor.hasNext()) {
				userId = cursor.next().getString("userId");
			}
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
	
	//TODO DELETEME
	@Override
	public void addUserActivityInRecommendationHistory(String cookieId, String contentId, String stage) {
		//Prepare history object to be pushed for user.
		Document activity = new Document();
		activity.append("time", new Date());
		activity.append("contentId", contentId);
		activity.append("level", stage);
		// Check if cookie id exists
		Document filter = new Document();
		filter.append("cookieId", cookieId);
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_RECOMMENDATION_HISTORY).find(filter).iterator();
		if(cursor.hasNext()) {
			Document currentDoc = cursor.next();
			//Update the level, if content id is already present.
			List<Document> history = (List<Document>) currentDoc.get("history");
			for(Document doc:history) {
				if(doc.getString("contentId").equalsIgnoreCase(contentId)) {
					doc.put("level", stage);
					updateLevel(currentDoc);
					return;
				}
			}
			// Update the existing document by pushing a new activity entry.
			addNewEntryforExistingCookie(currentDoc, activity);
		}
		else {
			// Create a new record for the cookie id.
			createDocumentInRecommendationHistory(activity, cookieId, contentId);
		}
	}
	
	private void updateLevel(Document currentDoc) {
		Document filter = new Document();
		filter.append("_id", currentDoc.get("_id"));
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_RECOMMENDATION_HISTORY).replaceOne(filter, currentDoc);
	}

	private void addNewEntryforExistingCookie(Document currentDoc, Document activity) {
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_RECOMMENDATION_HISTORY).
		updateOne(Filters.eq("_id", currentDoc.get("_id")),Updates.addToSet("history", activity));
	}

	private void createDocumentInRecommendationHistory(Document activity, String cookieId, String contentId) {
		Document document = new Document();
		document.append("cookieId", cookieId);
		List<Document> hist = new ArrayList<>();
		hist.add(activity);
		document.append("history", hist);
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_RECOMMENDATION_HISTORY).insertOne(document);		
	}
}