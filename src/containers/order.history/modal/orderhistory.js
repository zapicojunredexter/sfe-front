import React from 'react';


class Container extends React.PureComponent<> {
    
    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    render(){
        if(!this.props.show){
            return null;
        }

        return (
            <div>
                <div class="modal fade right show" id="sideModalTR" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-gtm-vis-first-on-screen-2340190_1302="273838" data-gtm-vis-total-visible-time-2340190_1302="100" data-gtm-vis-has-fired-2340190_1302="1" style={{display: "block", paddingRight: "16px"}} aria-modal="true">

                <div class="modal-dialog modal-side modal-top-right" role="document">


                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title w-100" id="myModalLabel">Order Id</h4>
                        <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Customer's Name:
                            </div>
                            <div class="col-md col-6 ">
                                <b>sdfds</b>
                            </div>
                        </div>
                        <div class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Ordered Product/s:
                            </div>
                            <div class="col-md col-6 ">
                                <ul style={{listStyle: "none"}}>
                                    <li><b>1</b></li>
                                    <li><b>2</b></li>
                                    <li><b>3</b></li>
                                    <li><b>4</b></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                No. of Items:
                            </div>
                            <div class="col-md col-6 ">
                                <b>4</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Order Date:
                            </div>
                            <div class="col-md col-6 ">
                                <b>February 1, 2020</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Delivery Start Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>12:05 pm</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Delivery End Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>12:20 pm</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Total Delivery Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>15 minutes</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Driver's Name:
                            </div>
                            <div class="col-md col-6 ">
                                <b>Juan Luna</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Order Status:
                            </div>
                            <div class="col-md col-6 ">
                                <b>Delivered</b>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }
    
    
}
export default(Container);
