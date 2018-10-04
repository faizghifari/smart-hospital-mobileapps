import React, { Component } from 'react';
import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Login from './component/Login.js';
import Menu from './component/Menu/Menu.js';
import {getCookiesData,localLogout,deleteAll,getUserData} from './component/RealmDB/DBLogin.js';
import {mainIP} from './component/API/MainConfig.js';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:true,
      user:{
        roleId:1,
        language:0,
      }
    }
  }

  login(user){
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
      user=JSON.parse(JSON.stringify(user))
      this.setState({
        loggedIn:true,
        user:user
      })
    }
  }

  render() {
    if(!this.state.loggedIn){
      var main=(
        <Login language={this.state.language} login={this.login.bind(this)}/>
      )
    }else{
      var main=(
        <Menu language={this.state.language} user={this.state.user} logout={this.logout.bind(this)}/>
      )
    }
    return (
      <StyleProvider style={getTheme(commonColor)}>
        {main}
      </StyleProvider>
    );
  }
}
