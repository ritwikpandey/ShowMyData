package com.wells.digital.personalization.mongo.entity;

import java.util.Date;

import org.bson.Document;

public class ProductCount {

	private String productId;
	private int count;
	private Date lastViewed;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Date getLastViewed() {
		return lastViewed;
	}

	public void setLastViewed(Date lastViewed) {
		this.lastViewed = lastViewed;
	}

	public Document getMongoDocument() {
		Document document = new Document();
		document.append("productId", productId);
		document.append("count", count);
		document.append("lastViewed", lastViewed);
		return document;
	}

	public ProductCount getObjectFromDocument(Document document) {
		this.setProductId(document.getString("productId"));
		this.setCount(document.getInteger("count", 1));
		this.setLastViewed(document.getDate("lastViewed"));
		return this;
	}
}
