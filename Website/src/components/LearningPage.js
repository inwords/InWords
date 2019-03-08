import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LearningOptionsSelector from './LearningOptionsSelector';

class LearningPage extends Component {
    state = {
        learningModeActivated: false
    };

    handleClickSwitchLearningMode = () => {
        this.setState({
            learningModeActivated: !this.state.learningModeActivated
        });
    };

    render() {
        const { learningModeActivated } = this.state;

        console.log(this.state.checkedOptions)
        return (
            <Fragment>
                {!learningModeActivated ?
                    <LearningOptionsSelector
                        handleClickSwitchLearningMode={this.handleClickSwitchLearningMode} /> :
                    <h3 className="text-center">Не реализовано</h3>}

            </Fragment>
        );
    }
}

LearningPage.propTypes = {
    //smartWordPair: PropTypes.func.isRequired
};

export default LearningPage;
