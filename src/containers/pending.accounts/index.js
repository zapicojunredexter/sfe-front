import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/admin.sidebar';
import ReactTable from 'react-table';
import UserService from '../../services/user.service';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    listener = null;

    state = {
        users: [],
    };
    componentDidMount(){
        this.closeListener();
        this.listener = UserService.createListener((data) => {
            this.setState({users: data});
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
            store_image: '',
            store_name: 'Store 1',
            contact_number: '032-192231',
            location: 'location 1'
         },
         {
            store_image: '',
            store_name: 'Store 2',
            contact_number: '224324231',
            location: 'location 2'
         },
         {
            store_image: '',
            store_name: 'Store 3',
            contact_number: '123221321',
            location: 'location 3'
         },
         {
            store_image: '',
            store_name: 'Store 4',
            contact_number: '23424242',
            location: 'location 4'
         }]

         const columns =[{
            Header: 'Store Image',
            accessor: 'store_image'
            
         },
         {
            Header: 'Store Name',
            accessor: 'store_name',
            filterable: true
            
         },
         {
            Header: 'Contact #',
            accessor: 'contact_number',
            filterable: true
         },
         {
            Header: 'Location',
            accessor: 'location',
            filterable: true

         },
         {
            Header: 'Actions',
            Cell: row => (
                <div><button type="button" className="btn btn-success btn-sm">Approve</button>
                <button type="button" className="btn btn-danger btn-sm">Decline</button></div>
                
            )
           
         }];
         console.log('tuara man', this.state.users);

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
                                    <span>Pending Accounts</span>
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
