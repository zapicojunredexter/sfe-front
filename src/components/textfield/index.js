import React from 'react';

class Container extends React.PureComponent<> {

    state = {
        username: '',
        password: 'admin'
    }


    render() {
        return (
            <div style={{color: this.props.akoangFontColor}}>
            {this.props.value}
            </div>
        );
    }
}


export default(Container);
