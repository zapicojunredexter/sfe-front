import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { setIsLoggedOut, setUser } from './../../redux/user/user.action';

class Container extends React.PureComponent<> {

    render() {
        const { user } = this.props;
        return (
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
                    
                    <ul className="navbar-nav mr-auto">  
                    </ul>
            
                    
                    <ul className="navbar-nav nav-flex-icons">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {user && user.name} </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                            
                            <Link to="account_settings" className="dropdown-item">
                                <i className="fas fa-users mr-3"></i>Account Settings
                            </Link>
                            <a
                                className="dropdown-item"
                                onClick={() => {
                                    this.props.setUser(null);
                                    this.props.setIsLoggedOut();
                                }}
                            >
                                <i className="fas fa-sign-out-alt" style={{marginRight: '1em'}}></i>Logout
                            </a>
                        </div>
                    </ul>
                    
            
                    </div>
            
                </div>
                </nav>
            </header>
        );
    }
}



const mapStateToProps = state => ({
    user: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
    setIsLoggedOut: () => dispatch(setIsLoggedOut()),
    setUser: () => dispatch(setUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

