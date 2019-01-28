package com.wells.digital.personalization.recommender.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wells.digital.personalization.recommender.service.RecommendationService;

@RestController
@CrossOrigin
public class RecommendationController {

	@Autowired
	private RecommendationService recommendationService;
	
	@ResponseBody
	@RequestMapping(value = "/recent", method = RequestMethod.GET)
	public String getRcentProducts(@RequestParam("userId") String userId) {
		String recentProducts = "{[]}";
		try {
			recentProducts = recommendationService.getRcentProducts(userId, false);
			return recentProducts;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return recentProducts;
	}

	@ResponseBody
	@RequestMapping(value = "/productRecommendations", method = RequestMethod.GET)
	public String getProductRecommendations(@RequestParam("userId") String userId) {
		String recentProducts = "[]";
		try {
			recentProducts = recommendationService.getRcentProducts(userId, true);
			return recentProducts;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return recentProducts;
	}

	@ResponseBody
	@RequestMapping(value = "/userRecommendations", method = RequestMethod.GET)
	public String getUserRecommendations(@RequestParam("userId") String userId) {
		String userRecommendations = "[]";
		try {
			userRecommendations = recommendationService.getUserRecommendations(userId);
			return userRecommendations;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userRecommendations;
	}
	
	
//	@ResponseBody
//	@RequestMapping(value = "/recommendations", method = RequestMethod.GET)
//	public String getUserRecommendationsFor(@RequestParam("source") String source, @RequestParam("cookieId") String cookieId) {
//		String userRecommendations = "[]";
//		try {
//			userRecommendations = guestRecommendationService.getProductRecommendations(cookieId);
//			return userRecommendations;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return userRecommendations;
//	}
	
	
	
	// TODO Remove this method, its temporary for demo
	@ResponseBody
	@RequestMapping(value = "/contentRecommendations", method = RequestMethod.GET)
	public String getProductRecommendationsTemp(@RequestParam("cookieId") String cookieId) {
		String recentProducts = "[]";
		try {
			recentProducts = recommendationService.getContentRecommendations(cookieId);
			return recentProducts;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return recentProducts;
	}
}