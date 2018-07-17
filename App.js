'use strict';

import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Login from './Login.js';
import LoggedIn from './component/Menu/LoggedIn.js';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false
    }
  }


  login(){
    this.setState({
      loggedIn: true,
    })
  }

  render() {
    // Tells the library to detect iBeacons
    if(!this.state.loggedIn){
      var main=(
        <Login login={this.login.bind(this)}/>
      )
    }else{
      var main=(
        <LoggedIn/>
      )
    }
    return (
      <StyleProvider style={getTheme(commonColor)}>
        {main}
      </StyleProvider>
    );
  }
}
