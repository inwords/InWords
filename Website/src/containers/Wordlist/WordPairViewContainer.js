import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordPairView from '../../components/Wordlist/WordPairView';

class WordPairViewContainer extends Component {
    static propTypes = {
        wordPair: PropTypes.object.isRequired,
        deleteWordPair: PropTypes.func.isRequired,
        handleSwitchEditMode: PropTypes.func.isRequired
    };

    handleDelWordPair = () => {
        this.props.deleteWordPair(this.props.wordPair.serverId);
    };

    render() {
        const { wordPair, handleSwitchEditMode } = this.props;

        return (
            <WordPairView
                wordPair={wordPair}
                handleSwitchEditMode={handleSwitchEditMode}
                handleDelWordPair={this.handleDelWordPair}
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
)(WordPairViewContainer);
