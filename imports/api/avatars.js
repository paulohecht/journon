import { Mongo } from 'meteor/mongo';

const store = new FS.Store.FileSystem("images", {path: process.env.PWD + '/public/ugc/profiles'});

export const Avatars = new FS.Collection("images", {stores: [store]});

// if (Meteor.isServer) {
//   Avatars.allow({
//     'insert': function () {
//       // add custom authentication code here
//       return true;
//     }
//   });
// }
