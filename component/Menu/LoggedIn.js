'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';

import Drawer from './../Utilities/Drawer.js';
import PPM from './PPM.js';
import QRScanner from './../Sensor/QRScanner.js';
import StartMenu from './StartMenu.js';
export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state={
      menuChoose: 0
    }
  }

  changeMenu(select){
    this.setState({
      menuChoose: select
    })
  }

  render() {
    var navigationView = (
      <Drawer/>
    )
    if (this.state.menuChoose==0){
      var main = (
        <StartMenu changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==1){
      var main = (
        <QRScanner/>
      )
    } else if (this.state.menuChoose==2){
      var main=(
        <Localization/>
      )
    }
    return (
        <DrawerLayoutAndroid ref="myDrawer"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          keyboardDismissMode='on-drag'
          drawerLockMode='locked-closed'
        >
          {main}
        </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
