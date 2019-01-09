import React, { Component } from 'react';
import './App.css';
//import allProducts from './data/allProducts.js';
//import recommenttations from './data/recommenttations.js';
import Product from './components/products/component';
import PeopleRecommentation from './components/People/component';
import ProductRecommentation from './components/ProductRecommentation/component';
import RecentProducts from './components/RecentProducts/components';
import UserService from './services/userService';
import Header from './components/header/component';
import MortgageBanner from './components/MortgageBanner/component';
import BankBanner from './components/BankBanner/component';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],

      selectedProductId: 0,
      selectedProductName:'',
      currentHierarchy: [],
      selectedProducts: [],
      selectedHierarchy: [],

      recentViewedProducts: [],
      selectedRecentHierarchy: [],
      selectedRecentProducts: [],
      currentRecentHierarchy: [],

      productRecomm: [],
      selectedProductRecommHierarchy: [],
      selectedProductRecommProducts: [],
      currentProductRecommHierarchy: [],

      userRecomm: [],
      selectedUserRecommHierarchy: [],
      selectedUserRecommProducts: [],
      currentUserRecommHierarchy: [],

    }
  }
  componentDidMount() {
    UserService.getAllProducts((data) => {
      this.setState({ products: data, currentHierarchy: data[0].hierarchy, selectedProductName:data[0].productName });

    }, () => {
      this.setState({ products: [], currentHierarchy: [] })
    })
    this.loadInitalData()
  }
  loadInitalData = () => {

    UserService.getAllRecentProducts(1, (data) => {
      this.setState({ recentViewedProducts: data, currentRecentHierarchy: data })
    }, () => {
      this.setState({ recentViewedProducts: [], currentRecentHierarchy: [] })
    })
    UserService.getAllUserRecomm((data) => {
      this.setState({ userRecomm: data, currentUserRecommHierarchy: data })
    }, () => {
      this.setState({ userRecomm: [], currentUserRecommHierarchy: [] })
    })
    UserService.getAllProdRecomm(1, (data) => {
      this.setState({ productRecomm: data, currentProductRecommHierarchy: data })
    }, () => {
      this.setState({ productRecomm: [], currentProductRecommHierarchy: [] })
    })
  }
  showDetails = (product, index) => {
    this.loadInitalData();
    this.setState({
      selectedProductId: index,
      currentHierarchy: product.hierarchy,
      selectedProductName:product.productName,
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

  showPrevious = () => {
    let { selectedHierarchy, selectedProducts} = this.state;
    let prevHierarchy = selectedHierarchy.pop();
    let prevProduct = selectedProducts.pop();
    this.setState({ currentHierarchy: prevHierarchy, selectedProducts, selectedHierarchy })
  }
  showPreviousRecent = () => {
    let { selectedRecentHierarchy, selectedRecentProducts, currentRecentHierarchy, } = this.state;
    let prevHierarchy = selectedRecentHierarchy.pop();
    let prevProduct = selectedRecentProducts.pop();
    this.setState({ currentRecentHierarchy: prevHierarchy, selectedRecentProducts, selectedRecentHierarchy })
  }

  showPreviousProductRecomm = () => {
    let { selectedProductRecommHierarchy, selectedProductRecommProducts, currentProductRecommHierarchy, } = this.state;
    let prevHierarchy = selectedProductRecommHierarchy.pop();
    let prevProduct = selectedProductRecommProducts.pop();
    this.setState({ currentProductRecommHierarchy: prevHierarchy, selectedProductRecommHierarchy, selectedProductRecommProducts })
  }

  showPreviousUserRecomm = () => {
    let { selectedUserRecommHierarchy, selectedUserRecommProducts, currentUserRecommHierarchy, } = this.state;
    let prevHierarchy = selectedUserRecommHierarchy.pop();
    let prevProduct = selectedUserRecommProducts.pop();
    this.setState({ currentUserRecommHierarchy: prevHierarchy, selectedUserRecommHierarchy, selectedUserRecommProducts })
  }

  postActivity = (productId, type) => {
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
  render() {
    let { products, selectedProductId,selectedProductName, currentHierarchy, selectedProducts,
      recentViewedProducts, currentRecentHierarchy, selectedRecentProducts,
      currentProductRecommHierarchy, selectedProductRecommHierarchy, selectedProductRecommProducts,
      currentUserRecommHierarchy, selectedUserRecommHierarchy, selectedUserRecommProducts } = this.state;
    return (
      <div className="app modern-scroll">
        <Header />
        <div className="subheader">
          {products.map((product, index) => (
            <p key={index} className={selectedProductId === index ? "subHeaderText selected" : 'subHeaderText'} onClick={() => { this.showDetails(product, index) }}>{product.productName}</p>
          ))}
        </div>

        <div>
        {/* selectedProductName.toLocaleLowerCase().includes('mortgage') && <MortgageBanner /> */ }
        {/* selectedProductName.toLocaleLowerCase().includes('card') &&<BankBanner />  */}
          <Product
            data={currentHierarchy}
            length={currentHierarchy.length}
            postActivity={this.postActivity}
            showPrevious={this.showPrevious}
            openHierarchy={this.openHierarchy}
            selectedProducts={selectedProducts} />

          <PeopleRecommentation
            data={currentUserRecommHierarchy}
            length={currentUserRecommHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openUserRecommHierarchy}
            showPrevious={this.showPreviousUserRecomm}
            selectedProducts={selectedUserRecommProducts}
          />

          <ProductRecommentation
            data={currentProductRecommHierarchy}
            length={currentProductRecommHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openProductRecommHierarchy}
            showPrevious={this.showPreviousProductRecomm}
            selectedProducts={selectedProductRecommProducts}
          />

          <RecentProducts
            data={currentRecentHierarchy}
            length={currentRecentHierarchy.length}
            postActivity={this.postActivity}
            openHierarchy={this.openRecentHierarchy}
            showPrevious={this.showPreviousRecent}
            selectedProducts={selectedRecentProducts}
          />




        </div>
        {/* <Product data={currentHierarchy} postActivity={this.postActivity} showPrevious={this.showPrevious} openHierarchy={this.openHierarchy} selectedProducts={selectedProducts} /> */}
        {/* <People data={userRecomm} postActivity={this.postActivity} />
        <ProductRecommentation data={productRecomm} postActivity={this.postActivity} />
        <RecentProducts data={recentViewedProducts} postActivity={this.postActivity} /> */}
      </div>
    );
  }
}

export default App;
