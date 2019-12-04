

import React from 'react';

class Container extends React.PureComponent<> {
    onClose = e => {
        this.props.onClose && this.props.onClose(e)
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
                                <input type="text" id="regemailadd" className="form-control" />
                                <label for="regemailadd">E-mail address</label>
                                </div>
                                <div className="md-form">
                                    <input type="password" id="regpass" className="form-control validate" />
                                    <label for="regpass" data-error="wrong" data-success="right">Type your password</label>
                                </div>
                                <div className="md-form">
                                    <input type="password" id="regpass2" className="form-control validate" />
                                    <label for="regpass2" data-error="wrong" data-success="right">Re-Type your password</label>
                                </div>
                                <p>Store Information</p>
                                <div class="md-form">
                                <input type="text" id="storename" class="form-control"/>
                                <label for="storename">Store Name</label>
                                </div>
                                <div class="md-form">
                                <input type="text" id="storelocation" class="form-control"/>
                                <label for="storelocation">Store Location</label>
                                </div>
                                <div class="md-form">
                                <textarea id="storedesc" class="md-textarea form-control" rows="3"></textarea>
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
                                <span className="terms">Check here to indicate that you have read and agree to the <a className="text-info">Terms and Conditions</a> of Street Food Express.</span> 
                            </div>
                        </div>
                    <div className="modal-footer">
                        <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary btn-sm waves-effect waves-light">Register</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);
