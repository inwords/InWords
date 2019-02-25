import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { UserActions } from '../actions/UserActions';
import { Wordlist } from '../components/Wordlist';

class WordlistContainer extends Component {
    render() {
        return (
            <Container>
                <Wordlist />
            </Container>
        );
    }
}

export default WordlistContainer;
