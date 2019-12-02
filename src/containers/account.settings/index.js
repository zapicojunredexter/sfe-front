import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';

class Container extends React.PureComponent<> {
    render() {

        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar/>
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body" >
                                <h4 className="mb-2 mb-sm-0 pt-1" style={{marginBottom: '2em !important'}}>
                                    <span>Login Information</span>
                                </h4>

                                <div className="md-form">
                                    <i className="fas fa-envelope prefix"></i>
                                    <input type="text" id="form1" class="form-control" value="juantamad@gmail.com" disabled/>
                                    <label className="active">Email Address</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-lock prefix"></i>
                                    <input type="password" id="inputValidationEx2" value="12345" class="form-control validate" disabled/>
                                    <label className="active">Password</label>
                                </div>
                                <div className="text-right" style={{marginBottom: "2em"}}>
                                    <button className="btn btn-warning btn-md" ><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                                </div>

                                <hr/>

                                <h4 style={{marginTop: '2em'}}>Store Information</h4>

                                <div className="md-form">
                                    <i className="fas fa-store prefix"></i>
                                    <input type="text" id="form1" className="form-control" value="I dont Know Store" disabled/>
                                    <label className="active">Store Name</label>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-info prefix"></i>
                                    <textarea id="form10" className="md-textarea form-control" rows="2" disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                        incididunt ut labore et dolore magna aliqua.</textarea>
                                    <label className="active">Description</label>
                                </div>

                                <div className="md-form">
                                    <i className="fas fa-clock prefix"></i>
                                    <p style={{marginLeft: '3em', fontSize: '13px', color: 'gray'}}>Store Hours</p>
                                    <div>
                                        <ul style={{listStyleType: 'none'}}>
                                            <li>Monday 8am - 6pm</li>
                                            <li>Tuesday 8am - 6pm</li>
                                            <li>Wednesday 8am - 6pm</li>
                                            <li>Thursday 8am - 6pm</li>
                                            <li>Friday 8am - 10pm</li>
                                            <li>Saturday 8am - 10pm</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-map-marker-alt prefix"></i>
                                    <p style={{marginLeft: '3em', fontSize: '13px', color: 'gray'}}>Store Address</p>
                                    <p style={{marginLeft: '2.5em'}}>Junquera Street</p>
                                </div>
                                <div className="md-form">
                                    <i class="fas fa-money-bill-alt prefix"></i>
                                    <p style={{marginLeft: '3em', fontSize: '13px', color: 'gray'}}>Delivery Fee</p>
                                    <p style={{marginLeft: '2.5em'}}>70</p>
                                </div>
                                <div className="text-right">
                                    <button className="btn btn-warning btn-md" ><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
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
