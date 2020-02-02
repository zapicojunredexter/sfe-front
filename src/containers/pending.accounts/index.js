import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import ReactTable from 'react-table';
import UserService from '../../services/user.service';
import StoresService from '../../services/store.service';
import CustomersService from '../../services/customers.service';
import { arrayToObject } from '../../utils/common.util';
import Loader from '../../components/loader';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    usersListener = null;

    storesListener = null;

    customersListener = null;

    state = {
        usersObj: {},
        storesObj: {},
        customersObj: {},
    };

    componentDidMount(){
        this.closeListeners();
        this.usersListener = UserService.createListener((data) => {
            this.setState({usersObj: arrayToObject(data, 'id')});
        });

        this.storesListener = StoresService.createListener((data) => {
            this.setState({storesObj: arrayToObject(data, 'id')});
        });

        this.customersListener = CustomersService.createListener((data) => {
            this.setState({customersObj: arrayToObject(data, 'id')});
        })
    }

    updateStoreStatus = (id, newKeyValues) => {
        Promise.all([
            UserService.update(id, newKeyValues)(),
            StoresService.update(id, newKeyValues)(),
        ])
        .then(() => alert('success'))
        .catch(err => alert(err.message));
    }

    componentWillUnmount(){
        this.closeListeners();
    }

    closeListeners = () => {
        if(this.usersListener){
            this.usersListener();
        }
        if(this.storesListener){
            this.storesListener();
        }
        if(this.customersListener){
            this.customersListener();
        }
    }
    render() {

         const storesColumns = [{
            Header: 'User ID',
            accessor: 'id'
            
         },
         {
            Header: 'Store Name',
            accessor: 'name',
            id: 'name',
            filterable: true
         },
         {
            Header: 'Contact #',
            accessor: 'contactNumber',
            filterable: true
         },
         {
            Header: 'Location',
            accessor: 'address',
            filterable: true
         },
         {
            Header: 'Files',
            Cell: ({original}) => (
                <span>
                    <ul>
                        {original.requirements && original.requirements.map((requirement, index) => (
                            <li>
                                <a href={requirement} target="_blank">Item {index + 1}</a>
                            </li>
                        ))}
                    </ul>
                </span>
                
            )
         },
         {
            Header: 'Account Status',
            Cell: ({original}) => (
                <span>
                    {
                    original.isDisabled ?
                        'DISABLED' :
                        'ACTIVE'
                    }
                </span>
                
            )
         },
         {
            Header: 'Actions',
            Cell: ({original}) => (
                <div>
                    {
                    original.isDisabled ?
                        <button type="button" onClick={() => this.updateStoreStatus(original.id, {
                            isDisabled: false,
                        })} className="btn btn-success btn-sm">Approve</button> :
                        <button type="button" onClick={() => this.updateStoreStatus(original.id, {
                            isDisabled: true,
                        })} className="btn btn-danger btn-sm">Decline</button>
                    }
                </div>
                
            )
           
         }];

         const customerColumns = [{
            Header: 'User ID',
            accessor: 'id'
         },
         {
            Header: 'Name',
            accessor: 'name',
            filterable: true
         },
         {
             Header: 'Contact Number',
             accessor: 'contactNumber',
             filterable: true
         },
         {
             Header: 'Address',
             filterable: true,
             accessor: 'address'
         }
         ];
         const { usersObj, storesObj, customersObj } = this.state;
         const stores = Object.values(usersObj).map(user => ({
             ...storesObj[user.id],
             ...user,
         }))
         .filter(user => user.type === 'store');

         const customers = Object.values(usersObj).map(user => ({
            ...customersObj[user.id],
            ...user,
        }))
        .filter(user => user.type === 'customer');

        
        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"PendingAccounts"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                     
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">


                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Store Accounts</span>
                                </h4>

                                <ReactTable style={{marginTop: "2em"}}
                                    data = {stores}
                                    columns = {storesColumns}
                                    defaultPageSize = {10}
                                    pageSizeOptions = {[10,30,50]}
                                    minRows = {1}
                                />

                            </div>



                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Customer Accounts</span>
                                </h4>

                                <ReactTable style={{marginTop: "2em"}}
                                    data = {customers}
                                    columns = {customerColumns}
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


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
