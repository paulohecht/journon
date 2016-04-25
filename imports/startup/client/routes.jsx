import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import App from '../../ui/App.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageSignUp from '../../ui/pages/AuthPageSignUp.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

browserHistory.listen(function (location) {
    //window.ga('send', 'pageview', location.pathname);
    console.log("Page: " + location.pathname);
});

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/signin" component={AuthPageSignIn}/>
    <Route path="/signup" component={AuthPageSignUp}/>
    <Route path="*" component={NotFoundPage}/>
  </Router>
);
