import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div className="sidebar-fixed position-fixed">

                <a className="logo-wrapper waves-effect">
                <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt=""/>
                </a>
        
                <div className="list-group list-group-flush">
                    <a href="#" className={this.props.currentPage=="VendorDashboard"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                    <i class="fas fa-chart-bar mr-3"></i>Sales Report
                    </a>
                    <a href="#" className={this.props.currentPage=="Products"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                    <i class="fas fa-cubes mr-3"></i>Products
                    </a>

                    <a href="#" className="list-group-item waves-effect">
                    <i class="fas fa-clipboard-list mr-3"></i>Orders History
                    </a>

                
                </div>
      
          </div>
        );
    }
}


export default(Container);
