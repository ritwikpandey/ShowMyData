package com.wells.digital.personalization.mongo.entity;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

public class UserProfile {

	public String userId;
	public List<String> cookieId;
	public List<String> ipAddress;
	public List<String> deviceId;
	public List<String> deviceType;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<String> getCookieId() {
		return cookieId;
	}
	public void setCookieId(List<String> cookieId) {
		this.cookieId = cookieId;
	}
	public List<String> getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(List<String> ipAddress) {
		this.ipAddress = ipAddress;
	}
	public List<String> getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(List<String> deviceId) {
		this.deviceId = deviceId;
	}
	public List<String> getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(List<String> deviceType) {
		this.deviceType = deviceType;
	}
	
	public Document getMongoDocument() {
		Document document = new Document();
		if(cookieId!=null)
			document.append("cookieId", cookieId);
		if(ipAddress!=null)
			document.append("ipAddress", ipAddress);
		if(deviceId!=null)
			document.append("deviceId", deviceId);
		if(deviceType!=null)
			document.append("deviceType", deviceType);
		document.append("userId", userId);
		return document;
	}
}
