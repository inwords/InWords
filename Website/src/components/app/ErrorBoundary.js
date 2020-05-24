import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RouteContainer from 'src/components/app-common/RouteContainer';
import Typography from 'src/components/core/Typography';

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
        <RouteContainer component="div" maxWidth="sm">
          <Typography component="h1" variant="h4" gutterBottom>
            Что-то пошло не так{' '}
            <span role="img" aria-label="взволнованное лицо">
              &#128543;
            </span>
          </Typography>
          <Typography>
            К сожалению, не удалось загрузить страницу. Проверьте соединение с
            интернетом или повторите попытку позже.
          </Typography>
        </RouteContainer>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
