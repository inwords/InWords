import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LearningOption from './LearningOption';
import Checkbox from './Checkbox';

const optionsList = [
    {
        key: 1,
        name: 'option-1',
        description: "Написать слово по переводу"
    }, {
        key: 2,
        name: 'option-2',
        description: "Выбрать слово по переводу"
    }, {
        key: 3,
        name: 'option-3',
        description: "Вспомнить перевод слова"
    }
];

class LearningOptionsSelector extends Component {
    state = {
        checkedOptions: new Map()
    };

    handleChange = (event) => {
        const option = event.target.name;
        const isChecked = event.target.checked;

        this.setState((prevState) => ({
            checkedOptions: prevState.checkedOptions.set(option, isChecked)
        }));
    };

    render() {
        return (
            <Fragment>
                <ul className="list-group mb-3">
                    {optionsList.map((option) =>
                        <LearningOption
                            key={option.key}
                            description={option.description}
                            checkbox={<Checkbox
                                name={option.name}
                                checked={!!this.state.checkedOptions.get(option.name)}
                                onChange={this.handleChange} />} />)}
                </ul>
                <div className="text-center">
                    <button type="button" className="btn btn-outline-primary"
                        onClick={this.props.handleClickSwitchLearningMode}>
                        Начать
                    </button>
                </div>
            </Fragment>
        );
    }
}

LearningOptionsSelector.propTypes = {
    handleClickSwitchLearningMode: PropTypes.func.isRequired
};

export default LearningOptionsSelector;
