

import React from 'react';
import StorageService from '../../../services/storage.service';
import { Link } from 'react-router-dom';

class Container extends React.PureComponent<> {

    state = {
        username: '',
        password: '',
        name: '',
        description: '',
        contactNumber: '',
        location: '',
        requirements: [],
    };

    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    handleChange = (key, value) => {
        this.setState({[key]: value});
    }

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div >
                <div className="modal fade show mregister__container" id="basicExampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
                data-gtm-vis-first-on-screen-2340190_1302="5755" data-gtm-vis-total-visible-time-2340190_1302="100" data-gtm-vis-has-fired-2340190_1302="1" aria-modal="true" >
      
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header mregister__header">
                            <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mregister__body">
                            <h4 className="text-center"><i className="fas fa-store"></i> Be a Vendor</h4>
                            <div className="container">
                                <p>Login Information</p>
                                <div className="md-form">
                                <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} type="text" id="regemailadd" className="form-control" />
                                <label for="regemailadd">E-mail address</label>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.password} onChange={e => this.handleChange('password', e.target.value)} type="password" id="regpass" className="form-control" />
                                    <label for="regpass">Type your password</label>
                                </div>
                                    <input onChange={async ev => {
                                        try {

                                            const files = Object.values(ev.target.files);
                                            const paths = await StorageService.uploadFile(files)();;
                                            this.setState({requirements: paths});
                                        } catch (err) {
                                            alert(err.message);
                                        }

                                    }} type="file" multiple className="form-control" />
                                    <span>{this.state.requirements.length} files uploaded</span>
                                
                                
                                <p>Store Information</p>
                                <div className="md-form">
                                <input value={this.state.name} onChange={e => this.handleChange('name', e.target.value)} type="text" id="storename" class="form-control"/>
                                <label for="storename">Store Name</label>
                                </div>
                                <div className="md-form">
                                <input value={this.state.location} onChange={e => this.handleChange('location', e.target.value)} type="text" id="storelocation" class="form-control"/>
                                <label for="storelocation">Store Location</label>
                                </div>
                                <div className="md-form">
                                <input value={this.state.contactNumber} onChange={e => this.handleChange('contactNumber', e.target.value)} type="text" id="storelocation" class="form-control"/>
                                <label for="contactNumber">Contact Number</label>
                                </div>
                                <div className="md-form">
                                <textarea value={this.state.description} onChange={e => this.handleChange('description', e.target.value)} id="storedesc" class="md-textarea form-control" rows="3"></textarea>
                                <label for="storedesc">Store Description</label>
                                </div>
                                <p className="registration-requirements">Also, kindly send to <a className="text-info">streetfoodexpresscares@gmail.com</a> the list of requirments written below for the approval of your store.</p>
                                <ul>
                                    <li>Requirement 1</li>
                                    <li>Requirement 2</li>
                                    <li>Requirement 3</li>
                                    <li>Requirement 4</li>
                                </ul>
                                <input type="checkbox" />
                                <span className="terms">Check here to indicate that you have read and agree to the 
                                <Link to="terms_and_conditions" className="text-info" target="_blank">Terms and Conditions</Link>
                                of Street Food Express.</span> 
                            </div>
                        </div>
                    <div className="modal-footer">
                        <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={() => {
                                const user = {
                                    username: this.state.username,
                                    password: this.state.password,
                                    requirements: this.state.requirements,
                                };
                                const store = {
                                    name: this.state.name,
                                    description: this.state.description,
                                    contactNumber: this.state.contactNumber,
                                    address: this.state.location,
                                    deliveryFee: 0,
                                    isDisabled: true,
                                    operatingHours: {
                                        Monday: {
                                            key: 'Monday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Tuesday: {
                                            key: 'Tuesday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Wednesday: {
                                            key: 'Wednesday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Thursday: {
                                            key: 'Thursday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Friday: {
                                            key: 'Friday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Saturday: {
                                            key: 'Saturday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                        Sunday: {
                                            key: 'Sunday',
                                            from: '00:00',
                                            to: '00:00',
                                            closed: true,
                                        },
                                    },
                                };
                                this.props.onSubmit(user, store);
                            }}
                        >Register</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);
