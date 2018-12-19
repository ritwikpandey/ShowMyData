package com.wells.digital.personalization.product.service;

public interface ProductService {

	// Returns a JSON string containing all the products currently in Active status.
	public String getAllProducts();
	// Returns a JSON containing details of the unique product whose product id is passed.
	public String getProductByProductId(String productId);
	// Returns json string of products for listing page by categories like an lob.
	public String getProductsByCategory(String categoryName, String value);
	
}
