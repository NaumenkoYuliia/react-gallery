import React, { Component, PropTypes } from 'react';

const ICONS = {
    angleLeft: require('./angleLeft'),
    angleRight: require('./angleRight')
}

class Icon extends Component {
    render () {
        return <span dangerouslySetInnerHTML={{ __html: ICONS[this.props.type] }} {...this.props} />;
    }
};

Icon.propTypes = {
    type: React.PropTypes.oneOf(Object.keys(ICONS))
}

export default Icon;

