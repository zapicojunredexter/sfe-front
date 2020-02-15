import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Container extends React.PureComponent<> {
    state = {
        productsMap: {},
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e)
    }

    addToProducts = (mainKey, secondaryKey, amount) => {
        const currentState = this.state.productsMap[mainKey];
        this.setState({
            productsMap: {
                ...this.state.productsMap,
                [mainKey]: {...currentState,[secondaryKey]: amount}
            },
        })
    }

    render() {
        
        const columns =[{
            Header: 'Product Name',
            accessor: 'name',
            filterable: true,
            // width: 100
         },
         {
            Header: 'Current Stock Quantity',
            accessor: 'stockQty',
            width: 180

         },
         {
             Header: 'Add Stock Quantity',
             accesor: 'addqty',
             Cell: ({original}) => (
                <div className="md-form" style={{marginTop: '-.5em'}}>
                 <input  type="number" value={this.state.productsMap && this.state.productsMap[original.id] && this.state.productsMap[original.id].add} onChange={ev => this.addToProducts(original.id, 'add', ev.target.value)} id="addQty" className="form-control"/>
                <label className={this.state.productsMap && this.state.productsMap[original.id] && this.state.productsMap[original.id].add && 'active'} for="addQty">Add Quantity</label>
                </div>
             )
         },
         {
            Header: 'Deduct Stock Quantity',
            accesor: 'minusqty',
            Cell: ({original}) => (
                <div className="md-form" style={{marginTop: '-.5em'}}>
                 <input  type="number" value={this.state.productsMap && this.state.productsMap[original.id] && this.state.productsMap[original.id].minus} onChange={ev => this.addToProducts(original.id, 'minus', ev.target.value)} id="minusQty" className="form-control"/>
                <label className={ this.state.productsMap && this.state.productsMap[original.id] && this.state.productsMap[original.id].minus && 'active'} for="minusQty">Deduct Quantity</label>
                </div>
            )
        },
        //  {
        //     Header: 'Actions',
        //     accessor: 'actions',
        //     Cell: ({original}) => (
        //         <div class="row"> 
        //             <div class="col-md-4">
        //                 <button
        //                     className="btn btn-success btn-sm"
        //                     >
        //                         <i className="fas fa-plus mr-1"></i>
        //                 </button>
        //             </div>
        //             <div class="col-md-4" style={{textAlign: 'center'}}>
        //                 <p style={{color: '#8d8989', marginTop: '.5em'}}> 0 </p>
        //             </div>
        //             <div class="col-md-4">
        //                 <button
        //                     className="btn btn-danger btn-sm"
        //                     >
        //                         <i className="fas fa-minus mr-1"></i>
        //                 </button>
        //             </div>
                   
                    
                   
        //         </div>
                
        //     )
        //  }
        ];

        const { products } = this.props;

        const data = products;

        if(!this.props.show){
            return null;
        }
        return (
            <div >
               <div className="modal fade show" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-gtm-vis-first-on-screen-2340190_1302="17324" data-gtm-vis-total-visible-time-2340190_1302="100" data-gtm-vis-has-fired-2340190_1302="1" aria-modal="true" style={{display: 'block', paddingRight: '17px', overflow:'scroll'}} aria-modal="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100" id="addProduct">Add an Item</h5>
                                <button onClick = {e => {this.onClose(e); }} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/*
                                <div class="row">
                                    <div class="col-md-6">
                                        <select class="browser-default custom-select" onChange={ev => this.setState({productId: ev.target.value})}>

                                            <option value={''}>SELECT ITEM</option>
                                            {products.map(product => {
                                                return (
                                                <option value={product.id}>{product.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div className="md-form" style={{marginTop: '-.5em'}}>
                                            <input  type="number" value={this.state.addQty || null} onChange={ev => this.setState({addQty: ev.target.value})} id="addQty" className="form-control"/>
                                            <label for="addQty">Add Quantity</label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div className="md-form" style={{marginTop: '-.5em'}}>
                                            <input  type="number" value={this.state.deductQty || null} onChange={ev => this.setState({deductQty: ev.target.value})} id="minusQty" className="form-control"/>
                                            <label for="minusQty">Deduct Quantity</label>
                                        </div>
                                    </div>
                                </div>
                                */}
                                
                                <ReactTable style={{marginTop: "2em"}}
                                    data = {data}
                                    columns = {columns}
                                    defaultPageSize = {10}
                                    pageSizeOptions = {[10,30,50]}
                                    minRows = {1}
                                />       
                            </div>
                            <div className="modal-footer" style={{borderTop: 'none'}}>
                            <button
                                disabled={Object.keys(this.state.productsMap).length === 0}
                                type="button" className="btn btn-primary btn-sm waves-effect waves-light"
                                onClick={() => {
                                    this.props.submit(this.state.productsMap);
                                }}
                            >Save Changes</button>
                             <button onClick = {e => {this.onClose(e); }} type="button" className="btn btn-danger btn-sm waves-effect waves-light" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default(Container);
