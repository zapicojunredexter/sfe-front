import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import LoginModal from './modals/login';
import RegisterModal from './modals/registration';
import './style.scss'

class Container extends React.PureComponent<> {
    state = {
        show: false
    }

    toggleLoginModal = () => 
        this.setState({
            showLoginModal: !this.state.showLoginModal
    })

    toggleRegisterModal = () => 
    this.setState({
        showRegisterModal: !this.state.RegisterLoginModal
})
    

    render() {

        return (
            <div>
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark navbar__container sticky-top">
                <a className="navbar-brand" href="#" style={{marginLeft: '-10em'}}><img src="images/sfelogo-white.png" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent-4">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link navbar__link" href="#About">About
                        {/* <span class="sr-only">(current)</span> */}
                        </a>
                    </li>
                    <li className="nav-item navbar__link" >
                        <a className="nav-link" href="#Faq">FAQ</a>
                    </li>
                    <li className="nav-item navbar__link">
                        <a className="nav-link" href="#Contact">Contact</a>
                    </li>
                    <li className="nav-item navbar__link navbar__login">
                        <button className="nav-link login-button" type="button" onClick = {e => { this.toggleLoginModal(); }}>Login</button>
                        <LoginModal onClose={this.showLoginModal} show={this.state.showLoginModal}/>
                    </li>
                    </ul>
                </div>
                </nav>

                <div className="homepage__container">
                    <div className="homepage__content">
                     <button type="button" className="btn btn-lg btn-outline-danger waves-effect homepage__button" onClick = {e => { this.toggleRegisterModal(); }}>Be a Vendor</button><br/>
                      <a href="https://play.google.com/store?hl=en" target="_blank"><img src="images/playstore.png" className="playstore-image"/> </a>
                      <a href="https://www.apple.com/ios/app-store/" target="_blank"><img src="images/applestore.png" className="apple-image"/></a>
                    </div>
                    <RegisterModal onClose={this.showRegisterModal} show={this.state.showRegisterModal}/>
                    
                </div>

                <div className="about__container" id="About">
                    about
                </div>

                <div className="faq__container" id="Faq">
                    faq
                </div>

                <div className="contact__container" id="Contact">
                    contact
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
