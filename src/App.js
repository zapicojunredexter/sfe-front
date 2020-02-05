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
import Terms from './containers/marketing/termsandcondition'
import { setIsLoggedOut } from './redux/user/user.action';
import FirebaseService from './services/firebase.service';
import OrderService from './services/orders.service';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import './App.css';

FirebaseService();

class App extends React.PureComponent<> {

    componentDidMount(){
        this.createNotification();
    }
    createNotification = async () => {
    // return () => {
    //   switch (type) {
    //     case 'info':
    //       NotificationManager.info('Info message');
    //       break;
    //     case 'success':
    //       NotificationManager.success('Success message', 'Title here');
    //       break;
    //     case 'warning':
    //       NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
    //       break;
    //     case 'error':
    //       NotificationManager.error('Error message', 'Click me!', 5000, () => {
    //         alert('callback');
    //       });
    //       break;
    //   }
    };

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
                    <Route path="/terms_and_conditions" exact component={Terms} />
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
            <>
            <NotificationContainer/>
            <Switch>
                <Route path="/login" render={this.loginRoute} />
                <Route path="/" render={this.protectedRoute} />
            </Switch>
            </>
        );
    }
}


const mapStateToProps = state => ({
    userType: state.userStore.user && state.userStore.user.type,
    userId: state.userStore.user && state.userStore.user.id,
    isLoggedIn: state.userStore.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setIsLoggedOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
