import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import Header from '../../components/header';
import SideBar from '../../components/vendor.sidebar';
import AddModal from './modals/addmodal';
import EditModal from './modals/editmodal';
import ReactTable from 'react-table';
import Image from '../../components/image';
import 'react-table/react-table.css';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert';

import ProductService from '../../services/products.service';

class Container extends React.PureComponent<> {
    listener = null;

    state = {
        products: [],
        show: false,
        toEdit: null,
        toDelete: null,
    };
    componentDidMount(){
        this.closeListener();
        this.listener = ProductService.createStoreProductsListener(this.props.userId, (data) => {
            this.setState({products: data.filter(dat => dat.deleted === false)});
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
         const columns =[{
            Header: 'Id',
            accessor: 'id',
            filterable: true,
            // width: 100
         },
         {
            Header: 'Image',
            accessor: 'image',
            filterable: true,
            Cell: ({original}) => <Image imgUrl={original.imgUrl} className="img-fluid" alt="" style={{maxWidth: "120px"}} />,
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
            Cell: ({original}) => (
                <div> 
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                            this.setState({toEdit: original});
                        }}>
                            <i className="fas fa-pencil-alt mr-1"></i>Edit
                        </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            // this.setState({toDelete: original});
                            swal({
                                title: `Are you sure you want to delete ${original.name}?`,
                                text: "Once deleted, you will not be able to undo this action",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((willDelete) => {
                                if (willDelete) {
                                    const payload = {
                                        deleted: true,
                                    };
                                    ProductService.update(original.id, payload)()
                                        .then(() => {
                                            alert('successfully deleted item');
                                            this.setState({ toDelete: null});
                                        })
                                        .catch(err => {
                                            alert(err.message);
                                            this.setState({ toDelete: null});
                                        });
                                //   swal("Poof! Your product has been deleted!", {
                                //     icon: "success",
                                //   });
                                } else {
                                    //   swal("Your imaginary file is safe!");
                                }
                              });
                        }}
                        >
                            <i className="fas fa-trash-alt mr-1"></i>Delete
                        </button>
                </div>
                
            ),
            width: 270,
         }];
        console.log('hehe', this.state.toDelete)

        return (
            <div>
                {/*
                {true && (
                    <SweetAlert
                        show={!!this.state.toDelete}
                        icon = "warning"
                        title = "Are you sure?"
                        text = {`you want to delete ${this.state.toDelete && this.state.toDelete.name} ?`}
                        onConfirm = {() => {
                            const payload = {
                                deleted: true,
                            };
                            ProductService.update(this.state.toDelete.id, payload)()
                                .then(() => {
                                    alert('successfully deleted item');
                                    this.setState({ toDelete: null});
                                })
                                .catch(err => {
                                    alert(err.message);
                                    this.setState({ toDelete: null});
                                })
                        }}
                        onCancel={() => {
                            this.setState({ toDelete: null });
                        }}
                        // showCancelButton
                    />
                )}*/}
                
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
                                {!!this.state.toEdit && (
                                    <EditModal
                                        onClose={() => this.setState({toEdit: null})}
                                        show={!!this.state.toEdit}
                                        toEdit={this.state.toEdit}
                                        onSubmit={payload => {
                                            const updatedPayload = {
                                                ...payload,
                                            };
                                            console.log(updatedPayload);
                                            ProductService.update(this.state.toEdit.id, updatedPayload)()
                                                .then(() => {
                                                    alert('successfully updated');
                                                    this.setState({toEdit: null});
                                                })
                                                .catch(err => {
                                                    alert(err.message);
                                                })
                                        }}
                                    />
                                )}

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
