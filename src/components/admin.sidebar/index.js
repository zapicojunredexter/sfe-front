import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div className="sidebar-fixed position-fixed">

                <a className="logo-wrapper waves-effect">
                <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt=""/>
                </a>
        
                <div className="list-group list-group-flush">
                <a href="#" className="list-group-item active waves-effect">
                    <i className="fas fa-users mr-3"></i>Users
                </a>
                
                </div>
      
          </div>
        );
    }
}


export default(Container);
