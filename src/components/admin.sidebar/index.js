import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div className="sidebar-fixed position-fixed">

                <a className="logo-wrapper waves-effect">
                <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt=""/>
                </a>
        
                <div className="list-group list-group-flush">
                <a href="#" className="list-group-item waves-effect">
                    <i className="fas fa-users mr-3"></i>Reviews
                </a>
                <a href="#" className={this.props.currentPage=="PendingAccounts"?"list-group-item active waves-effect":"list-group-item waves-effect"}>
                    <i className="fas fa-user mr-3"></i>Pending Accounts
                </a>
                
                </div>
      
          </div>
        );
    }
}


export default(Container);
