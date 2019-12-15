import React from 'react';

import { Link } from 'react-router-dom';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div className="sidebar-fixed position-fixed">

                <Link className="logo-wrapper waves-effect">
                    <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt=""/>
                </Link>
        
                <div className="list-group list-group-flush">
                    <Link to="reviews" className="list-group-item waves-effect">
                        <i className="fas fa-users mr-3"></i>Reviews
                    </Link>
                    <Link to="pending_accounts" className={this.props.currentPage==="PendingAccounts"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                        <i className="fas fa-user mr-3"></i>Pending Accounts
                    </Link>
                
                </div>
      
          </div>
        );
    }
}


export default(Container);
