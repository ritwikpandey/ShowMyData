package com.wells.digital.personalization.activity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.wells.digital.personalization.activity.service.ActivityService;
import com.wells.digital.personalization.mongo.entity.ActivityRequest;


@RestController
@CrossOrigin
public class ActivityController {

	@Autowired
	private ActivityService activityService;

	/*
	 * Fetches all the products in active state.
	 */
	@ResponseBody
	@RequestMapping(value = "/activityStore", method = RequestMethod.POST)
	public String addUserActivity(@RequestBody String body) {
		String response;
		try {
			ActivityRequest activityRequest = getActivityRequestObject(body);
			activityService.addUserActivity(activityRequest);
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value = "/reset", method = RequestMethod.GET)
	public String resetActivity(@RequestParam("userId") String userId) {
		String response;
		try {
			activityService.resetActivityForUser(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value = "/resetAll", method = RequestMethod.GET)
	public String resetAllActivity() {
		String response;
		try {
			activityService.resetAllActivities();
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	private ActivityRequest getActivityRequestObject(String body) {
		ActivityRequest activityRequest = new Gson().fromJson(body, ActivityRequest.class);
		return activityRequest;
	}
}
