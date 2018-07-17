import React, {Component} from 'react';
import {View,Text, StyleSheet, FlatList
} from 'react-native';
import { ListItem, CheckBox, Text as TextN, Body } from 'native-base';

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


export default class AssetMaintenance extends Component{
  constructor(props){
    super(props);
    this.state=({
      check0:false,
      check1:false,
    })
  }
  checkHandle(i){
    var state= 'check'+i;
    const newState = {...this.state};
    newState[state] = !this.state[state];
    this.setState(newState);
  }

  maintenanceList(data,index){
    var state= 'check'+index;
    return(
      <ListItem>
        <CheckBox checked={this.state[state]} onPress={this.checkHandle.bind(this,index)} />
        <Body>
          <TextN>{data.activity}</TextN>
        </Body>
      </ListItem>
    )
  }

  render(){
    const xAxisHeight = 30;
    const axesSvg = {fontSize:10,fill:'grey'};
    const verticalContentInset = { top: 10, bottom: 10 };
    var maintenanceData = [{
      "activity":"1. Wake up"
    },{
      "activity":"2. Making bed"
    }]
    return(
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleText}>Maintenance</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <View style={{flex:0.9,flexDirection:'column'}}>
              <FlatList
                style={styles.container}
                data={maintenanceData}
                renderItem={({item,index})=>this.maintenanceList(item,index)} //change this
                keyExtractor={(item,key) => key.toString()}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
