package com.wells.digital.personalization.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wells.digital.personalization.product.service.ProductService;

/*
 * Provides restful end-points for various MongoDB related operations.
 */
@RestController
@CrossOrigin
public class ProductController {

	@Autowired
	private ProductService productService;

	/*
	 * Fetches all the products in active state.
	 */
	@ResponseBody
	@RequestMapping(value = "/products", method = RequestMethod.GET)
	public String listProducts() {
		String response;
		try {
			response = productService.getAllProducts();
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/productById", method = RequestMethod.GET)
	public String getProductbyId(@RequestParam("productId") String productId) {
		String response;
		try {
			response = productService.getProductByProductId(productId);
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return response;
	}
}
