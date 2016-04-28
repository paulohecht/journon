import React, { Component } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class NavbarButtons extends Component {
  render() {

  }
}

class Navbar extends Component {

  componentWillMount() {
    console.log("teste");
  }

  handleLogoutClick() {
    Meteor.logout();
  }

  renderAuthenticatedButtons() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.handleLogoutClick.bind(this)}>Logout</a></li>
      </ul>
    );
  }

  renderUnauthenticatedButtons() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
      </ul>
    );
  }

  renderButtons() {
    if (this.props.user) {
      return this.renderAuthenticatedButtons();
    }
    else {
      return this.renderUnauthenticatedButtons();
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <img src="/logo.png" />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {this.renderButtons()}
          </div>
        </div>
      </nav>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Navbar);
