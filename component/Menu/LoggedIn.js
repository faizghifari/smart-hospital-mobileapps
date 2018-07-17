'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
  View,
} from 'react-native';
import Statistics from './Statistics.js'
import QRScanner from './../Sensor/QRScanner.js';
import Asset from './../Detail/Asset.js';;
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
    console.log(this.state.menuChoose);
    if (this.state.menuChoose==0){
      var main = (
        <StartMenu changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==1){
      var main = (
        <Statistics changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==2){
      var main=(
        <QRScanner changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==3){
      var main=(
        <NFC changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==4){
      var main=(
        <AssetsManagement changeMenu={this.changeMenu.bind(this)}/>
      )
    }
    return (
        <View style={{flex:1}}>
          {main}
        </View>
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
