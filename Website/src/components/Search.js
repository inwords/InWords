import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    static propTypes = {
        searchAction: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    handleClick = () => {
        this.props.searchAction(this.state.query);
    };

    render() {
        const { query } = this.state;
        return (
            <form className="form-inline">
                <input type="search" className="form-control mr-sm-2" placeholder="Поиск" aria-label="Поиск" value={query} onChange={this.handleChange} />
                <button type="button" className="btn btn-outline-primary" onClick={this.handleClick}>Найти</button>
            </form>
        );
    }
}

export default Search;
