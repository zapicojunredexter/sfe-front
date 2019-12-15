import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import OrderService from '../../services/orders.service';
import 'react-table/react-table.css';


const columns =[
    {
        Header: 'Id',
        accessor: 'id',
        width: 100,
        filterable: true
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
        filterable: true
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
        filterable: true
    },
    {
        Header: 'Ordered Product/s',
        accessor: 'ordered_products',
        filterable: true
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
        width: 110
    }
];
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
    render() {
        const data = [{
            id: 1,
            first_name: 'Vincent',
            last_name: 'Otto',
            ordered_products: 'Hawaiian Pizza',
            quantity: '5 boxes'
         },
         {
            id: 2,
            first_name: 'Jacob',
            last_name: 'Thornton',
            ordered_products: 'Siomai',
            quantity: '1 pack'
         },
         {
            id: 3,
            first_name: 'Larry',
            last_name: 'Lee',
            ordered_products: 'Lumpia Shanghai',
            quantity: '25 pieces'
         },
         {
            id: 4,
            first_name: 'Harry',
            last_name: 'Potter',
            ordered_products: 'Fish Ball',
            quantity: '1 pack'
         }];

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
                                    data = {data}
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
