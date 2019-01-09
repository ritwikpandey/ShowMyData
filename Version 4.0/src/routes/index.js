import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import Recommendation from '../pages/recommendation';
import Application from '../pages/application';
import ProductPage from '../pages/product';
import Thankyou from '../pages/thankyou';

class Routes extends Component {
  render () {
    return (
      <HashRouter basename="app">
        <Switch>
        <Route path="/recommendations" component={Recommendation} />
          <Route path="/products" component={Dashboard} />
          <Route path="/apply" component={Application} />
          <Route path="/product" component={ProductPage} />
          <Route path="/result" component={Thankyou} />
          <Route exact component={Home} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
