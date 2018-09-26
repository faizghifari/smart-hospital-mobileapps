import React, {Component} from 'react';
import {View,Text, StyleSheet, FlatList,Image
} from 'react-native';
import { ListItem, CheckBox, Text as TextN, Body } from 'native-base';

const styles = StyleSheet.create({
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

var data= [
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
    date: new Date(2018,8,20)
  },
  {
    name: 'Xray Data',
    id: 5,
    status: 'Need CM',
    image: require('../../assets/c.png'),
    localstatus:0,
    date: new Date(2018,7,24)
  },
  {
    name: 'Syringe Pump',
    id: 6,
    status: 'Need PPM',
    image: require('../../assets/d.png'),
    localstatus:-2,
    date: new Date(2018,9,20)
  },
]

export default class AssetMaintenance extends Component{
  constructor(props){
    super(props);
    this.state=({
      check0:false,
      check1:false,
    })
  }

  renderNotif(item){
    return(
      <View style={{
        flex: 1, flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
      }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignContent: 'center' }} >
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
          </View>
          <View style={{ flex: 1, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
            <Text style={styles.assetTitle}>{item.name}</Text>
            <Text style={{ color: 'yellow' }}>{item.status}</Text>
            {item.date != null ?
            <Text style={{ color: 'green' }}>Finished at: {item.date.toLocaleDateString()}</Text> : <View></View>
            }
          </View>
        </View>
      </View>
    )
  }



  render(){
    const xAxisHeight = 30;
    const axesSvg = {fontSize:10,fill:'grey'};
    const verticalContentInset = { top: 10, bottom: 10 };
    return(
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Maintenance History</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
        </View>
        <View style={{justifyContent:'center', flexDirection:'row'}}>
          <View style={{flex:0.9,flexDirection:'column'}}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                this.renderNotif(item)
              }
            />
          </View>
        </View>
      </View>
    )
  }
}
