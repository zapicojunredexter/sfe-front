import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import VendorDashboard from './containers/vendor.dashboard';
import Products from './containers/products';
import OrderHistory from './containers/order.history';
import Reviews from './containers/reviews';
import AdminDashboard from './containers/dashboard';
import PendingAccounts from './containers/pending.accounts';
import AccountSettings from './containers/account.settings';
import Marketing from './containers/marketing';
import { setIsLoggedOut } from './redux/user/user.action';
import FirebaseService from './services/firebase.service';

import './App.css';

FirebaseService();

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
            return <Route path="/login" exact component={Marketing} />;
        }
        const isAdmin = false;
        return (
            <Redirect
                to={{
                    pathname: isAdmin ? 'admin_dashboard' : '/',
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
