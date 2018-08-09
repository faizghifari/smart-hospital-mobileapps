'use strict';

import React, { Component } from 'react';
import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Login from './Login.js';
import LoggedIn from './component/Menu/LoggedIn.js';
import {getCookiesData,localLogout,deleteAll,getUserData} from './component/RealmDB/DBLogin.js';
import {mainIP} from './component/API/MainConfig.js';
import Cookie from 'react-native-cookie';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false,
      user:null
    }
  }


  login(user){
    console.log(token.JWTtoken)
    this.setState({
      loggedIn:true,
      user:user
    })
  }

  logout(){
    localLogout()
    this.setState({
      loggedIn: false,
    })
  }

  componentDidMount(){
    let token = getCookiesData()
    if(token!=undefined){
      let user= getUserData()
      this.setState({
        loggedIn:true,
        user:user
      })
    }
  }

  render() {
    // Tells the library to detect iBeacons
    if(!this.state.loggedIn){
      var main=(
        <Login login={this.login.bind(this)}/>
      )
    }else{
      var main=(
        <LoggedIn user={this.state.user} logout={this.logout.bind(this)}/>
      )
    }
    return (
      <StyleProvider style={getTheme(commonColor)}>
        {main}
      </StyleProvider>
    );
  }
}
