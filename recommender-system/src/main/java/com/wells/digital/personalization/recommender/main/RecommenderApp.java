package com.wells.digital.personalization.recommender.main;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
@SpringBootApplication(scanBasePackages={"com.wells.digital"})
public class RecommenderApp {
 
    public static void main(String[] args) {
        SpringApplication.run(RecommenderApp.class, args);
    }
}