import React from 'react';
import { Link } from 'react-router-dom';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div className="sidebar-fixed position-fixed">
                <Link className="logo-wrapper waves-effect" to="#">
                    <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt=""/>
                </Link>
        
                <div className="list-group list-group-flush">
                    <Link to="" className={this.props.currentPage==="VendorDashboard"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                        <i className="fas fa-chart-bar mr-3"></i>Sales Report
                    </Link>
                    <Link to="products" className={this.props.currentPage==="Products"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                        <i className="fas fa-cubes mr-3"></i>Products
                    </Link>
                    <Link to="order_history" className={this.props.currentPage==="Orders"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                        <i className="fas fa-clipboard-list mr-3"></i>Orders History
                    </Link>
                    <Link to="reviews" className={this.props.currentPage==="Reviews"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                        <i className="fas fa-star mr-3"></i>Reviews
                    </Link>
                </div>
          </div>
        );
    }
}


export default(Container);
