import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import OrderService from '../../services/orders.service';
import UserService from '../../services/user.service';

import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    listener = null;

    state = {
        orders: []
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
                filterable: true
            },
            {
                Header: 'Customer Name',
                accessor: (row) => row.customer.name,
                id: 'testing',
                filterable: true
            },
            {
                Header: 'Ordered Product/s',
                accessor: 'carts',

                Cell: ({original}) => {
                return <span>{original.cart.map(car => car.itemName)}</span>
                },
                filterable: true
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
                Header: 'Status',
                accessor: 'status',
                // width: 110
            },
            {
                Header: 'Actions',
                accessor: '',
                Cell: ({original}) => {
                    const statuses = ['waiting', 'accepted','rejected','delivery', 'delivered'];
                    // ['cancelled','waiting', 'accepted','rejected','delivery', 'delivered']
                    const canAcceptReject = original.status && original.status === 'waiting';
                    const canBeDelivered = original.status && original.status === 'accepted';
                    const canBeFinished = original.status && original.status === 'delivery';
                    const { customer } = original;
                    return (
                        <span>
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
                                    }}>
                                    accept
                                </button>
                                <button onClick={() => this.updateOrderStatus(original.id, 'rejected')}>
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
                                }}>start delivery</button>
                            )}
                            {canBeFinished && (
                                <button onClick={() => this.updateOrderStatus(original.id, 'delivered')}>finish transaction</button>    
                            )}
                        </span>
                    );
                },
                // width: 110
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
