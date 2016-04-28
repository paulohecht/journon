import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data';

import Notification from '../client/Notification.js';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Navbar from './Navbar.jsx';

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    if (!this.props.user) {
      browserHistory.push('/signin');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.user) {
      browserHistory.push('/signin');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    const url = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const api = "https://api.urlmeta.org/?url=" + encodeURIComponent(url)
    $.get(api, (data)  => {
      if (data.result.status != "OK") {
        Notification.alert("ERROR");
        return;
      }
      Posts.insert({
        url: data.meta.url,
        title: data.meta.title,
        image: data.meta.image,
        description: data.meta.description,
        createdAt: new Date(), // current time
      });
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
      this.setState({loading: false});
    });
  }

  renderPosts() {
    let filteredPosts = this.props.posts;
    return filteredPosts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }


  renderButtonLabel() {
    if (this.state.loading) {
      return (
        <i className="fa fa-spinner fa-spin fa-fw margin-bottom"></i>
      )
    }
    return "Add"
  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-7">
              <div className="well">
                <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
                  <div className="input-group input-group-lg">
                    <input type="text" ref="textInput" className="form-control input-lg" placeholder="Type your article URL here..." disabled={this.state.loading} />
                    <span className="input-group-btn">
                      <button className="btn btn-default btn-lg" type="submit" ref="buttonInput" disabled={this.state.loading}>
                        {this.renderButtonLabel()}
                      </button>
                    </span>
                  </div>
                </form>
              </div>
              <ul className="media-list">
                {this.renderPosts()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  posts: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Posts.find({ checked: { $ne: true } }).count(),
  };
}, Index);
