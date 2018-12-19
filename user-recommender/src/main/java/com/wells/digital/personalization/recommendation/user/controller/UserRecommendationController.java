package com.wells.digital.personalization.recommendation.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wells.digital.personalization.recommendation.user.ScoreAssignment;
import com.wells.digital.personalization.recommendation.user.UserBasedRecommendation;

@RestController
@CrossOrigin
public class UserRecommendationController {
	
	@Autowired
	private ScoreAssignment scoreAssignment;
	
	@Autowired
	private UserBasedRecommendation recommendation;
	
	@ResponseBody
	@RequestMapping(value = "/updateUserRecommendations", method = RequestMethod.GET)
	public String updateUserRecommendations() {
		String response;
		try {
			// Assign score
			scoreAssignment.updateScoreForUsers();
			// Generate prediction score for each product
			recommendation.generatePredictions();
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
}
