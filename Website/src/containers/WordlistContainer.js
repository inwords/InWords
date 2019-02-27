import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import { Wordlist } from '../components/Wordlist';

class WordlistContainer extends Component {
    render() {
        const { credentials, pullWordPairs, pullWordPairsAction, delWordPairsAction } = this.props;
        console.log(credentials, pullWordPairs, pullWordPairsAction)
        return (
            <div className="container">
                <Wordlist token={credentials.token} pairs={pullWordPairs.pairs} error={pullWordPairs.error}
                    pullWordPairs={pullWordPairsAction} deleteWordPairs={delWordPairsAction}/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        credentials: store.credentials,
        pullWordPairs: store.pullWordPairs
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullWordPairsAction: (token) => dispatch(WordlistActions.pullWordPairs(token)),
        delWordPairsAction: (token) => dispatch(WordlistActions.deleteWordPairs(token))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
