import React, { Component } from 'react';
import './app.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import UserService from '../../services/userService';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            productName:'',
            productId:''
        }
    }

    postActivity = (productId, type) => {
        console.log("postActivity  " + productId +"  "+ type)
       
        let params =
          {
            "userId": localStorage.getItem("REACT_APP_USER_ID"),
            "productId": productId,
            "activityType": type
          }
    
        UserService.postActivity(params, () => {
    
        }, () => {
    
        })
      }
    
      navigateTo  = (page, productName, productId) => {
        this.props.history.push({
          pathname:"/"+page,
          state:{productName:productName,productId:productId}}
          );
      }
    
    componentDidMount() {
        let state = this.props.location.state;
        if(state){
            this.setState({productName: state.productName, productId:state.productId})
        }else{
            this.props.history.push("recommendations")
        }
    }
    render() {
        let {productId, productName} = this.state;
        return (
            <div>
                <Header onClick={()=>this.props.history.push("recommendations")}/>
                <div class="c42" style={{ margin: '0 0', padding: '3vh 15vw' }}>
                    <div id="title" style={{ width: '60%', float: 'left' }}>
                        <h1 class="c11" id="skip" tabindex="-1" style={{ width: '100%' }}>{productName}</h1>
                    </div>
                    <div style={{ width: '40%', float: 'right' }}>
                        <p style={{ textAlign: 'right' }}>Print</p>
                    </div>
                    <div style={{ clear: "both" }} />
                </div>

                <div style={{ margin: '5vh 0', width: '100%', height: '120vh', background: "url(https://www.wellsfargo.com/assets/images/css/template/bg_hero_desktop_01.jpg)", backgroundSize: '100% auto' }}>
                    <br /><br /><br />
                    <h2 style={{ fontFamily: 'Georgia', olor: '#434343', textAlign: 'center', fontSize: '48px', padding: '45px 0' }}>We have a card for every need</h2>
                    <div style={{ textAlign: 'center', marginLeft: '19vw' }}>
                        <div style={{ float: 'left', width: '30vw', height: '35vh', marginRight: '2vw', background: '#000', opacity: '.75' }} className="democenterDiv">
                            <br /><br />
                            <img style={{ height: '70px', width: '90px' }} src="https://www01.wellsfargomedia.com/assets/images/icons/95x70/icon_find_a_credit_card_2x_95x70.png" alt="" />
                            <p style={{ fontSize: '1.75em', color: '#fff', cursor: 'pointer' }}> Find a {productName}</p>
                        </div>
                        <div style={{ float: 'left', width: '30vw', height: '35vh', marginRight: '3vw', background: '#000', opacity: '.75' }} className="democenterDiv">
                            <br /><br />
                            <img style={{ height: '70px', width: '90px' }} src="https://www04.wellsfargomedia.com/assets/images/icons/95x70/icon_respond_to_an_offer_2x_95x70.png" alt="" />
                            <p style={{ fontSize: '1.75em', color: '#fff', cursor: 'pointer' }}> Respond to an offer</p>
                        </div>
                        <div style={{ clear: 'both' }} />
                    </div>
                    <br />
                    <br />

                    <br />
                    <div style={{ background: "#fff", opacity: '.75', width: '30vw', marginLeft: '35vw', height: '16vh' }}>
                        <br />

                        <div style={{ width: '10vw', height: '8vh', border: '1px solid #ae1e23', marginLeft:'15%', float: 'left', marginRight: '2vw' }} className="demoButton"> 
                            <p style={{ textAlign: 'center', fontSize: '17px', opacity: '1 !important', lineHeight: '8vh', color: '#ae1e23' }}>View Details</p>
                        </div>

                        <div style={{ width: '10vw', height: '8vh', background: '#ae1e23', opacity: '1 !important', float: 'left', marginRight: '2vw' }} className="demoButton">
                            <p onClick={()=>{this.postActivity(productId, 'applied'); this.navigateTo("apply", productName, productId)}} style={{ textAlign: 'center',fontFamily:'verdana', fontSize: '17px', color: '#fff',background: '#ae1e23', opacity: '1 !important', lineHeight: '8vh' }}>Apply Now</p>
                        </div>

                    </div>
                </div>
                <div class="c90 c90-center-columns" data-cid="tcm:84-123780-16" data-ctid="tcm:91-122371-32">
                    <h2 class="c90-mainTitle">Still have questions?</h2>
                    <div class="c90-columns-ctr">
                        <div class="c90-columns">
                            <div class="c90-column c90-quickHelp" style={{ float: "left", margin: '0 1vw' }}>
                                <h3 class="c90-header">Quick Help</h3>
                                <div class="c90-content">

                                    <div class="c90-item">
                                        <ul class="c14">
                                            <li><a hreff="/help/credit-cards/credit-card-faqs/">See credit card FAQs</a></li>
                                            <li><a hreff="/credit-cards/agreements/">View credit cardholder agreements</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="c90-column c90-callUs" style={{ float: "left", margin: '0 1vw' }}>
                                <h3 class="c90-header">Call Us</h3>
                                <div class="c90-content">

                                    <div class="c90-item">
                                        For existing cardholders:
                                        <br />
                                        <span class="c12"><strong>1-800-642-4720</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div class="c90-column c90-findALocation" style={{ float: "left", margin: '0 1vw' }}>
                                <h3 class="c90-header">Find a Location</h3>
                                <div class="c90-content">
                                    <form action="/locator/search/" method="get" class="find_location"><p>Find an ATM or banking location near you.</p><label class="hidden" for="find_location_zip">ZIP code</label><p><input type="text" placeholder="City, State or ZIP" name="searchTxt" id="find_location_zip" maxlength="70" /><input type="submit" class="submitBtn c7 utilitybtn" value="Go" id="NID2_5_1_1_2_1_3_2_1_3_2" /></p></form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}
export default ProductPage;