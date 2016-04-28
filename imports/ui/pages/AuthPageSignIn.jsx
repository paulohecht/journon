import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class AuthPageSignIn extends Component {

  componentWillMount() {
    if (this.props.user) {
      browserHistory.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user) {
      browserHistory.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    //Retrieve values...
    const email = ReactDOM.findDOMNode(this.refs.inputEmail).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.inputPassword).value;
    //TODO: Validate
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        Notification.alert("Wrong username or password.");
        console.log(err);
        return;
      }
      else {
        //Redirect...
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">

          <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please sign in</h2>

            <label for="inputEmail">Email address</label>
            <input type="email" ref="inputEmail" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

            <label for="inputPassword">Password</label>
            <input type="password" ref="inputPassword" id="inputPassword" className="form-control" placeholder="Password" required />
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
          </form>

          <Link to="/signup" className="btn btn-link btn-block">Still don't have an account? Sign Up.</Link>

        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AuthPageSignIn);
