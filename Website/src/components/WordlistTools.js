import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WordlistTools extends Component {
    render() {
        return (
            <div className="form-group sticky-top">
                <nav className="navbar navbar-light bg-light">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-primary btn">Добавить</button>
                    </div>
                </nav>
            </div>
        );
    }
}

WordlistTools.propTypes = {
    //
}
