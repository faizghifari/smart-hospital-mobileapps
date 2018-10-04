import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text,
        TouchableOpacity,
        ScrollView,
} from 'react-native';
import {Button} from 'native-base';
import Chart from './../Reuseable/Chart/Chart.js';
import AssetDetail from './AssetDetail.js';
import AssetMaintenance from './AssetMaintenance.js';
import {MIcon as Icon} from './../Reuseable/Utilities/Icon.js';
import MapsDetail from './../Maps/MapsDetail.js'

styles = StyleSheet.create({
  mainPage:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#F0F0F0',
    justifyContent:'center',
    alignItems:'center',
  },
  cardContainer:{
    marginTop:10,
    flexDirection:'column',
    flex:0.95,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    marginBottom: 8
  },
  titleText:{
    paddingBottom:5,
    paddingTop:5,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold'
  },
  legendText:{
    fontSize: 12,
    textAlign:'center',
  }
})




export default class Asset extends Component{
  constructor(props){
    super(props);
    this.state={
      shrink:true,
      map:false,
    }
  }
  changeMap(){
    this.setState({
      map:!this.state.map
    })
  }

  render(){
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const desc = null;
    if(!this.state.map){
      return(
        <ScrollView style={{backgroundColor: '#F5F5F5', flex:1}} contentContainerStyle={styles.cardContainer}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={this.props.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'black',padding:15}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.changeMap.bind(this)}>
              <Text style={{color:'black',padding:15}}>Track Item</Text>
            </TouchableOpacity>
          </View>
          <AssetDetail desc={desc}/>
          <Chart data={data}/>
          <AssetMaintenance />
        </ScrollView>
      )
    }else{
      return(
        <MapsDetail backHandler={this.changeMap.bind(this)} />
      )
    }
  }
}
