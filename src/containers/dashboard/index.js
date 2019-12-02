import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    render() {

        const data = [{
            id: 1,
            first_name: 'Vincent',
            last_name: 'Otto',
            user_type: 'Vendor'
         },
         {
            first_name: 'Jacob',
            last_name: 'Thornton',
            user_type: 'Customer'
         },
         {
            first_name: 'Larry',
            last_name: 'Lee',
            user_type: 'Customer'
         },
         {
            first_name: 'Harry',
            last_name: 'Potter',
            user_type: 'Vendor'
         }]

         const columns =[{
            Header: 'Id',
            accessor: 'id',
            width: 50,
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
            Header: 'User Type',
            accessor: 'user_type',
            width: 110,
            filterable: true

         },
         {
            Header: 'Actions',
            Cell: row => (
                <div><button type="button" className="btn btn-success btn-sm">Activate</button>
                <button type="button" className="btn btn-danger btn-sm">Deactivate</button></div>
                
            )
           
         }]

        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"dashboard"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Users</span>
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
