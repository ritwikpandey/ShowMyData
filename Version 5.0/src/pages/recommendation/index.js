import React, { Component } from 'react';
import UserService from '../../services/userService';
import Banner from '../../components/Banner';
import BannerOne from '../../components/Banner1';

import BannerThree from '../../components/Banner3';
import BannerFour from '../../components/Banner4';
import BannerFive from '../../components/Banner5';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import First from '../../components/First';
import ExternalRealty from '../../components/ExternalRealty';
import Refinance from '../../components/Refinance';
import Recapture from '../../components/Recapture';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentData: null,

    }
  }
  componentDidMount() {
    let search = this.props.location.search;
    let userId = localStorage.getItem("REACT_APP_USER_ID");
    if (search === "" && (userId === "" || userId === null || typeof userId === 'undefined')) {
      this.props.history.push("/")
    }
    UserService.getContentRecommendations((data) => {
      this.setState({ contentData: data })
    }, () => {

    })

  }

  postContentActivity = ()=>{
    let {data} = this.state;
    
    
}

  postActivity = (productId, type) => {
    console.log("postActivity  " + productId + "  " + type)
    if (type === "applied") {
      this._openModal();
    }
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

  navigateTo = (page, productName, productId) => {
    this.props.history.push({
      pathname: "/" + page,
      state: { productName: productName, productId: productId }
    }
    );
  }

  _openModal = () => {
    this.setState({ showModal: true })
  }
  _closeModal = () => {
    this.setState({ showModal: false })
  }

  openApply = (data) => {
    let params = new FormData();    
    params.append("contentId", data.contentId);
    params.append("cookieId", localStorage.getItem("REACT_APP_USER_ID"));
    params.append("level", 1)

    UserService.postContentActivity(params, ()=>{         
    }, ()=>{
    })
    
    this.props.history.push({
      pathname: "/apply",
      state: { data: data }
    }
    );
  }

  render() {
    let { contentData } = this.state;
    return (
      <div className="app modern-scroll">
        <Header showRecommendation={false} onClick={(path) => this.props.history.push("products")} />
        <Banner />
        <BannerOne />
        <div>
          {contentData !== null && contentData.tileType === "recapture" &&
            contentData.level !== 1 &&  <Recapture
              data={contentData}
              onClick={this.openApply} />}

          {contentData !== null && contentData.tileType === "refinance" &&
            contentData.level !== 1 && 
            <Refinance
              data={contentData}
              onClick={this.openApply} />
          }
          {contentData !== null && contentData.tileType === "quote" &&
            contentData.level !== 1 && 
            <ExternalRealty
              data={contentData}
              onClick={this.openApply} />}

          {contentData !== null && contentData.tileType === "mortgage" &&
            contentData.level !== 1 &&
            <First
              data={contentData}
              onClick={this.openApply} />}

          {contentData !== null &&
            (contentData.level === 1 )&&
            <div style={{ height: '55vh', padding: '5vh 0', width: '70%', boxShadow: '0 5px 8px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)', margin: '5% 15%', background: '#FFF', textAlign: 'center' }}>
            <br/><br/><br/>
              <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', margin: 0, marginBottom: '1vh', padding: 0, color: '#434343' }}> Welcome back </h2>
              <h1 style={{ fontFamily: 'Georgia', fontWeight: '300', olor: '#434343', padding: '0 15%' }}>{"You were applying for "}
                {contentData.tileType === "quote" ? " Mortgage loan" :""} 
                {contentData.tileType === "refinance" ? " Refinance" :""}
                {contentData.tileType === "mortgage" ? " Purchase" :""} 
                {contentData.tileType === "recapture" ? "Recapture" :""} </h1>
                <br />
              <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343' }}> {"Do you want to continue?"}</h2>
              <br />
              <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '30%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }} onClick={() => { this.openApply(contentData) }}>{"Conitnue"}</button>
              <br /><br />
            </div>}

          <BannerFour />
          <br />
          <br />
        </div>
        <br />
        <br />
        <BannerThree />
        <Footer />

      </div>
    );
  }
}

export default Recommendation;
