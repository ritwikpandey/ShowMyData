package com.wells.digital.personalization.cookie.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoCursor;
import com.wells.digital.personalization.mongo.commons.Constants;
import com.wells.digital.personalization.mongo.connector.MongoConnector;

@Component
public class CookieServiceImpl implements CookieService {

	@Autowired
	private MongoConnector mongoConnector;
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, String> getSegmentId(String cookieId) {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_SEGMENT).find(new Document("cookieId", cookieId)).iterator();
		Map<String, String> attributes = new HashMap<>();
		while(cursor.hasNext()) {
			Document segment = cursor.next();
			attributes = (Map<String, String>) segment.get("attributes");
		}
		return attributes;
	}

	@Override
	public String getAttributesForSegment(String segmentId) {
		return null;
	}

	@Override
	public void consolidateCookies() {
		MongoCursor<Document> cursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER_PROFILE_ODS).find().iterator();
		boolean documentConsolidated = false;
		// Get IP Address and consolidate on the basis of the same.
		while(cursor.hasNext()) {
			documentConsolidated = false;
			Document document = cursor.next();
			List<String> ipAddressesMatch = (List<String>)document.get("ipAddress");
			List<String> deviceIdsMatch = (List<String>)document.get("deviceId");
			Document filter = new Document();
			if(deviceIdsMatch!=null && !deviceIdsMatch.isEmpty())
				filter.append("deviceId", deviceIdsMatch.get(0));
			if(ipAddressesMatch!=null && !ipAddressesMatch.isEmpty())
				filter.append("ipAddress", ipAddressesMatch.get(0));
			MongoCursor<Document> masterCursor = mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).find(filter).iterator();
			if(!filter.isEmpty() && masterCursor.hasNext()) {
				try {
					mergeProfiles(masterCursor, document);
					documentConsolidated = true;
				}catch(Exception e) {
					e.printStackTrace();
					continue;
				}
			}
			// Create a new document in User collection
			else {
				mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).insertOne(document);
				documentConsolidated = true;
			}
			if(documentConsolidated) {
				archiveDocument(document);
			}
		}
	}

	private void archiveDocument(Document document) {
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER_PROFILE_ODS).deleteOne(document);
	}

	private void mergeProfiles(MongoCursor<Document> masterCursor, Document document) throws Exception{
		Document masterDocument = masterCursor.next();
		List<String> cookieIds = (List<String>) document.get("cookieId");
		if(cookieIds != null && !cookieIds.isEmpty()) {
			List<String> masterCookies = (List<String>) masterDocument.get("cookieId");
			masterCookies.addAll(cookieIds);
			masterDocument.put("cookieId", new ArrayList<>(new HashSet<>(masterCookies)));
		}
		List<String> ipAddresses = (List<String>) document.get("ipAddress");
		if(ipAddresses != null && !ipAddresses.isEmpty()) {
			List<String> masterIpAddresses = (List<String>) masterDocument.get("ipAddress");
			masterIpAddresses.addAll(ipAddresses);
			masterDocument.put("ipAddress", new ArrayList<>(new HashSet<>(masterIpAddresses)));
		}
		List<String> deviceIds = (List<String>) document.get("deviceId");
		if(deviceIds != null && !deviceIds.isEmpty()) {
			List<String> masterDeviceIds = (List<String>) masterDocument.get("deviceId");
			masterDeviceIds.addAll(deviceIds);
			masterDocument.put("deviceId", new ArrayList<>(new HashSet<>(masterDeviceIds)));
		}
		List<String> deviceTypes = (List<String>) document.get("deviceType");
		if(deviceTypes != null && !deviceTypes.isEmpty()) {
			List<String> masterDeviceTypes = (List<String>) masterDocument.get("deviceType");
			masterDeviceTypes.addAll(deviceTypes);
			masterDocument.put("deviceType", new ArrayList<>(new HashSet<>(masterDeviceTypes)));
		}
		Document filter = new Document();
		filter.append("_id", masterDocument.get("_id"));
		mongoConnector.getConnection().getCollection(Constants.COLLECTION_USER).replaceOne(filter, masterDocument);
	}
}