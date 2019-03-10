import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameWordCard extends Component {
    render() {
        const { randomWord, opened } = this.props;

        return (
            <div className="col">
                <div className="card text-center text-white bg-primary mb-3"
                    onClick={() => this.props.handleClick(randomWord.id)}>
                    {opened ?
                        <div className="card-body">
                            <h5 className="card-title">
                                {randomWord.word}
                            </h5>
                        </div> :
                        <div className="card-body">
                            <h5 className="card-title invisible">
                                {randomWord.word}
                            </h5>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

GameWordCard.propTypes = {
    randomWord: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWordCard;
