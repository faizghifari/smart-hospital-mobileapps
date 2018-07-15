/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TouchID from 'react-native-touch-id';

TouchID.authenticate('Authenticate with fingerprint') // Show the Touch ID prompt
  .then(success => {
    // Touch ID authentication was successful!
    // Handle the successs case now
  })
  .catch(error => {
    // Touch ID Authentication failed (or there was an error)!
    // Also triggered if the user cancels the Touch ID prompt
    // On iOS and some Android versions, `error.message` will tell you what went wrong
  });

AppRegistry.registerComponent(appName, () => App);
