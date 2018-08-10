'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
  View,
} from 'react-native';
import StartMenuEngineer from './StartMenuEngineer.js';
import Maintenance from './../Maintenance/Maintenance.js'


export default class MenuEngineer extends Component {
  constructor(props){
    super(props);
    this.state={
      menuChoose: 0,
      info:null
    }
  }

  changeMenu(select){
    this.setState({
      menuChoose: select
    })
  }

  toCM(info){
    console.log('brrr')
    this.setState({
      menuChoose:2,
      info:info
    })
  }

  toPPM(info){
    this.setState({
      menuChoose:3,
      info:info
    })
  }

  render() {
    let main=null
    console.log(this.state.menuChoose);
    if (this.state.menuChoose==0){
      main = (
        <StartMenuEngineer user={this.props.user} logout={this.props.logout.bind(this)} changeMenu={this.changeMenu.bind(this)} toCM={this.toCM.bind(this)} toPPM={this.toPPM.bind(this)}/>
      )
    }else if (this.state.menuChoose==1) {
      main =(
        <NotificationEngineer user={this.props.user} changeMenu={this.change.bind(this)}/>
      )
    }else if (this.state.menuChoose==2){
      main =(
        <Maintenance info={this.state.info} cm={true}/>
      )
    }else if (this.state.menuChoose==3){
      main=(
        <Maintenance info={this.state.info}/>
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
