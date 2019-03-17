import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../actions/WordlistActions';

class WordlistPairsSearch extends Component {
    static propTypes = {
        searchPattern: PropTypes.string.isRequired,
        findWordPairs: PropTypes.func.isRequired
    };

    state = {
        query: ""
    };

    componentWillUnmount() {
        if (this.props.searchPattern) {
            this.props.findWordPairs("")
        }
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    handleSubmit = (event) => {
        this.props.findWordPairs(this.state.query)

        event.preventDefault();
    };

    render() {
        const { query } = this.state;
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <input type="search" className="form-control mr-sm-2" placeholder="Поиск слов"
                    value={query} onChange={this.handleChange} />
                <button type="submit" className="btn btn-outline-primary">Найти</button>
            </form>
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
)(WordlistPairsSearch);
