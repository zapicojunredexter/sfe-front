import React from 'react';

class Container extends React.PureComponent<> {

    render() {
        const noImageUrl = '/images/no-image.png';
        const loadingUrl = '/images/loading-main.gif';
        const { imgUrl, isLoading } = this.props;
        const image = isLoading ? loadingUrl : (imgUrl || noImageUrl);
        return (
            <img
                {...this.props}
                alt={image}
                src={image}
            />
        );
    }
}


export default(Container);
