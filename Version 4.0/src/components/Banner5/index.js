import React, { Component } from 'react';


const BannerFive = ({postActivity,product, navigateTo}) =>(

    <div class="largePromo fadeInElement" data-cid="tcm:242-147041-16" data-ctid="tcm:224-146926-32" style={{opacity: 1, marginLeft:'20%'}}>	
    
	<div class="iaRendered" data-slot-id="WF_CON_HP_PROD_SVC_BNR" lang="en" data-offer-id="C_dcc_cardonoff_productservices_web"><div class="inner" data-cid="tcm:402-161078-16" data-ctid="tcm:91-146914-32">
    
      <div class="col1" style={{height:'30vh', width:'30vw', background:'#ADD9F4'}}>
            
            <h3 style={{ontFamily: "Georgia",
    fontSize: "24px",
    marginBottom: "15px",
    color: "#FFF",
    textAlign:"center"}}>{product.productName}</h3>
            
           
      </div>
    
    <div class="col2">
        <span style={{fontSize:'23px', fontFamily:'Georgia'}}>{product.description}</span>
        <button style={{ padding:'2vh 1vw', fontFamily:'verdana', background:'#fff', color:'#bb0826', border:'1px solid #bb0826'}} role="button"
         onClick={()=>{postActivity(product.productId, 'viewed'); navigateTo("product", product.productName, product.productId)}}>Learn More</button>
    </div>
</div></div>
    				
</div>
)

export default BannerFive