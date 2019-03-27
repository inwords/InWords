import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import WordlistToolbar from '../../components/Wordlist/WordlistToolbar';

class WordlistToolbarContainer extends Component {
    static propTypes = {
        checked: PropTypes.array.isRequired,
        deleteWordPairs: PropTypes.func.isRequired
    };

    handleDelWordPairs = () => {
        this.props.deleteWordPairs(this.props.checked);
    };

    render() {
        const { checked } = this.props;

        return (
            <WordlistToolbar
                delAvailable={!!checked.length}
                handleDelWordPairs={this.handleDelWordPairs}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteWordPairs: pairIds => dispatch(WordlistActions.deleteWordPairs(pairIds))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordlistToolbarContainer);
