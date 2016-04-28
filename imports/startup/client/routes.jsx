import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from '../../ui/App.jsx';
import Index from '../../ui/Index.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageSignUp from '../../ui/pages/AuthPageSignUp.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

browserHistory.listen(function (location) {
    //window.ga('send', 'pageview', location.pathname);
    console.log("Page: " + location.pathname);
});

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Index} />
      <Route path="signin" component={AuthPageSignIn}/>
      <Route path="signup" component={AuthPageSignUp}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Router>
);
