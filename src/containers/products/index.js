import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    render() {

        const data = [{
            id: 1,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" class="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Pork Siomai',
            description: 'Lorem Ipsum etc etc',
            quantity: '20 packs'
         },
         {
            id: 2,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" class="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Hawaiian Pizza',
            description: 'Lorem Ipsum etc etc',
            quantity: '15 boxes'
         },
         {
            id: 3,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" class="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Fish Ball',
            description: 'Lorem Ipsum etc etc',
            quantity: '10 packs'
         },
         {
            id: 4,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" class="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Lumpia Shanghai',
            description: 'Lorem Ipsum etc etc',
            quantity: '35 pieces'
         }]

         const columns =[{
            Header: 'Id',
            accessor: 'id',
            filterable: true,
            width: 100
         },
         {
            Header: 'Image',
            accessor: 'image',
            filterable: true,
            width: 180

         },
         {
            Header: 'Name',
            accessor: 'name',
            filterable: true
         },
         {
            Header: 'Description',
            accessor: 'description',
            filterable: true

         },
         {
            Header: 'Quantity',
            accessor: 'quantity',
            width: 100

         },
         {
            Header: 'Actions',
            Cell: row => (
                <div> 
                    <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editProduct"><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                    <button class="btn btn-danger btn-sm"><i className="fas fa-trash-alt mr-1"></i>Delete</button>
                </div>
                
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
                                    <span>Products</span>
                                    
              <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#addProduct" style={{marginLeft: '1.5em'}}><i className="fas fa-plus mr-2"></i>Add Product</button>
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
