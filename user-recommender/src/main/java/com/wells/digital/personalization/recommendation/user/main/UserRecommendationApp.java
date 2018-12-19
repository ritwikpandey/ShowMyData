package com.wells.digital.personalization.recommendation.user.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.wells.digital"})
public class UserRecommendationApp {

	public static void main(String args[]) {
		SpringApplication.run(UserRecommendationApp.class, args);
	}
}