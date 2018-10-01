'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
  View,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import MenuMOH from './MOH/MenuMOH.js';
import MenuEngineer from './Engineer/MenuEngineer.js';
import MenuMedics from './Medics/MenuMedics.js';
import MenuManagement from './Management/MenuManagement.js';
import {getCookiesData} from './../RealmDB/DBLogin.js';

export default class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
      menuChoose: 1,
    }
  }

  componentDidMount(){
    let result=getCookiesData()
    if(result!=undefined){
      result=JSON.parse(JSON.stringify(result))
      this.setState({
        menuChoose:1
      })
      // FingerprintScanner
      //   .isSensorAvailable()
      //   .then(()=>{
      //     FingerprintScanner
      //       .authenticate({ onAttempt: ()=>{console.log('this');window.alert('Wrong fingerprint');} })
      //       .then(() => {
      //         console.log('this');
      //         window.alert('Authenticated successfully');
      //           this.setState({
      //             menuChoose:2
      //           })
      //
      //       })
      //       .catch((error) => {
      //         console.log(error)
      //       });
      //   })
      //   .catch(()=>{
      //     this.setState({
      //       menuChoose:0
      //     })
      //   })
    }
  }

  changeMenu(select){
    this.setState({
      menuChoose: select
    })
  }

  render() {
    let main=null
    console.log(this.state.menuChoose);
    if (this.state.menuChoose==-1){
      main = (
        <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#48dbfb',flex:1,padding:20}}>
          <Text style={{fontSize:14,textAlign:'center',color:'white'}}>Scan your Fingerprint on the device scanner to continue</Text>
        </View>
      )
    }
    if (this.state.menuChoose==0){
      main = (
        <MenuMOH user={this.props.user} logout={this.props.logout.bind(this)}/>
      )
    } else if (this.state.menuChoose==1){
      main = (
        <MenuEngineer user={this.props.user} logout={this.props.logout.bind(this)}/>
      )
    } else if (this.state.menuChoose==2){
      main = (
        <MenuMedics user={this.props.user} logout={this.props.logout.bind(this)}/>
      )
    } else if (this.state.menuChoose==3){
      main = (
        <MenuManagement user={this.props.user} logout={this.props.logout.bind(this)} />
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
