import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        return (
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
            
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
                    
                    <ul className="navbar-nav mr-auto">  
                    </ul>
            
                    
                    <ul className="navbar-nav nav-flex-icons">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Admin </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                        <a className="dropdown-item" href="#"><i class="fas fa-sign-out-alt" style={{marginRight: '1em'}}></i>Logout</a>
                        </div>
                    </ul>
                    
            
                    </div>
            
                </div>
                </nav>
            </header>
        );
    }
}


export default(Container);
