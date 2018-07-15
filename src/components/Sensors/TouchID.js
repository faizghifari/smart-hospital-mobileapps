import * as Keychain from 'react-native-keychain';
import { login } from './../LoginForm.js';

// Submission handler of the login form
handleSubmit = () => {
  const {
    email,                  // Get the credentials entered by the user
    password,               // (We're assuming you are using controlled form inputs here)
    shouldEnableTouchID,    // Did you ask the user if they want to enable Touch ID login ?
  } = this.state;

  login(email, password) // call the `login` api
    .then(() => {
      if (shouldEnableTouchID) {
        // if login is successful and users want to enable Touch ID login
        Keychain.setGenericPassword(email, password); // store the credentials in the keychain
      }
    });
};