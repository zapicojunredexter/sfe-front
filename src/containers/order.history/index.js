import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import OrderModal from './modal/orderhistory';
import OrderService from '../../services/orders.service';
import UserService from '../../services/user.service';

import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    listener = null;

    state = {
        orders: [],
        orderDetails: false,
    };
    componentDidMount(){
        this.closeListener();
        this.listener = OrderService.createStoreListener(this.props.userId, (data) => {
            this.setState({orders: data});
        });
    }
    componentWillUnmount(){
        this.closeListener();
    }

    closeListener = () => {
        if(this.listener){
            this.listener();
        }
    }
    updateOrderStatus = async (orderId, status) => {
        const payload = {
            status,
            [`${status}Date`]: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await OrderService.update(orderId, payload)()
            .then(() => {
                alert('successfully updated');
            })
            .catch(err => {
                alert(err.message);
            })
    }


    render() {
        const columns =[
            {
                Header: 'Id',
                accessor: 'id',
                // width: 100,
                filterable: true,
                // Cell: ({original}) => (
                //     <button
                //         className="btn btn-md btn-info"
                //         type="button"
                //         onClick = {e => {
                //             this.toggleOrderModal();
                //         }}>
                //         Order Details
                //     </button>
                // ),
                Cell: ({original}) => (
                    <a
                        style={{textDecoration: 'underline'}}
                        onClick={() => {
                            this.setState({orderDetails: original})
                        }}>{original.id}</a>
                )
            },
            
            {
                Header: 'Customer Name',
                accessor: (row) => row.customer.name,
                id: 'testing',
                filterable: true
            },
            {
                Header: 'Status',
                accessor: 'status',
                width: 80
            },
            {
                Header: 'Actions',
                accessor: '',
                Cell: ({original}) => {
                    const statuses = ['waiting', 'accepted','rejected','delivery', 'delivered'];
                    // ['cancelled',' ', 'accepted','rejected','delivery', 'delivered']
                    const canAcceptReject = original.status && original.status === 'waiting';
                    const canBeDelivered = original.status && original.status === 'accepted';
                    const canBeFinished = original.status && original.status === 'delivery';
                    const { customer } = original;
                    return (
                        <span style={{flex: '1',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                            {canAcceptReject && (
                                <>
                                <button onClick={() => {
                                    this.updateOrderStatus(original.id, 'accepted')
                                        .then(() => {
                                            UserService.sendNotifToUser(customer.id, {
                                                title: 'Your order has been accepted',
                                                message: 'Item is being prepared'
                                            })
                                            .then(() => {})
                                            .catch(err => {});
                                        });
                                    }} class="btn btn-dark-green btn-sm">
                                    accept
                                </button>
                                <button onClick={() => this.updateOrderStatus(original.id, 'rejected')} class="btn btn-danger btn-sm">
                                    reject
                                </button>
                                </>
                            )}
                            {canBeDelivered && (
                                <button onClick={() => {
                                    this.updateOrderStatus(original.id, 'delivery').then(() => {
                                        console.log('sending notif')
                                        UserService.sendNotifToUser(customer.id, {
                                            title: 'Your order is being delivered',
                                            message: 'Item is on its way'
                                        })
                                        .then(() => console.log('notif sent'))
                                        .catch(err => console.log('notif not sent', err));
                                    });
                                   
                                }}  class="btn btn-info btn-sm" >start delivery</button>
                            )}
                            {canBeFinished && (
                                <button onClick={() => this.updateOrderStatus(original.id, 'delivered')} class="btn btn-success btn-sm" >finish transaction</button>    
                            )}
                        </span>
                    );
                },
                width: 280
            },
            {
                Header: 'Ordered Product/s',
                accessor: 'carts',

                Cell: ({original}) => {
                return <span>{original.cart.map(car => car.itemName)}</span>
                },
                // filterable: true
            },
            {
                Header: 'Number of Items',
                accessor: 'stockQty',
                Cell: ({original}) => {
                    return <span>{original.cart.length}</span>
                },
                // width: 110
            },
            {
                Header: 'Start Time',
                accessor: 'startTime',
                width: 90
            },
            {
                Header: 'End Time',
                accessor: 'endTime',
                width: 90
            },
            {
                Header: 'Total Delivery Time',
                accessor: 'totalTime',
                width: 90
            },
        ];

        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"Orders"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">
                        <OrderModal
                            onClose={() => {
                                this.setState({orderDetails: null})
                            }}
                            show={this.state.orderDetails}
                            orderDetails={this.state.orderDetails}
                        />

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Order History</span>
                                </h4>

                                <ReactTable style={{marginTop: "2em"}}
                                    data = {this.state.orders}
                                    columns = {columns}
                                    defaultPageSize = {10}
                                    pageSizeOptions = {[10,30,50]}
                                    minRows = {1}
                                />

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    userId: state.userStore.user && state.userStore.user.id,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
