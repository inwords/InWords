import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LearningOption extends Component {
    render() {
        const { description, checkbox } = this.props;

        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-md-auto">
                        {checkbox}
                    </div>
                    <div className="col">
                        {description}
                    </div>
                </div>
            </li>
        );
    }
}

LearningOption.propTypes = {
    description: PropTypes.string.isRequired,
    checkbox: PropTypes.object.isRequired
};

export default LearningOption;
