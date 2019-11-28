import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        return (
            <button onClick={this.props.akoangfunction}>
                {this.props.akoanglabel}
            </button>
        );
    }
}


export default(Container);
