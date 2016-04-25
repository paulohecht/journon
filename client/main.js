import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});

// import App from '../imports/ui/App.jsx';

// Meteor.startup(() => {
//   render(<App />, document.getElementById('render-target'));
// });
