package com.wells.digital.personalization.activity.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.wells.digital"})
public class ActivityApp {

	public static void main(String args[]) {
		SpringApplication.run(ActivityApp.class, args);
	}
}