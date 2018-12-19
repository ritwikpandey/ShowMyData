package com.wells.digital.personalization.cookie.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.wells.digital"})
public class CookieApp {
	public static void main(String args[]) {
		SpringApplication.run(CookieApp.class, args);
	}
}
