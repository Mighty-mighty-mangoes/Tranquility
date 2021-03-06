import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import {
  Homepage,
  AllCandles,
  FoodCandles,
  SpiceCandles,
  FlowerCandles,
  CoderCandles,
  Signup,
  Login,
  Cart,
  AboutUs,
  Contact,
  Confirmation,
  InsufficientStock,
} from './components';

import SingleCandle from './components/SingleCandle';
import {me} from './store';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/allCandles" component={AllCandles} />
        <Route exact path="/foodCandles" component={FoodCandles} />
        <Route exact path="/spiceCandles" component={SpiceCandles} />
        <Route exact path="/flowerCandles" component={FlowerCandles} />
        <Route exact path="/coderCandles" component={CoderCandles} />
        <Route path="/viewSingleCandle/:candleId" component={SingleCandle} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/insufficientStock" component={InsufficientStock} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/aboutUs" component={AboutUs} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes)); **/
