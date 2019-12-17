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
            const isAdmin = this.props.userType === 'admin';
            return (
                <Switch>
                    <Route path="/products" exact component={Products} />
                    <Route path="/order_history" exact component={OrderHistory} />
                    <Route path="/reviews" exact component={Reviews} />
                    <Route path="/account_settings" exact component={AccountSettings} />
                    <Route path="/pending_accounts" exact component={PendingAccounts} />
                    <Route path="/" component={isAdmin ? AdminDashboard : VendorDashboard} />
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

    loginRoute = (props) => {
        const fromUrl = props && props.location && props.location.state && props.location.state.from && props.location.state.from.pathname;
        
        if (this.props.isLoggedIn === false) {
            return <Route path="/login" exact component={Marketing} />;
        }
        const isAdmin = this.props.userType === 'admin';
        const redirectUrl = () => {
            const validUrls = {
                store: {
                    '/products': '/products',
                    '/reviews': '/reviews',
                    '/order_history': '/order_history',
                    '/account_settings': '/account_settings',
                },
                admin: {
                    '/pending_accounts': '/pending_accounts'
                }
            }
            console.log('mao nis ha', this.props.userType, validUrls[this.props.userType][fromUrl], fromUrl);
            return (this.props.userType && validUrls[this.props.userType] && validUrls[this.props.userType][fromUrl]) || '/';
        };
        return (
            <Redirect
                to={{
                    pathname: redirectUrl(),
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
    userType: state.userStore.user && state.userStore.user.type,
    isLoggedIn: state.userStore.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setIsLoggedOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
