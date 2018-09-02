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
import StartMenuMedics from './StartMenuMedics.js';
import {getCookiesData} from './../RealmDB/DBLogin.js';
import ChangePassword from './../Reuseable/ChangePassword.js';
import SideBarMedics from './Medics/SideBarMedics';
import SideMenu from 'react-native-side-menu';
import ReportAsset from './../Maintenance/ReportAsset'
import BookingAsset from './../Booking/BookingAsset'
import MapsManual from './MapsManual'
import {
  Container, Header, Left, Thumbnail, Right, Item, Input, Form, Button, Badge, Icon, Drawer, Body
} from 'native-base';

export default class MenuMedics extends Component {
  constructor(props){
    super(props);
    this.state={
      menuChoose: 0,
      mock:0
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

  mockUpOnly(){
    if(this.state.mock==0){
      this.setState({
        mock:1
      })
    }else if (this.state.mock==1) {
      this.setState({
        mock:2
      })
    }
    else if (this.state.mock==2) {
      this.setState({
        mock:3
      })
    }
  }

  render() {
    let main=null
    let statusColor=null
    let menu=null
    if (this.state.menuChoose==0){
      main = (
        <StartMenuMedics mock={this.state.mock} mockUpOnly={this.mockUpOnly.bind(this)} user={this.props.user} logout={this.props.logout.bind(this)} changeMenu={this.changeMenu.bind(this)}/>
      )
      statusColor='#1abc9c'
      menu="Home"
    }else if (this.state.menuChoose==1) {
      main=(
        <ReportAsset backHandler={this.changeMenu.bind(this,0)} />
      )
      statusColor='#a29bfe'
      menu="Issue Report"
    }else if (this.state.menuChoose==2) {
      main=(
        <BookingAsset mockUpOnly={this.mockUpOnly.bind(this)}/>
      )
      statusColor='#05C1ED'
      menu="Book Item"
    }else if (this.state.menuChoose==3) {
      main=(
        <MapsManual mockUpOnly={this.mockUpOnly.bind(this)} backHandler={this.changeMenu.bind(this,0)} startBooking={true} />
      )
      statusColor='#3498db'
      menu="Take Item"
    }else if (this.state.menuChoose==4) {
      main=(
        <MapsManual mockUpOnly={this.mockUpOnly.bind(this)} backHandler={this.changeMenu.bind(this,0)} endBooking={true} />
      )
      statusColor='#3498db'
      menu="Return Item"
    }
    else if (this.state.menuChoose==5) {
      main=(
        <ChangePassword user={this.props.user} nextMenu={this.changeMenu.bind(this,0)} />
      )
      statusColor='black'
      menu="Change Password"
    }
    let sideMenu=<SideBarMedics changeMenu={this.changeMenu.bind(this)} logout={this.props.logout.bind(this)}/>
    return (
      <SideMenu menu={sideMenu} isOpen={this.state.menuOpen} onChange={(isOpen)=>this.setState({menuOpen:isOpen})}>
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
