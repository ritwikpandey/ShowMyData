package com.wells.digital.personalization.recommender.service;

public interface RecommendationService {

	public String getRcentProducts(String userId, boolean notRecent);

	public String getProductRecommendations(String userId);

	public String getUserRecommendations(String userId);

	public String getContentRecommendations(String cookieId);
}
