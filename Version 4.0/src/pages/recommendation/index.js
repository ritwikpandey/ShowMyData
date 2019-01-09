import React, { Component } from 'react';
import PeopleRecommentation from '../../components/People';
import ProductRecommentation from '../../components/ProductRecommentation';
import UserService from '../../services/userService';
import Banner from '../../components/Banner';
import BannerOne from '../../components/Banner1';
import BannerTwo from '../../components/Banner2';
import BannerThree from '../../components/Banner3';
import BannerFour from '../../components/Banner4';
import BannerFive from '../../components/Banner5';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import RecentProducts from '../../components/RecentProducts';


class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productRecomm: [],
      selectedProductRecommHierarchy: [],
      selectedProductRecommProducts: [],
      currentProductRecommHierarchy: [],

      recentViewedProducts: [],
      selectedRecentHierarchy: [],
      selectedRecentProducts: [],
      currentRecentHierarchy: [],

      userRecomm: [],
      selectedUserRecommHierarchy: [],
      selectedUserRecommProducts: [],
      currentUserRecommHierarchy: [],

    }
  }
  componentDidMount() {
    let search = this.props.location.search;
    let userId =  localStorage.getItem("REACT_APP_USER_ID");
    if(search === "" && (userId === "" || userId === null || typeof userId === 'undefined')){
      this.props.history.push("/")
    }
    if (search !== "") {
      UserService.getAllExtrnProdRecomm(search, (data) => {
        this.setState({ productRecomm: data, currentProductRecommHierarchy: data })
      }, () => {
        this.setState({ productRecomm: [], currentProductRecommHierarchy: [] })
      })
    } else {
      UserService.getAllUserRecomm((data) => {
        this.setState({ productRecomm: data, currentProductRecommHierarchy: data })
      }, () => {
        this.setState({ productRecomm: [], currentProductRecommHierarchy: [] })
      })
    }
    this.loadInitalData()
  }
  loadInitalData = () => {
    UserService.getAllUserRecomm((data) => {
      this.setState({ userRecomm: data, currentUserRecommHierarchy: data })
    }, () => {
      this.setState({ userRecomm: [], currentUserRecommHierarchy: [] })
    });

    UserService.getAllRecentProducts(1, (data) => {
      this.setState({ recentViewedProducts: data, currentRecentHierarchy: data })
    }, () => {
      this.setState({ recentViewedProducts: [], currentRecentHierarchy: [] })
    })
  }
  showDetails = (product, index) => {
    this.loadInitalData();
    this.setState({
      selectedProductId: index,
      currentHierarchy: product.hierarchy,
      selectedProductName: product.productName,
      selectedProducts: [],
      selectedHierarchy: [],

      selectedRecentHierarchy: [],
      selectedRecentProducts: [],

      selectedProductRecommHierarchy: [],
      selectedProductRecommProducts: [],

      selectedUserRecommHierarchy: [],
      selectedUserRecommProducts: []
    });
  }
  openHierarchy = (productId, productName, hierarchy) => {
    let { selectedHierarchy, selectedProducts, currentHierarchy } = this.state;
    selectedHierarchy.push(currentHierarchy);
    selectedProducts.push({ productId, productName });
    this.setState({ currentHierarchy: hierarchy, selectedProducts, selectedHierarchy })
  }
  openRecentHierarchy = (productId, productName, hierarchy) => {
    let { selectedRecentHierarchy, selectedRecentProducts, currentRecentHierarchy } = this.state;
    selectedRecentHierarchy.push(currentRecentHierarchy);
    selectedRecentProducts.push({ productId, productName });
    this.setState({ currentRecentHierarchy: hierarchy, selectedRecentHierarchy, selectedRecentProducts })
  }
  openProductRecommHierarchy = (productId, productName, hierarchy) => {
    let { selectedProductRecommHierarchy, selectedProductRecommProducts, currentProductRecommHierarchy } = this.state;
    selectedProductRecommHierarchy.push(currentProductRecommHierarchy);
    selectedProductRecommProducts.push({ productId, productName });
    this.setState({ currentProductRecommHierarchy: hierarchy, selectedProductRecommHierarchy, selectedProductRecommProducts })
  }
  openUserRecommHierarchy = (productId, productName, hierarchy) => {
    let { selectedUserRecommHierarchy, selectedUserRecommProducts, currentUserRecommHierarchy } = this.state;
    selectedUserRecommHierarchy.push(currentUserRecommHierarchy);
    selectedUserRecommProducts.push({ productId, productName });
    this.setState({ currentUserRecommHierarchy: hierarchy, selectedUserRecommHierarchy, selectedUserRecommProducts })
  }


  showPreviousProductRecomm = () => {
    let { selectedProductRecommHierarchy, selectedProductRecommProducts } = this.state;
    let prevHierarchy = selectedProductRecommHierarchy.pop();
    let prevProduct = selectedProductRecommProducts.pop();
    this.setState({ currentProductRecommHierarchy: prevHierarchy, selectedProductRecommHierarchy, selectedProductRecommProducts })
  }

  showPreviousUserRecomm = () => {
    let { selectedUserRecommHierarchy, selectedUserRecommProducts, } = this.state;
    let prevHierarchy = selectedUserRecommHierarchy.pop();
    let prevProduct = selectedUserRecommProducts.pop();
    this.setState({ currentUserRecommHierarchy: prevHierarchy, selectedUserRecommHierarchy, selectedUserRecommProducts })
  }

  postActivity = (productId, type) => {
    console.log("postActivity  " + productId +"  "+ type)
    if(type === "applied"){
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

  navigateTo  = (page, productName, productId) => {
    this.props.history.push({
      pathname:"/"+page,
      state:{productName:productName,productId:productId}}
      );
  }

  _openModal = ()=>{
    this.setState({showModal:true})
  }
  _closeModal = ()=>{
    this.setState({showModal:false})
  }


  render() {
    let {
      currentProductRecommHierarchy, selectedProductRecommProducts,
      recentViewedProducts, currentRecentHierarchy, selectedRecentProducts,
      currentUserRecommHierarchy, selectedUserRecommProducts ,showModal} = this.state;
    return (
      <div className="app modern-scroll">
        <Header showRecommendation={false}  onClick={(path)=>this.props.history.push("products")}/>
        <Banner /><BannerOne/>
        {currentProductRecommHierarchy.length  !== 0  && <BannerFive navigateTo ={this.navigateTo} postActivity={this.postActivity}  product={currentProductRecommHierarchy[0]}/> }
        <div>
        <br/>
        <BannerFour navigateTo ={this.navigateTo} postActivity={this.postActivity} product={currentProductRecommHierarchy.length  !== 0 ? currentProductRecommHierarchy[1] : {productName:'', description:'', productId:'' } }/>
        {/* <RecentProducts
            data={currentRecentHierarchy}
            length={currentRecentHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openRecentHierarchy}
            showPrevious={this.showPreviousRecent}
            selectedProducts={selectedRecentProducts}
          /> */}
        <br/>

          {/* <ProductRecommentation
            data={currentProductRecommHierarchy}
            length={currentProductRecommHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openProductRecommHierarchy}
            showPrevious={this.showPreviousProductRecomm}
            selectedProducts={selectedProductRecommProducts}
          /> */}
<br/>
          {/* <PeopleRecommentation
            data={currentUserRecommHierarchy}
            length={currentUserRecommHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openUserRecommHierarchy}
            showPrevious={this.showPreviousUserRecomm}
            selectedProducts={selectedUserRecommProducts}
          /> */}

        </div>
        <br />
        <br />
        {showModal && <div className="modal">
          <div className="body">
            <p style={{width:'60%', marginLeft:'20%'}}>{"Successfully applied to the product. Our representative will contact you soon"}</p>
          <button className="button" onClick={this._closeModal} >OK</button>
          </div>
        </div>}
        <BannerThree />
        <Footer />

      </div>
    );
  }
}

export default Recommendation;
