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
import {
  Container, Header, Left, Thumbnail, Right, Item, Input, Form, Button, Badge, Icon, Drawer, Body
} from 'native-base';
import Moment from 'moment';
import SideMenu from 'react-native-side-menu'
import Maintenance from './../../Maintenance/Maintenance.js'
import VerifIssueReport from './../../Report/VerifIssueReport.js'
import SideBarEngineer from './SideBarEngineer.js'
import AssetList from './../../Asset/AssetList.js'
import DetailPastPPM from './../../Maintenance/DetailPastPPM.js'
import ReportAsset from './../../Report/ReportAsset.js'
import MapsManual from './../../Maps/MapsManual.js'
import Notification from './Notification.js'
import History from './History.js'
import StartMenuEngineer from './StartMenuEngineer.js';

export default class MenuEngineer extends Component {
  constructor(props){
    super(props);
    this.state={
      sortUp: true,
      menuOpen:false,
      menuChoose: 0,
      info:null,
      customData: [
        {
          name: 'Syringe Pump',
          id: 0,
          status: 'Need CM',
          image: require('../../assets/b.png'),
          localstatus: 2,
          date: new Date()
        },
        {
          name: 'Electropump',
          id: 1,
          status: 'Need PPM',
          image: require('../../assets/c.png'),
          localstatus:1,
          date: new Date(2018,8,24)
        },
        {
          name: 'Xray Data',
          id: 2,
          status: 'Need PPM',
          image: require('../../assets/a.png'),
          localstatus:11,
          date: new Date(2018,8,10)
        },
        {
          name: 'Xray Data',
          id: 3,
          status: 'Need CM',
          image: require('../../assets/a.png'),
          localstatus:10,
          date: new Date(2018,8,23)
        },
        {
          name: 'Electro Pump',
          id: 4,
          status: 'Need PPM',
          image: require('../../assets/b.png'),
          localstatus:-1,
          date: new Date(2018,7,20)
        },
        {
          name: 'Xray Data',
          id: 5,
          status: 'Need PPM',
          image: require('../../assets/c.png'),
          localstatus:0,
          date: new Date(2018,7,26)
        },
        {
          name: 'Syringe Pump',
          id: 6,
          status: 'Need PPM',
          image: require('../../assets/d.png'),
          localstatus:-2,
          date: new Date(2018,9,20)
        },
        {
          name: 'Syringe Pump',
          id: 7,
          status: 'Need Verif',
          image: require('../../assets/d.png'),
          localstatus:-3,
        }
      ],
      historyData: [
        {
          name: 'Syringe Pump',
          id: 0,
          status: 'Ready for disposal',
          image: require('../../assets/b.png'),
          past: 'PPM',
          date: new Date()
        },
        {
          name: 'Electropump',
          id: 1,
          status: 'Done',
          past: 'PPM',
          image: require('../../assets/c.png'),
          date: new Date(2018,8,24)
        },
        {
          name: 'Xray Data',
          id: 2,
          status: 'BER',
          past: 'CM',
          image: require('../../assets/a.png'),
          date: new Date(2018,8,10)
        },
        {
          name: 'Xray Data',
          id: 3,
          status: 'Go to CM',
          past: 'PPM',
          image: require('../../assets/a.png'),
          date: new Date(2018,8,23)
        },
        {
          name: 'Electro Pump',
          id: 4,
          status: 'Go to CM',
          past: 'CM',
          image: require('../../assets/b.png'),
          date: new Date(2018,8,20)
        },
        {
          name: 'Xray Data',
          id: 5,
          status: 'Done',
          past: 'PPM',
          image: require('../../assets/c.png'),
          date: new Date(2018,7,24)
        },
        {
          name: 'Syringe Pump',
          id: 6,
          status: 'Go to CM',
          past: 'PPM',
          image: require('../../assets/d.png'),
          date: new Date(2018,9,20)
        },
      ]
    }
  }

  changeMenu(select){
    this.setState({
      menuChoose: select
    })
    if(select!=1){
      this.openSideMenu()
    }
  }

  changeMenuItem(select,item){
    this.setState({
      menuChoose: select,
      item:item,
    })
  }

  toCM(info){
    window.alert('haha')
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

  openSideMenu(){
    this.setState({
      menuOpen:!this.state.menuOpen
    })
  }

  render() {
    let main=null
    let statusColor=null
    if (this.state.menuChoose==0){
      main =(
        <StartMenuEngineer customData={this.state.customData} user={this.props.user} changeMenu={this.changeMenu.bind(this)} toCM={this.toCM.bind(this)} toPPM={this.toPPM.bind(this)}/>
      )
      statusColor='black'
    }else if (this.state.menuChoose==1){
      main =(
        <Notification setNewState={this.setState.bind(this)} sortUp={this.state.sortUp}  customData={this.state.customData} changeMenu={this.changeMenuItem.bind(this)}/>
      )
      statusColor='#48dbfb'
    }else if (this.state.menuChoose==2){
      main =(
        <Maintenance item={this.state.item} backHandler={this.changeMenu.bind(this,0)} info={this.state.info} cm={true}/>
      )
      statusColor='#48dbfb'
    }else if (this.state.menuChoose==3){
      main=(
        <Maintenance item={this.state.item} backHandler={this.changeMenu.bind(this,0)} info={this.state.info} sp={true}/>
      )
      statusColor='#48dbfb'
    }else if (this.state.menuChoose==4) {
      main=(
        <Maintenance item={this.state.item} backHandler={this.changeMenu.bind(this,0)} info={this.state.info}/>
      )
    }else if (this.state.menuChoose==5) {
      main = (
        <History setNewState={this.setState.bind(this)} sortUp={this.state.sortUp} customData={this.state.historyData} changeMenu={this.changeMenuItem.bind(this)}/>
      )
      statusColor='black'
    }else if (this.state.menuChoose==6) {
      main = (
        <DetailPastPPM item={this.state.item} data={this.state.data} changeMenu={this.changeMenu.bind(this)} />
      )
      statusColor='black'
    }else if (this.state.menuChoose==7) {
      main = (
        <AssetList setNewState={this.setState.bind(this)} sortUp={this.state.sortUp}  customData={this.state.historyData} changeMenu={this.changeMenuItem.bind(this)}/>
      )
      statusColor='black'
    }else if (this.state.menuChoose==8) {
      main = (
        <ReportAsset backHandler={this.changeMenu.bind(this,0)} />
      )
      statusColor='#a29bfe'
    }else if (this.state.menuChoose==9) {
      main=(
        <MapsManual />
      )
      statusColor='black'
    }else if (this.state.menuChoose==10) {
      main=(
        <VerifIssueReport backHandler={this.changeMenu.bind(this,0)} changeMenu={this.changeMenuItem.bind(this)}/>
      )
      statusColor='#a29bfe'
    }
    let menu=<SideBarEngineer changeMenu={this.changeMenu.bind(this)} logout={this.props.logout.bind(this)}/>
    return (
      <SideMenu menu={menu} isOpen={this.state.menuOpen} onChange={(isOpen)=>this.setState({menuOpen:isOpen})}>
        <View style={{flex:1, backgroundColor:'black'}}>
          <StatusBar
            backgroundColor={statusColor}
            animated={true}
            barStyle='light-content'
          />
          <Header androidStatusBarColor={statusColor} style={{ backgroundColor: statusColor }} >
            <Left>
              <Button style={{marginLeft:5}} transparent onPress={this.openSideMenu.bind(this)} >
                <Icon ios='ios-menu' android="md-menu" style={{color: 'white', fontSize: 26 }} />
              </Button>
            </Left>
            <Body>
            </Body>
            <Right>
              <Button style={{marginRight:5}} transparent onPress={this.changeMenu.bind(this,1)} >
                <Icon ios='ios-notifications' android="md-notifications" style={{color: 'white', fontSize: 26 }} />
              </Button>
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
