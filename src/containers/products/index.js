import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import AddModal from './modals/addmodal';
import EditModal from './modals/editmodal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SweetAlert from 'sweetalert2-react';
import ProductService from '../../services/products.service';

class Container extends React.PureComponent<> {
    listener = null;

    state = {
        products: [],
        show: false
    };
    componentDidMount(){
        this.closeListener();
        this.listener = ProductService.createStoreProductsListener(this.props.userId, (data) => {
            this.setState({products: data});
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

    toggleAddModal = () => 
        this.setState({
            showAddModal: !this.state.showAddModal
    })
    
    toggleEditModal = () => 
        this.setState({
        showEditModal: !this.state.showEditModal
    })
    
    toggleSweetAlert = () => this.setState({ showSweetAlert: !this.state.showSweetAlert })
    
    render() {
        const data = [{
            id: 1,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Pork Siomai',
            description: 'Lorem Ipsum etc etc',
            quantity: '20 packs'
         },
         {
            id: 2,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Hawaiian Pizza',
            description: 'Lorem Ipsum etc etc',
            quantity: '15 boxes'
         },
         {
            id: 3,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
            name: 'Fish Ball',
            description: 'Lorem Ipsum etc etc',
            quantity: '10 packs'
         },
         {
            id: 4,
            image: <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
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
            Cell: ({original}) => <img src={original.imgUrl} className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
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
            accessor: 'stockQty',
            // width: 100,
            filterable: true

         },
         {
            Header: 'Price',
            accessor: 'price',
            // width: 100,
            filterable: true

         },
         {
            Header: 'Actions',
            Cell: row => (
                <div> 
                    <button className="btn btn-warning btn-sm" onClick = {e => {this.toggleEditModal(); }} onClick={() => {}}><i className="fas fa-pencil-alt mr-1"></i>Edit</button>
                    <button className="btn btn-danger btn-sm"  onClick = {e => {this.toggleSweetAlert(); }} onClick={() => {}}><i className="fas fa-trash-alt mr-1"></i>Delete</button>
                    <SweetAlert
                        show = {this.state.showSweetAlert}   
                        icon = "warning"
                        title = "Are you sure?"
                        text = "you want to delete this user?"
                        onConfirm = {() => this.setState({ show: false})}
                        
                    />
                </div>
                
            )
         }];

        return (
            <div>
                <div>
                    <Header />
                </div>
                <SideBar
                    currentPage = {"Products"}
                />
                 <main className="pt-5 mx-lg-5" style={{minHeight: "100vh"}}>
                    <div className="container-fluid mt-5">

                        <div className="card mb-4 wow fadeIn">

                            <div className="card-body">
                                <h4 className="mb-2 mb-sm-0 pt-1">
                                    <span>Products</span>
                                    
                                    <button onClick = {e => {
                                        this.toggleAddModal();
                                    }} type="button" className="btn btn-info btn-sm"  style={{marginLeft: '1.5em'}}><i className="fas fa-plus mr-2"></i>Add Product</button>
                                </h4>

                               <AddModal
                                    onClose={this.toggleAddModal}
                                    show={this.state.showAddModal}
                                    onSubmit={payload => {
                                        const updatedPayload = {
                                            ...payload,
                                            store: this.props.user
                                        };
                                        this.props.addProduct(updatedPayload)
                                            .then(() => {
                                                this.toggleAddModal();
                                                alert('successfully added');
                                            })
                                            .catch(err => {
                                                alert(err.message);
                                            });
                                    }}
                                />
                               <EditModal
                                    onClose={this.toggleEditModal}
                                    show={this.state.showEditModal}
                                    onSubmit={payload => {
                                        const updatedPayload = {
                                            ...payload,
                                        };
                                        this.props.addProduct(updatedPayload)
                                            .then(() => {
                                                alert('successfully updated');
                                            })
                                            .catch(err => {
                                                alert(err.message);
                                            });
                                    }}
                                />

                               <ReactTable style={{marginTop: "2em"}}
                                    data = {this.state.products}
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
    user: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
    addProduct: payload => dispatch(ProductService.add(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
