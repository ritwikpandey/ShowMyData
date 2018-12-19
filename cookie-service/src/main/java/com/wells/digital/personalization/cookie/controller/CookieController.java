package com.wells.digital.personalization.cookie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.wells.digital.personalization.cookie.service.CookieService;

@RestController
@CrossOrigin
public class CookieController {

	@Autowired
	private CookieService cookieService;

	/*
	 * Fetches Segment id for the cookie id passed.
	 */
	@ResponseBody
	@RequestMapping(value = "/segmentId", method = RequestMethod.POST)
	public String getSegmentId(@RequestParam("cookieId") String cookieId) {
		String segmentId;
		try {
			segmentId = new Gson().toJson(cookieService.getSegmentId(cookieId));
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return segmentId;
	}
}
