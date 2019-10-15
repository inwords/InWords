import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  title: {
    margin: theme.spacing(3, 0, 2)
  }
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container component="div" maxWidth="sm">
          <Typography
            component="h1"
            variant="h4"
            className={this.props.classes.title}
          >
            Что-то пошло не так :(
          </Typography>
          <Typography component="p" variant="body1">
            Попробуйте обновить страницу. Если ошибка повторится, проверьте
            соединение с Интернетом.
          </Typography>
        </Container>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(ErrorBoundary);
