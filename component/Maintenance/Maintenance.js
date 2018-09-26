import React, {Component} from 'react';
import {View} from 'react-native';
import PPM from './PPM.js';
import {getUserData} from './../RealmDB/DBLogin.js';
import SparePartNeeded from './SparePartNeeded.js';

export default class Maintenance extends Component{
  constructor(props){
    super(props)
    this.state={
      PPM:0,
      users:null
    }
  }

  componentDidMount(){
    let users=getUserData()
    this.setState({
      users:users
    })
    if(this.props.cm){
      this.setState({
        PPM:2,
      })
    }else if (this.props.sp) {
      this.setState({
        PPM:1,
      })
    }
  }

  changeStep(i){
    if(i==1){
      console.log('kirim ke server');
    }else if (i==2) {
      console.log('kirim WO ke server');
    }
    this.setState({
      PPM:i
    })
  }

  render(){
    let main=null
    if(this.state.PPM==0){
      main=(
        <PPM users={this.state.users} backHandler={this.props.backHandler.bind(this)} cm={false} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }else if(this.state.PPM==1){
      main=(
        <SparePartNeeded users={this.state.users} backHandler={this.props.backHandler.bind(this)} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }else{
      main=(
        <PPM users={this.state.users} backHandler={this.props.backHandler.bind(this)} cm={true} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }
    return(
      <View style={{flex:1}}>
        {main}
      </View>
    )
  }
}
