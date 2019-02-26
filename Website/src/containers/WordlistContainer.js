import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WordlistActions } from '../actions/WordlistActions';
import { Wordlist } from '../components/Wordlist';

class WordlistContainer extends Component {
    render() {
        const { authToken, wordlist, pullwordpairsAction } = this.props;
        return (
            <div className="container">
                <Wordlist token={authToken.token} wordPairs={wordlist.wordPairs}
                    pullwordpairs={pullwordpairsAction} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        authToken: store.authToken,
        wordlist: store.wordlist
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullwordpairsAction: (token) => dispatch(WordlistActions.pullwordpairs(token))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
