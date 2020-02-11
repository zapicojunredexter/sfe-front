import React from 'react';
import StorageService from '../../../services/storage.service';
import Image from '../../../components/image';

class Container extends React.PureComponent<> {
    // static getDerivedStateFromProps = (props, state) => {
    //     console.log('HEHE', props,state);
    //     return {
    //         ...state,
    //         ...props.toEdit,
    //     };
    // }
    constructor(props){
        super(props);
        const { toEdit } = props;
        console.log('EYYY', toEdit);
        this.state = {
            name: toEdit ? toEdit.name: '',
            description: toEdit ? toEdit.description: '',
            stockQty: toEdit ? toEdit.stockQty: '',
            serving: toEdit ? toEdit.serving: '',
            price: toEdit ? toEdit.price: '',
            imgUrl: toEdit ? toEdit.imgUrl: '',
            isImageUploading: false,
        };
    }

    handleChange = (key, value) => {
        this.setState({[key]: value});
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div >
               <div className="modal fade show" id="editProduct" tabIndex="-1" role="dialog" aria-labelledby="editProduct" style={{display: 'block', paddingRight: '17px', overflow:'scroll'}} aria-modal="true">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100" id="editProduct">Edit a Product</h5>
                                <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                                    <Image
                                        imgUrl={this.state.imgUrl}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            alignSelf: 'center',
                                            // borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                        isLoading={this.state.isImageUploading}
                                    />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={ev => {
                                            const file = ev.target.files[0];
                                            this.setState({isImageUploading: true});
                                            StorageService.uploadFile([file])()
                                                .then(res => {
                                                    this.setState({imgUrl: res[0]});
                                                    this.setState({isImageUploading: false});
                                                })
                                                .catch(err => {
                                                    alert(err.message);
                                                    this.setState({isImageUploading: false});
                                                })
                                        }}
                                    />
                                    <label className="custom-file-label" for="inputGroupFile01">Choose Product's Image</label>
                                    </div>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.name} onChange={ev => this.handleChange('name',ev.target.value)} type="text" id="productName" className="form-control"/>
                                    <label className="active" for="productName">Name</label>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.description} onChange={ev => this.handleChange('description',ev.target.value)} type="text" id="productDescription" className="form-control"/>
                                    <label className="active" for="productDescription">Description</label>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.stockQty} onChange={ev => this.handleChange('stockQty',ev.target.value)} type="number" id="productQty" className="form-control" disabled/>
                                    <label className="active" for="productQty">Stock Quantity</label>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.price} onChange={ev => this.handleChange('price',ev.target.value)} type="number" id="price" className="form-control"/>
                                    <label className="active" for="price">Price</label>
                                </div>
                                <div className="md-form">
                                    <input value={this.state.serving} onChange={ev => this.handleChange('serving',ev.target.value)} type="text" id="stockType" className="form-control" placeholder="Ex: boxes/pieces/packs"/>
                                    <label className="active" for="stockType">Stock Type</label>
                                </div>
                            </div>
                            <div className="modal-footer" style={{borderTop: 'none'}}>
                             <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                             <button
                                type="button"
                                className="btn btn-success btn-sm waves-effect waves-light"
                                onClick={() => {
                                    const payload = {
                                        name: this.state.name,
                                        description: this.state.description,
                                        stockQty: Number(this.state.stockQty),
                                        price: Number(this.state.price),
                                        serving: this.state.serving,
                                        imgUrl: this.state.imgUrl,
                                    };
                                    this.props.onSubmit(payload);
                                }}
                            >Edit Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);
