import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import ReactTable from 'react-table';
import UserService from '../../services/user.service';
import StoresService from '../../services/store.service';
import { arrayToObject } from '../../utils/common.util';
import Loader from '../../components/loader';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    usersListener = null;

    storesListener = null;

    state = {
        usersObj: {},
        storesObj: {},
    };

    componentDidMount(){
        this.closeListeners();
        this.usersListener = UserService.createListener((data) => {
            this.setState({usersObj: arrayToObject(data, 'id')});
        });

        this.storesListener = StoresService.createListener((data) => {
            this.setState({storesObj: arrayToObject(data, 'id')});
        });
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
    }
    render() {

         const columns =[{
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
         const { usersObj, storesObj } = this.state;
         const data = Object.values(usersObj).map(user => ({
             ...storesObj[user.id],
             ...user,
         }))
         .filter(user => user.type === 'store');
        
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


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
