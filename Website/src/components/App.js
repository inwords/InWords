import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'

import TopNavbar from './TopNavbar.js'
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="form-group">
                        <TopNavbar />
                    </div>
                    <Switch>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App