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
                        <a className="nav-link navbar__link navbar__active" href="#About">About
                        {/* <span class="sr-only">(current)</span> */}
                        </a>
                    </li>
                    <li className="nav-item navbar__link" >
                        <a className="nav-link" href="#How-does-it-work">How Does It Work</a>
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

                <div className="homepage__container" >
                    <div className="homepage__content">
                     <div className="homepage__textcontent">
                       <h2>Take Your First Bite Of Streetfood Express</h2>  
                       <p>Craving something delicious? If there's one thing we know it’s food delivery. It’s our mission to bring tasty street food from your favourite local
                            street foods right to your door so you can eat good food every day.</p>
                        <h6>Just few clicks to satisfy your cravings.</h6>
                     </div>
                     <button type="button" className="btn btn-lg btn-outline-danger waves-effect homepage__button" onClick = {e => { this.toggleRegisterModal(); }}>Be a Vendor</button><br/>
                      <a href="https://play.google.com/store?hl=en" target="_blank"><img src="images/playstore.png" className="playstore-image"/> </a>
                      <a href="https://www.apple.com/ios/app-store/" target="_blank"><img src="images/applestore.png" className="apple-image"/></a>
                    </div>
                    <RegisterModal onClose={this.showRegisterModal} show={this.state.showRegisterModal}/>
                    
                </div>

                <div className="about__container" id="About">
                    <h2 className="text-center">About Us</h2>
                    <p className="text-center">Easy, fast &amp; convenient delivery for your favorite street food Express.</p>
                    <div className="container about__content">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>So what's the deal?</h4>
                                <p>You’re ready and waiting to eat, we’ve all been there, craving of street food eating pungko-pungko or balut in our dreams. Dream no more - our riders are here to bring the food 
                                    you've been lusting after right to your door. Dreams really do come true.</p>
                            </div>
                            <div className="col-md-6">
                            </div>
                        </div>
                        <div className="row">
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-6">
                                    <h4 className="text-right">What makes us special?</h4>
                                    <p>Streetfood express chooses your local favourites; the best food near you. Our riders come to your very doorstep with a smile, while you save time to do something else you love. 
                                        There's a foods and a dish to suit every moment and we'll help you make the first bite last.</p>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="how__container" id="How-does-it-work">
                    <h2 className="text-center">How Does It Work?</h2>
                    <div className="container how__content">
                      <div className="row">
                          <div className="col-md-3 text-center">
                             <i className="fas fa-map-marker-alt"></i><br/>
                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          </div>
                          <div className="col-md-3 text-center">
                             <i className="fas fa-store"></i><br/>
                             <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div>
                          <div className="col-md-3 text-center">
                             <i className="fa fa-credit-card"></i><br/>
                             <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                          </div>
                          <div className="col-md-3 text-center">
                             <i className="fas fa-motorcycle"></i><br/>
                             <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          </div>
                      </div>
                    </div>
                </div>

                <div className="faq__container" id="Faq">
                    <h2 className="text-center">Frequently Asked Questions</h2>
                    <div className="container faq__contents">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Question Number 1?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lorem non sem sollicitudin placerat.
                                     Proin sed sem in ipsum malesuada aliquet. Curabitur mollis neque id dui faucibus, id vestibulum mauris blandit. </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Question Number 2?</h4>
                                <p> Cras eget placerat dolor. Pellentesque rutrum ligula nec viverra auctor. Nam a tortor ipsum. 
                                    Nunc fermentum fermentum purus, quis venenatis nibh gravida in.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Question Number 3?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lorem non sem sollicitudin placerat.
                                     Proin sed sem in ipsum malesuada aliquet. Curabitur mollis neque id dui faucibus, id vestibulum mauris blandit. </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Question Number 4?</h4>
                                <p> Cras eget placerat dolor. Pellentesque rutrum ligula nec viverra auctor. Nam a tortor ipsum. 
                                    Nunc fermentum fermentum purus, quis venenatis nibh gravida in.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Question Number 5?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lorem non sem sollicitudin placerat.
                                     Proin sed sem in ipsum malesuada aliquet. Curabitur mollis neque id dui faucibus, id vestibulum mauris blandit. </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Question Number 7?</h4>
                                <p> Cras eget placerat dolor. Pellentesque rutrum ligula nec viverra auctor. Nam a tortor ipsum. 
                                    Nunc fermentum fermentum purus, quis venenatis nibh gravida in.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Question Number 8?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lorem non sem sollicitudin placerat.
                                     Proin sed sem in ipsum malesuada aliquet. Curabitur mollis neque id dui faucibus, id vestibulum mauris blandit. </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Question Number 8?</h4>
                                <p> Cras eget placerat dolor. Pellentesque rutrum ligula nec viverra auctor. Nam a tortor ipsum. 
                                    Nunc fermentum fermentum purus, quis venenatis nibh gravida in.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact__container" id="Contact">
                   <h2 className="text-center">Got A Question?</h2>
                   <p className="text-center">We're here to help and answer any questions you might have.<br/> We look forward to hearing from you.</p>
                   <div className="container contact__contents">
                     <div className="row">
                         <div className="col-md-8">
                            <div className="left-content">
                                <div className="md-form">
                                    <input type="text" id="fullname" className="form-control" />
                                    <label for="fullname">Full Name</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="emailaddress" className="form-control" />
                                    <label for="emailaddress">Email Address</label>
                                </div>
                                <div className="md-form">
                                    <textarea id="question" className="md-textarea form-control" rows="3"></textarea>
                                    <label for="question">Question/Concern</label>
                                </div>
                                <div className="text-right">
                                 <button type="button" className="btn btn-sm btn-outline-danger waves-effect" >Send Message</button>
                                </div>
                            </div>
                         </div>
                         <div className="col-md-4 right-content">
                             <h4>Other ways to connect</h4>
                             <p>Call, email, send us a postcard - whatever works for you. We'll be here.</p>
                             <i className="fas fa-phone"></i> <span> (032) 111-222 </span><br/>
                             <i className="fas fa-envelope-open-text"></i><a href="mailto:streetfoodexpresscares@gmail.com"><span> streetfoodexpresscares@gmail.com</span></a><br/>
                             <i className="fas fa-map-marker-alt"></i><span> 1234 LoremIpsum Street, Cebu City, Philippines 6000</span>

                         </div>
                     </div>
                   </div>
                </div>

                <footer class="page-footer footer__container">
                    <div class="footer-copyright text-center py-3"><span>© 2020 Copyright:</span>
                        <a href="https://mdbootstrap.com/education/bootstrap/"> Streefoodexpress.com</a>
                    </div>
                </footer>

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
