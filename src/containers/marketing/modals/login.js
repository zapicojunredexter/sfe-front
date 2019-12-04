

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
                <div className="modal fade right show mlogin__container" id="sideModalTR" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-gtm-vis-first-on-screen-2340190_1302="1983489"
                data-gtm-vis-total-visible-time-2340190_1302="100" data-gtm-vis-has-fired-2340190_1302="1"  aria-modal="true">

                <div className="modal-dialog modal-side modal-top-right" role="document">

                    <div className="modal-content">
                    <div className="modal-header mlogin__header">
                        <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mlogin__body">
                        <h4 className="text-center"><i className="fa fa-user prefix"></i>Login</h4>
                        <div className="md-form">
                            <i className="fas fa-envelope prefix"></i>
                            <input type="text" id="loginemailadd" className="form-control" />
                            <label for="loginemailadd">E-mail address</label>
                        </div>
                        <div className="md-form">
                            <i className="fas fa-lock prefix"></i>
                            <input type="password" id="loginpass" className="form-control validate" />
                            <label for="loginpass" data-error="wrong" data-success="right">Type your password</label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary btn-sm waves-effect waves-light">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);
