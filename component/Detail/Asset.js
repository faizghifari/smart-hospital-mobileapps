import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text,
        ListView,
        TouchableOpacity,
        Image,
        ScrollView,
        LayoutAnimation,
        Platform,
        UIManager,
} from 'react-native';
import Chart from './../Chart/Chart.js';
import AssetDetail from './AssetDetail.js';
import AssetMaintenance from './AssetMaintenance.js';
import {MIcon as Icon} from './../Utilities/Icon.js';
import {Button} from 'native-base';
import MapsDetail from './../Menu/MapsDetail.js'

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
          <TouchableOpacity onPress={this.props.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'black',padding:15}}/>
          </TouchableOpacity>
          <AssetDetail desc={desc}/>
          <Button onPress={this.changeMap.bind(this)}>
            <Text style={{textAlign:'center'}}>Track Item</Text>
          </Button>
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
