import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../../actions/WordlistActions';
import LiveSearch from '../../components/LiveSearch';

class WordlistPairsSearchContainer extends Component {
    static propTypes = {
        searchPattern: PropTypes.string.isRequired,
        findWordPairs: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    componentWillUnmount() {
        if (this.props.searchPattern) {
            this.props.findWordPairs('');
        }
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        }, () => this.props.findWordPairs(this.state.query));
    };

    render() {
        const { query } = this.state;
        return (
            <LiveSearch
                query={query}
                handleChange={this.handleChange}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        searchPattern: store.wordlist.searchPattern
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        findWordPairs: (pattern) => dispatch(WordlistActions.findWordPairs(pattern))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistPairsSearchContainer);
