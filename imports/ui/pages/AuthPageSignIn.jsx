import React, { Component } from 'react';
import { Link } from 'react-router';

import Navbar from '../Navbar.jsx'

class AuthPageSignIn extends Component {

  render() {
    return (
      <div>
        <Navbar />

        <div className="container col-md-4 col-md-offset-4">

          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>

            <label for="inputEmail">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

            <label for="inputPassword">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
          </form>

          <Link to="/signup" className="btn btn-link btn-block">Still don't have an account? Sign Up.</Link>

        </div>
      </div>
    );
  }
}

export default AuthPageSignIn;
