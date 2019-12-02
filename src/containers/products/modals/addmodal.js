import React from 'react';

class Container extends React.PureComponent<> {
    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div >
               <div className="modal fade show" id="addProduct" tabIndex="-1" role="dialog" aria-labelledby="addProduct" style={{display: 'block', paddingRight: '17px'}} aria-modal="true">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100" id="addProduct">Add a Product</h5>
                                <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                                    <label className="custom-file-label" for="inputGroupFile01">Choose Product's Image</label>
                                    </div>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="productName" className="form-control"/>
                                    <label for="productName">Name</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="productDescription" className="form-control"/>
                                    <label for="productDescription">Description</label>
                                </div>
                                <div className="md-form">
                                    <input type="number" id="productQty" className="form-control"/>
                                    <label for="productQty">Stock Quantity</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="stockType" className="form-control" placeholder="Ex: boxes/pieces/packs"/>
                                    <label for="stockType" className="active">Stock Type</label>
                                </div>
                            </div>
                            <div className="modal-footer" style={{borderTop: 'none'}}>
                             <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                             <button type="button" className="btn btn-success btn-sm waves-effect waves-light">Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);