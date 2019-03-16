import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WordlistActions } from '../actions/WordlistActions';

class WordlistPairsSearch extends Component {
    static propTypes = {
        findWordPairs: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    componentWillUnmount() {
        this.props.findWordPairs('');
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        }, () => {
            this.props.findWordPairs(this.state.query)
        });
    };

    render() {
        const { query } = this.state;
        return (
            <form className="form-inline">
                <input type="search" className="form-control mr-sm-2" placeholder="Поиск" aria-label="Поиск" value={query} onChange={this.handleChange} />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findWordPairs: (pattern) => dispatch(WordlistActions.findWordPairs(pattern))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(WordlistPairsSearch);
