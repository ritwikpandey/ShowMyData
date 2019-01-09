package com.wells.digital.personalization.mongo.entity;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

public class Activity {
	private String userId;
	private String cookieId;
	private List<RecentActivity> recentActivities;
	private List<ProductCount> productCounts;

	public String getCookieId() {
		return cookieId;
	}

	public void setCookieId(String cookieId) {
		this.cookieId = cookieId;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<RecentActivity> getRecentActivities() {
		return recentActivities;
	}

	public void setRecentActivities(List<RecentActivity> recentActivities) {
		this.recentActivities = recentActivities;
	}

	public List<ProductCount> getProductCounts() {
		return productCounts;
	}

	public void setProductCounts(List<ProductCount> productCounts) {
		this.productCounts = productCounts;
	}

	public Document getMongoDocument() {
		Document document = new Document();
		document.append("cookieId", cookieId);
		if (recentActivities == null) {
			recentActivities = new ArrayList<RecentActivity>();
		}
		document.append("recentActivities", getRecentActivitiesDocuments(recentActivities));
		if (productCounts == null) {
			productCounts = new ArrayList<ProductCount>();
		}
		document.append("productCounts", getProdCountDocuments(productCounts));
		return document;
	}

	private List<Document> getRecentActivitiesDocuments(List<RecentActivity> recentActivities) {
		List<Document> activityDocuments = new ArrayList<>();
		for (RecentActivity activity : recentActivities) {
			activityDocuments.add(activity.getMongoDocument());
		}
		return activityDocuments;
	}

	private List<Document> getProdCountDocuments(List<ProductCount> productCounts) {
		List<Document> productCountDocuments = new ArrayList<>();
		for (ProductCount productCount : productCounts) {
			productCountDocuments.add(productCount.getMongoDocument());
		}
		return productCountDocuments;
	}

	public void getObjectFromDocument(Document document) {
		this.setProductCounts(
				getproductCountsFromDocument(document.get("productCounts", List.class)));
		this.setRecentActivities(
				getrecentActivitiesFromDocument(document.get("recentActivities", List.class)));
		this.setUserId(document.getString("userId"));
		this.setCookieId(document.getString("cookieId"));
	}

	public List<ProductCount> getproductCountsFromDocument(List<Document> productCountDocuments) {
		List<ProductCount> productCounts = new ArrayList<>();
		if (productCountDocuments != null) {
			for (Document productCountDocument : productCountDocuments) {
				ProductCount productCount = new ProductCount();
				productCounts.add(productCount.getObjectFromDocument(productCountDocument));
			}
		}
		return productCounts;
	}
	
	private List<RecentActivity> getrecentActivitiesFromDocument(List<Document> recentActivityDocuments) {
		List<RecentActivity> recentActivities = new ArrayList<>();
		RecentActivity activity = new RecentActivity();
		if (recentActivityDocuments != null) {
			for (Document recentActivityDocument : recentActivityDocuments) {
				recentActivities.add(activity.getObjectFromDocument(recentActivityDocument));
			}
		}
		return recentActivities;
	}
}
