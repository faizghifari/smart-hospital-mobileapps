import React, {Component} from 'react';
import {View} from 'react-native';
import PPM from './PPM.js';
import WorkOrder from './WorkOrder.js';
import {getUserData} from './../RealmDB/DBLogin.js';

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
    if(this.props.cm!=undefined){
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
      console.log('disini')
      main=(
        <PPM users={this.state.users} cm={false} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }else if(this.state.PPM==1){
      main=(
        <WorkOrder users={this.state.users} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }else{
      main=(
        <PPM users={this.state.users} cm={true} changeStepMaintenance={this.changeStep.bind(this)} />
      )
    }
    console.log(main);
    return(
      <View style={{flex:1}}>
        {main}
      </View>
    )
  }
}
