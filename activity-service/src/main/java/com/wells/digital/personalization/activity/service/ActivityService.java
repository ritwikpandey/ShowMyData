package com.wells.digital.personalization.activity.service;

import com.wells.digital.personalization.mongo.entity.ActivityRequest;

public interface ActivityService {

	public void addUserActivity(ActivityRequest activityRequest);

	public void resetActivityForUser(String userId);

	public void resetAllActivities();
	
	public String getUserIdForCookieId(String cookieId);

	public void addUserActivityInRecommendationHistory(String cookieId, String contentId, String stage);
	
}
