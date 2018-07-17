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
import QRMenu from './../Menu/QRMenu.js';
import NFCMenu from './../Menu/NFCMenu.js';
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
        <StartMenu logout={this.props.logout.bind(this)} changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==1){
      var main = (
        <Statistics changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==2){
      var main=(
        <QRMenu changeMenu={this.changeMenu.bind(this)}/>
      )
    } else if (this.state.menuChoose==3){
      var main=(
        <NFCMenu changeMenu={this.changeMenu.bind(this)}/>
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
