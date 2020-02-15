import React from 'react';


class Container extends React.PureComponent<> {
    
    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    render(){
        if(!this.props.show){
            return null;
        }
        const { orderDetails } = this.props;
        const startDelTime = orderDetails.deliveryDate && orderDetails.deliveryDate.toDate();
        const endDelTime = orderDetails.deliveredDate && orderDetails.deliveredDate.toDate();
        const deliveryTotalTime = (startDelTime && endDelTime) ? (`${(endDelTime.getTime() - startDelTime.getTime()) / 60000} minutes`) : '-';
        const statusMapper = {
            'cancelled': 'Cancelled',
            'waiting': 'Waiting',
            'accepted': 'Accepted',
            'rejected': 'Rejected',
            'delivery': 'Being Delivered',
            'delivered': 'Delivered'
        };
        return (
            <div>
                <div class="modal fade right show" id="sideModalTR" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-gtm-vis-first-on-screen-2340190_1302="273838" data-gtm-vis-total-visible-time-2340190_1302="100" data-gtm-vis-has-fired-2340190_1302="1" style={{display: "block", paddingRight: "16px"}} aria-modal="true">

                <div class="modal-dialog modal-side modal-top-right" role="document">


                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title w-100" id="myModalLabel">{orderDetails.id}</h4>
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
                                <b>{orderDetails.customer && orderDetails.customer.name}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Delivery Address:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{orderDetails.deliveryAddress}</b>
                            </div>
                        </div>
                        <div class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Ordered Product/s:
                            </div>
                            <div class="col-md col-6 ">
                                <ul style={{listStyle: "none"}}>
                                    {orderDetails.cart && orderDetails.cart.map(crt => (
                                        <li><b>{crt.itemName} ({crt.orderQty})</b></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                No. of Items:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{orderDetails.cart && orderDetails.cart.length}</b>
                            </div>
                        </div>
                        <div class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Total Cost:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{orderDetails.payment && orderDetails.payment.total}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Order Date:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{orderDetails.createdAtMs && new Date(orderDetails.createdAtMs.toDate()).toUTCString()}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Delivery Start Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{startDelTime && new Date(startDelTime).toLocaleTimeString() || '-'}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Delivery End Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{endDelTime && new Date(endDelTime).toLocaleTimeString() || '-'}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Total Delivery Time:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{deliveryTotalTime}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Driver's Name:
                            </div>
                            <div class="col-md col-6 ">
                                    <b>{orderDetails.driverName || '-'}</b>
                            </div>
                        </div>
                        <div class="row" class="row" style={{marginBottom: ".5em"}}>
                            <div class="col-md col-6">
                                Order Status:
                            </div>
                            <div class="col-md col-6 ">
                                <b>{statusMapper[orderDetails.status]}</b>
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
