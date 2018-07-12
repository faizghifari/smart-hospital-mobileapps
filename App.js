'use strict';

import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Login from './Login.js';
import LoggedIn from './component/Menu/StartMenu.js';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false
    }
  }

  async beacon(){
    Beacons.detectEstimotes()

    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }

    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data)
    })
  }

  login(){
    this.setState({
      loggedIn: true,
    })
  }

  render() {
    this.beacon();
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
