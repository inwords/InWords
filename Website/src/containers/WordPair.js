import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../actions/WordlistActions';
import WordPairView from '../components/WordPairView';
import WordPairEditor from './WordPairEditor';

class WordPair extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired,
        deleteWordPair: PropTypes.func.isRequired
    };

    state = {
        editModeActivated: false
    };

    handleClickDelWordPair = () => {
        this.props.deleteWordPair(this.props.wordPair.serverId);
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { wordPair } = this.props;
        const { editModeActivated } = this.state;

        return (
            !editModeActivated ?
                <div className="row">
                    <WordPairView wordPair={wordPair} />
                    <div className="col-md-auto">
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-outline-primary"
                                onClick={this.handleClickSwitchEditMode}>Редактировать</button>
                            <button type="button" className="btn btn-outline-danger"
                                onClick={this.handleClickDelWordPair}>Удалить</button>
                        </div>
                    </div>
                </div> :
                <WordPairEditor
                    wordPair={wordPair}
                    handleClickCancel={this.handleClickSwitchEditMode}
                />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteWordPair: (pairId) => dispatch(WordlistActions.deleteWordPair(pairId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordPair);
