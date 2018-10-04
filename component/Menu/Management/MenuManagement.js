'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid,
  View,
  StatusBar
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import {
  Header, Left, Right, Button, Icon, Body
} from 'native-base';

import Statistics from './../../Statistics/Statistics.js'
import QRMenu from './../../Asset/QRMenu.js';
import NFCMenu from './../../Asset/NFCMenu.js';
import Asset from './../../Asset/Asset.js';
import AssetList from './../../Asset/AssetList.js';
import {getCookiesData} from './../../RealmDB/DBLogin.js';
import ChangePassword from './../../Reuseable/ChangePassword.js';
import Maps from './../../Maps/Maps.js';
import ReportAsset from './../../Report/ReportAsset.js';
import SideBarManagement from './SideBarManagement.js';
import StartMenuManagement from './StartMenuManagement.js';

export default class MenuManagement extends Component {
  constructor(props){
    super(props);
    this.state={
      menuChoose: 0,
      sortUp: true,
      historyData: [
        {
          name: 'Electropump',
          id: 1,
          status: 'Done',
          past: 'PPM',
          image: require('../../../assets/c.png'),
          date: new Date(2018,8,24)
        },
        {
          name: 'Xray Data',
          id: 2,
          status: 'BER',
          past: 'CM',
          image: require('../../../assets/a.png'),
          date: new Date(2018,8,10)
        },
        {
          name: 'Xray Data',
          id: 3,
          status: 'Go to CM',
          past: 'PPM',
          image: require('../../../assets/a.png'),
          date: new Date(2018,8,23)
        },
        {
          name: 'Electro Pump',
          id: 4,
          status: 'Go to CM',
          past: 'CM',
          image: require('../../../assets/b.png'),
          date: new Date(2018,8,20)
        },
        {
          name: 'Xray Data',
          id: 5,
          status: 'Done',
          past: 'PPM',
          image: require('../../../assets/c.png'),
          date: new Date(2018,7,24)
        },
        {
          name: 'Syringe Pump',
          id: 6,
          status: 'Go to CM',
          past: 'PPM',
          image: require('../../../assets/d.png'),
          date: new Date(2018,9,20)
        },
      ]
    }
  }

  changeMenu(select){
    this.setState({
      menuChoose: select
    })
    this.openSideMenu()
  }

  openSideMenu(){
    this.setState({
      menuOpen:!this.state.menuOpen
    })
  }



  render() {
    let main=null
    let statusColor=null
    let menu=null
    if (this.state.menuChoose==0){
      main = (
        <StartMenuManagement user={this.props.user} logout={this.props.logout.bind(this)} changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='#1abc9c'
      menu="Home"
    } else if (this.state.menuChoose==1){
      main = (
        <Statistics changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='#3498db'
      menu="Statistics"
    } else if (this.state.menuChoose==2){
      main=(
        <QRMenu changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='#e74c3c'
      menu="QR Menu"
    } else if (this.state.menuChoose==3){
      main=(
        <NFCMenu changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='#9b59b6'
      menu="NFC Menu"
    } else if (this.state.menuChoose==4){
      main=(
        <AssetList setNewState={this.setState.bind(this)} sortUp={this.state.sortUp}  customData={this.state.historyData} changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='black'
      menu="Asset Management"
    }else if (this.state.menuChoose==5) {
      main=(
        <Maps user={this.props.user} changeMenu={this.changeMenu.bind(this)} />
      )
      statusColor='#3498db'
      menu="Trackers"
    }else if (this.state.menuChoose==6) {
      main=(
        <ReportAsset backHandler={this.changeMenu.bind(this,0)} />
      )
      statusColor='#a29bfe'
      menu="Issue Report"
    }else if (this.state.menuChoose==7) {
      main=(
        <ChangePassword user={this.props.user} nextMenu={this.changeMenu.bind(this,0)} />
      )
      statusColor='#17AFA0'
      menu="Change Password"
    }
    let sideMenu=<SideBarManagement changeMenu={this.changeMenu.bind(this)} logout={this.props.logout.bind(this)}/>
    return (
      <SideMenu menu={sideMenu} isOpen={this.state.menuOpen} onChange={(isOpen)=>this.setState({menuOpen:isOpen})}>
        <StatusBar
          backgroundColor={statusColor}
          animated={true}
          barStyle='light-content'
        />
        <View style={{flex:1, backgroundColor:'black'}}>
          <Header androidStatusBarColor={statusColor} style={{ backgroundColor: statusColor }} >
            <Left>
              <Button style={{marginLeft:5}} transparent onPress={this.openSideMenu.bind(this)} >
                <Icon ios='ios-menu' android="md-menu" style={{color: 'white', fontSize: 26 }} />
              </Button>
            </Left>
            <Body>
              <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{menu}</Text>
            </Body>
            <Right>
            </Right>
          </Header>
          {main}
        </View>
      </SideMenu>
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
