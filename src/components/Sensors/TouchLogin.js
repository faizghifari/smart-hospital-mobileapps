import * as Keychain from 'react-native-keychain';
import { login } from './../LoginForm.js';

handlePress = () => {              // User presses the "Login using Touch ID" button

  Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
    .then(credentials => {
      const { username, password } = credentials;

      // Prompt the user to authenticate with Touch ID.
      // You can display the username in the prompt
      TouchID.authenticate(`to login with username "${username}"`)   
        .then(() => {

          // If Touch ID authentication is successful, call the `login` api
          login(username, password)
            .then(() => {
              // Handle login success
            })
            .catch(error => {
              if (error === 'INVALID_CREDENTIALS') {
                // The keychain contained invalid credentials :(
                // We need to clear the keychain and the user will have to sign in manually
                Keychain.resetGenericPassword();
              }
            })
        });
    });
};