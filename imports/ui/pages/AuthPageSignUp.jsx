import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Avatars } from '../../api/avatars.js';
import { Link } from 'react-router';

import Navbar from '../Navbar.jsx'
import Notification from '../../client/Notification.js'

class AuthPageSignUp extends Component {

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
    const username = ReactDOM.findDOMNode(this.refs.inputUsername).value.trim();
    const name = ReactDOM.findDOMNode(this.refs.inputName).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.inputEmail).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.inputPassword).value;
    //TODO: Validate
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {name: name},
    }, (err) => {
      if (err) {
        if (err.reason = "Email already exists.") {
          Notification.alert("Esse email já está cadastrado");
          return;
        }
        else {
          Notification.alert("Houve um erro com o seu registro");
          console.log(err);
          return;
        }
      }
      else {

      }
    });
  }

  handleFile(event) {
    console.log("isso ae");
    var files = event.target.files;
    console.log("files.length: " + files.length);

    FS.Utility.eachFile(event, function(file) {
      Avatars.insert(file, function (err, fileObj) {
        if (err){
          console.log("Error");
          console.log(err);
           // handle error
        } else {
          console.log("Complete");
           // handle success depending what you need to do
          // var userId = Meteor.userId();
          // var imagesURL = {
          //   “profile.image”: “/cfs/files/images/“ + fileObj._id
          // };
          // Meteor.users.update(userId, {$set: imagesURL});
        }
      });
    });


    //
    // for (var i = 0, ln = files.length; i < ln; i++) {
    //   Avatars.insert(files[i], function (err, fileObj) {
    //     // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    //   });
    // }
  }

  render() {
    // <input type="file" onChange={this.handleFile.bind(this)} />
    return (
      <div>
        <div className="container col-md-4 col-md-offset-4">

          <form className="form-signup" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signup-heading">Sign up</h2>
            <div className="form-group">
              <label for="inputUsername">Username</label>
              <input type="name" ref="inputUsername" id="inputUsername" className="form-control" placeholder="Username" required />
            </div>
            <div className="form-group">
              <label for="inputName">Name</label>
              <input type="name" ref="inputName" id="inputName" className="form-control" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label for="inputEmail">Email address</label>
              <input type="email" ref="inputEmail" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
            </div>
            <div className="form-group">
              <label for="inputPassword">Password</label>
              <input type="password" ref="inputPassword" id="inputPassword" className="form-control" placeholder="Password" required />
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
            </div>
          </form>

          <Link to="/signin" className="btn btn-link btn-block">Already have an account? Sign In.</Link>

        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AuthPageSignUp);
