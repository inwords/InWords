import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container component="div" maxWidth="sm">
          <Typography component="h1" variant="h4" gutterBottom>
            Что-то пошло не так :(
          </Typography>
          <Typography>
            К сожалению, не удалось загрузить страницу. Проверьте соединение с
            интернетом или повторите попытку позже
          </Typography>
        </Container>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
