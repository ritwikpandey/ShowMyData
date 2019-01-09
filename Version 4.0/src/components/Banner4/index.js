import React, { Component } from 'react';

const BannerFour = ({postActivity,product, navigateTo}) =>(
    <div>
        <div class="recommendedTitleWrapper fadeInElement" data-cid="tcm:182-147037-16" data-ctid="tcm:223-146919-32" style={{ opacity: 1 }}>
            <h3 class="recommendedTitle">Suggested for you</h3>
          </div>

          <div class="hpAdditional fadeInElement" data-cid="tcm:242-147042-16" data-ctid="tcm:224-146928-32" style={{opacity: 1}}>
            <div class="hpAdditionalMainCol">

              <div class="iaRendered" data-slot-id="WF_CON_HP_SECONDARY_BNR_1" lang="en" data-offer-id="C_ccd_cashwisebonusb_hpsec_web"><div class="hpAdditionalContentImg fadeMe" data-cid="tcm:402-149805-16" data-ctid="tcm:91-146900-32">
                <div class="wrapper" style={{display: "block"}}>


                  <a class="i7" hreff="/jump/credit-cards/cash-wise-200/" data-tracking-id="21520-158538-3408-124">

                    <img alt="Wells Fargo Cash Wise Visa Card" src="https://www20.wellsfargomedia.com/assets/images/contextual/banner/credit-card/304x194/wfcc050_ph_b-cashwise-plat-flat-ccd4269_304x194.jpg" class="deferred" data-deferred-src="https://www20.wellsfargomedia.com/assets/images/contextual/banner/credit-card/304x194/wfcc050_ph_b-cashwise-plat-flat-ccd4269_304x194.jpg" />
                    <span class="hpAdditionalContentCol">
                      <span class="c5headline">Earn a $200 cash rewards bonus</span>
                      <span class="hpAdditionalContentText">Open a Wells Fargo Cash Wise Visa<sup>®</sup> Card — spend $1k in the first 3 months</span>
                    </span>
                  </a>
                </div>
              </div></div>

              <div class="iaRendered" data-slot-id="WF_CON_HP_SECONDARY_BNR_2" lang="en" data-offer-id="C_sav_savingfast_hpsec_web"><div class="hpAdditionalContentImg fadeMe" data-cid="tcm:402-149177-16" data-ctid="tcm:91-146900-32">
                <div class="wrapper" style={{display: "block"}}>


                  <a class="i7" hreff="/jump/savings/make-saving-money-simpler/" data-tracking-id="21520-158536-3408-27">

                    <img alt="" src="https://www20.wellsfargomedia.com/assets/images/contextual/banner/savings/304x194/wfia432_ph_g132269213_304x194.jpg" class="deferred" data-deferred-src="https://www20.wellsfargomedia.com/assets/images/contextual/banner/savings/304x194/wfia432_ph_g132269213_304x194.jpg" />
                    <span class="hpAdditionalContentCol">
                      <span class="c5headline">Want to reach your goals faster?</span>
                      <span class="hpAdditionalContentText">Open a savings account and start making saving a permanent habit</span>
                    </span>
                  </a>
                </div>
              </div></div>

              <div class="cmsDefault" data-slot-id="WF_CON_HP_SECONDARY_BNR_3" lang="en">
                <div class="hpAdditionalContentImg fadeMe" data-cid="tcm:84-146971-16" data-ctid="tcm:91-146900-32">
                  <div class="wrapper" style={{display: "block", background:'#984447'}}>
                  <a class="i7" onClick={()=>{postActivity(product.productId, 'viewed'); navigateTo("product", product.productName, product.productId)}} style={{cursor:'pointer'}}> 
                   <span class="hpAdditionalContentCol">                                
           <span class="c5headline">{product.productName}</span>
                             <span class="hpAdditionalContentText">{product.description}</span>
                             </span>
                  </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
)

export default BannerFour;