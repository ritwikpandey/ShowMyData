package com.wells.digital.personalization.cookie.service;

import java.util.Map;

public interface CookieService {
	
	public Map<String, String> getSegmentId(String cookieId);
	
	public String getAttributesForSegment(String segmentId);
	
	public void consolidateCookies();
}
