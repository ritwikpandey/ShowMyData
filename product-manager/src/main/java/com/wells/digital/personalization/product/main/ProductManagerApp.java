package com.wells.digital.personalization.product.main;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
@SpringBootApplication(scanBasePackages={"com.wells.digital"})
public class ProductManagerApp {
 
    public static void main(String[] args) {
        SpringApplication.run(ProductManagerApp.class, args);
    }
}