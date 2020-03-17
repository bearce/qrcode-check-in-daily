import React from 'react';
import './layout-medium.css';

class LayoutMedium extends React.Component {
    render() {
        return (
            <div className="layout-medium">
                { this.props.children }
            </div>
        )
    }
}

export default LayoutMedium;