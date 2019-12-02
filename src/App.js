import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './containers/dashboard';
import VendorDashboard from './containers/vendor.dashboard';
import Products from './containers/products';
import OrderHistory from './containers/order.history';
import Reviews from './containers/reviews';
import AdminDashboard from './containers/dashboard';
import PendingAccounts from './containers/pending.accounts';
import AccountSettings from './containers/account.settings';
import Login from './containers/login';
import { setIsLoggedOut } from './redux/user/user.action';

import './App.css';

class App extends React.PureComponent<> {

    protectedRoute = props => {
        if (this.props.isLoggedIn) {
            return (
                <Switch>
                    <Route path="/" exact component={VendorDashboard} />
                    <Route path="/products" exact component={Products} />
                    <Route path="/order_history" exact component={OrderHistory} />
                    <Route path="/reviews" exact component={Reviews} />
                    <Route path="/account_settings" exact component={AccountSettings} />
                    <Route path="/admin_dashboard" exact component={AdminDashboard} />
                    <Route path="/pending_accounts" exact component={PendingAccounts} />
                </Switch>
            );
        }
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location },
                }}
            />
        );
    };

    loginRoute = () => {
        if (this.props.isLoggedIn === false) {
            return <Route path="/login" component={Login} />;
        }

        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    };

    render(){
        return (
            <Switch>
                <Route path="/login" render={this.loginRoute} />
                <Route path="/" render={this.protectedRoute} />
            </Switch>
        );
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.userStore.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setIsLoggedOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
