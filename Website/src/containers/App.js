import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { Login } from '../components/Login';
import { Registration } from '../components/Registration';
import { TopNavbar } from '../components/TopNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    const { user, loginAction, registerAction } = this.props;
    return (
      <BrowserRouter>
        <div className="container">
          <TopNavbar />
          <Switch>
            <Route path="/signin" render={() =>
              <Login error={user.error} login={loginAction} />} />
            <Route path="/signup" render={() =>
              <Registration error={user.error} register={registerAction} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: userdata => dispatch(UserActions.login(userdata)),
    registerAction: userdata => dispatch(UserActions.register(userdata))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
