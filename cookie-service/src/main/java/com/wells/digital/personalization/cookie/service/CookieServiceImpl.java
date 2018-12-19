package com.wells.digital.personalization.cookie.service;

import java.util.HashMap;
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

}
