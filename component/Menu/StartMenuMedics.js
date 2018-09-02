
'use strict';

import React, { Component } from 'React'
var t = require('tcomb-form-native');
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Button
} from 'react-native';


import { Container, Header, Root, Toast, Input, Item, Icon } from "native-base"
import Gradient from 'react-native-linear-gradient';
import Moment from 'moment';
//import Calendar from 'react-native-calendar-select';
// import { RNCamera } from 'react-native-camera';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'



export default class StartMenuMedics extends Component {

    constructor(props) {
        super(props);
        this.state = {
          customData:[
            {
              id:'10121312321',
              name:'Ultra Sound',
              location:'Room 5',
              startDate:new Date(),
              bookTime:[null,null,null,null,null,null,null,1,1,1],
              status:'Scheduled',
              ready:0
            },{
              id:'10121312323',
              name:'Syringe Pump',
              location:'Room 1',
              startDate:new Date(),
              bookTime:[null,null,null,null,null,null,null,null,1,1],
              status:'Scheduled',
              ready:0
            },{
              id:'10121312322',
              name:'X-Ray',
              location:'Room 3',
              startDate:new Date(),
              bookTime:[1,null,null,null,1,null,null,null,1,1],
              status:'Scheduled',
              ready:0
            },{
              id:'10121312324',
              name:'Ultra Sound',
              location:'Room 6',
              startDate:new Date(2018,7,30),
              bookTime:[null,null,null,null,1,null,null,null,1,1],
              status:'Scheduled',
              ready:0
            },
          ]
        }
        this.arrayData=this.state.customData
    }

    componentDidMount(){
      if(this.props.mock==1){
        let newCustomData=this.state.customData
        newCustomData[2].bookTime[1]=1
        console.log(newCustomData)
        this.setState({
          customData:newCustomData
        })
      }else if (this.props.mock==2) {
        let newCustomData=this.state.customData
        newCustomData[2].bookTime[1]=1
        newCustomData[2].ready=2
        this.setState({
          customData:newCustomData
        })
      }else if (this.props.mock==3) {
        let newCustomData=this.state.customData
        newCustomData[2].bookTime[1]=1
        newCustomData[2].bookTime[0]=null
        newCustomData[2].ready=0
        this.setState({
          customData:newCustomData
        })
      }
    }

    SearchFilterFunction(text) {
        var newData = this.arrayData //buat array untuk si asset

        newData = newData.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1 //ini apa ya
        })
        this.setState({
            customData: newData,
            text: text
        })
    }

    renderBookTime(item,index){
      let text=null
      switch(index){
        case 0:
          text='08:00'
          break;
        case 1:
          text='09:00'
          break;
        case 2:
          text='10:00'
          break;
        case 3:
          text='11:00'
          break;
        case 4:
          text='12:00'
          break;
        case 5:
          text='13:00'
          break;
        case 6:
          text='14:00'
          break;
        case 7:
          text='15:00'
          break;
        case 8:
          text='16:00'
          break;
        case 9:
          text='17:00'
          break;
      }
      if(item==1){
        return(
          <View style={[styles.timeBox,{backgroundColor:'green'}]}>
            <Text style={{color:'white',textAlign:'center'}}>{text}</Text>
          </View>
        )
      }else{
        return null
      }
    }

    bookingList(item){
      let date=Moment(item.startDate).format('LL');
      let text=null
      let color=null
      let press=null
      if(item.ready==1){
        text='Start'
        color='skyblue'
        press=this.props.changeMenu.bind(this,3)
      }else if (item.ready==2) {
        text='Return'
        color='skyblue'
        press=this.props.changeMenu.bind(this,4)
      }else{
        text='Cancel'
        color='red'
      }
      return(
        <View style={{
            flex: 1, flexDirection: "row", backgroundColor: 'white',
            borderColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            padding: 10,
            marginBottom:20
        }}>
            <View style={{ flex: 1, flexDirection: "column"}}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flexDirection:'column'}}>
                      <Text style={styles.assetTitle}>{item.name}</Text>
                      <Text style={styles.assetTitle}>{item.id}</Text>
                      <Text style={styles.assetSubTitle}>{date} - {item.location}</Text>
                      <Text style={styles.assetSubTitle}>{item.status}</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                      <TouchableOpacity style={{ height: 40, justifyContent: 'center',backgroundColor:color,padding:10,borderRadius:10 }}  >
                          <Text style={{ color: 'white'}} onPress={press}>{text}</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                  data={item.bookTime}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item,index})=>this.renderBookTime(item,index)}
                  horizontal={true}
                  extraData={this.state}
                />
            </View>
        </View>
      )
    }

    render() {
      let usedData=this.state.customData
      usedData.sort(function (a, b) { return (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0); });
        return (
            <Root>
              <View style={styles.containerKeyboard}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.35 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginLeft: 20, marginTop: 20 }}>Booking List</Text>
                        <View searchBar style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 50,
                            borderWidth: 1,
                            marginTop: 40,
                            marginLeft: '5%',
                            marginRight: '5%',
                        }}>
                            <Item>
                                <Icon style={{ marginLeft: 20 }} name="ios-search" />
                                <Input onChangeText={this.SearchFilterFunction.bind(this)}
                                    placeholder="Search" />
                            </Item>
                        </View>
                    </View>
                    <View style={[styles.container, { flex: 0.65 }]}>
                        <FlatList
                            data={usedData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                              this.bookingList(item)
                            }
                            extraData={this.state}
                        >
                        </FlatList>
                    </View>
                </View>
              </View>
            </Root>

        );
    }
}

var styles = StyleSheet.create({
    container: {
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    buttonText: {
      fontSize: 13,
      color: 'black',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 6,
      marginTop: 20,
      justifyContent: 'center',
      width: 60
    },
    containerKeyboard: {
      flex: 1,
      backgroundColor:'#3cc8ac'
    },
    assetTitle: {
      color: '#535c68',
      fontWeight: 'bold',
      fontSize: 15,
      fontFamily: 'Helvetica',
    },
    assetSubTitle: {
      color: '#535c68',
      fontSize: 12,
      fontFamily: 'Helvetica',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    },
    container2: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
      marginLeft:80,
      marginRight:80,
      marginTop:200,
      marginBottom:200
    },
    timeBox: {
      width:60,
      borderRadius:10,
      padding:10,
      marginLeft:5
    },
});
