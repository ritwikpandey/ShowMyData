package com.wells.digital.personalization.mongo.entity;

import java.util.Date;

import org.bson.Document;

public class RecentActivity {
	private String productId;
	private String activityId;
	private Date timestamp;
	private String activityType;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getActivityId() {
		return activityId;
	}

	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getActivityType() {
		return activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public Document getMongoDocument() {
		Document document = new Document();
		document.append("productId", productId);
		document.append("activityId", activityId);
		document.append("activityType", activityType);
		document.append("timestamp", timestamp);
		return document;
	}

	public RecentActivity getObjectFromDocument(Document document) {
		RecentActivity recent = new RecentActivity();
		recent.setActivityId(document.getString("activityId"));
		recent.setActivityType(document.getString("activityType"));
		recent.setProductId(document.getString("productId"));
		recent.setTimestamp(document.getDate("timestamp"));
		return recent;
	}
}
