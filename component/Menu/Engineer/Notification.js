import React, { Component } from 'React'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import {
  Container, Header, Left, Thumbnail, Right, Item, Input, Form, Button, Badge, Icon, Drawer, Body
} from 'native-base';
import Moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import SideMenu from 'react-native-side-menu'
import Modal from 'react-native-modalbox';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginRight: '15%',
    padding: 10,
    margin: 4,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  assetTitle: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Helvetica'
  },
  iconStyle: {
    color: 'white',
    fontSize: 30,
    padding: 20,
    paddingBottom: 5,
  },
  calendar: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 100,
  },
  iconText: {
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    color: 'white'
  },
  number1: {
    fontSize: 50,
    color: '#1dd1a1',
    textAlign: 'center'
  },
  number2: {
    fontSize: 50,
    color: '#ee5253',
    textAlign: 'center'
  },
  number3: {
    fontSize: 50,
    color: '#0abde3',
    textAlign: 'center'
  },
  number4: {
    fontSize: 50,
    color: 'yellow',
    textAlign: 'center'
  },
  number5: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700'
  }
})

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state={
      calendarItem:null,
      selectedStartDate:null
    }
    this.arrayAssets = this.props.customData;
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  reschedule(date) {
    this.props.setNewState({
      selectedScedhule: date,
    });
  }

  dateChange(date) {
    this.props.setNewState({
      pickedDate: date,
      theState: 0
    });
  }

  selectDetail(i, item) {
    console.log(i,item)
    this.props.setNewState({
      theState: i,
      selectedData: item
    })
  }

  SearchFilterFunction(text) {
    var newData = this.arrayAssets //buat array untuk si asset
    newData = newData.filter(function (item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.props.setNewState({
      customData: newData,
      text: text
    })
  }

  PPMFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.status
      return itemData.indexOf("Need PPM") > -1
    })
    this.props.setNewState({
      customData: newData
    })
  }

  CMFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.status
      return itemData.indexOf("Need CM") > -1
    })
    this.props.setNewState({
      customData: newData
    })
  }

  VerifFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.status
      return itemData.indexOf("Need Verif") > -1
    })
    this.props.setNewState({
      customData: newData
    })
  }

  AllFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset
    this.props.setNewState({
      customData: newData
    })
  }

  dateReschedule(date, i) {
    this.props.setNewState({
      theState: 1
    });
    var d = Moment(date).format('D-MM-YYYY');
    const indx = this.props.customData.findIndex(x => x.id==i);
    let newData=this.props.customData
    newData.customData[indx].date = d;
    this.props.setNewState({
      customData:newData
    })
  }

  openCalendar(item){
    if(this.state.calendarItem!=null){
      if(this.state.calendarItem.id==item.id){
        this.setState({
          calendarItem:null
        })
      }
    }else{
      this.setState({
        calendarItem:item
      })
    }
    console.log(this.state.calendarItem)
  }

  renderNotif(item){
    let status=null
    let press=null
    let reschedule=null
    let startButton=null
    let rescheduleButton=null
    if(item.localstatus>=0 && item.localstatus<=12){
      status=(
        <Text style={{color:'white'}}>Progress: {item.localstatus}/12</Text>
      )
    }else if (item.localstatus==-2) {
      status=(
        <Text style={{color:'green'}}>Not in the time yet</Text>
      )
    }else if (item.localstatus==-1) {
      status=(
        <Text style={{color:'red'}}>Overtime!</Text>
      )
    }else if (item.localstatus==-3) {
      status=(
        <Text style={{color:'yellow'}}>No Action</Text>
      )
    }
    if(item.status=='Need PPM'){
      press=this.props.changeMenu.bind(this,4,item)
    }else if(item.status=='Need CM'){
      press=this.props.changeMenu.bind(this,2,item)
    }else{
      press=this.props.changeMenu.bind(this,10,item)
    }
    if(this.state.calendarItem!=null){
      if(this.state.calendarItem.id==item.id){
        reschedule=(
          <View style={{flex:1}}>
            <CalendarPicker
              onDateChange={this.onDateChange.bind(this)}
            />
          </View>
        )
      }
    }
    if(Moment(item.date).format("MMM Do YY")<=Moment().format("MMM Do YY")){
      startButton=(
        <TouchableOpacity style={styles.button} onPress={press}>
          <Text style={{color:'white'}}>Start</Text>
        </TouchableOpacity>
      )
    }
    if(Moment(item.date).format("MMM Do YY")>=Moment().format("MMM Do YY")){
      if(item.date!=undefined){
        rescheduleButton=(
          <TouchableOpacity style={styles.button} onPress={this.openCalendar.bind(this,item)}>
            <Text style={{color:'white'}}>Reschedule</Text>
          </TouchableOpacity>
        )
      }
    }
    return(
      <View style={{
        flex: 1, flexDirection: "column", backgroundColor: '#72e2fc',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
      }}>
        <View style={{ flex: 0.8}} >
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignContent: 'center' }}>
            <View style={{ flex: 0.3, justifyContent: 'center', alignContent: 'center' }}>
              <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
            </View>
            <View style={{ flex: 0.3, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
              <Text style={styles.assetTitle}>{item.name}</Text>
              <Text style={{ color: 'yellow' }}>{item.status}</Text>
              {item.date != null ?
                <Text style={{ color: 'green' }}>{Moment(item.date).format("MMM Do YY")}</Text> : <View></View>
              }
              {status}
            </View>
            <View style={{ flex: 0.4, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {rescheduleButton}
              {startButton}
            </View>
          </View>
        </View>
        {reschedule}
      </View>
    )
  }

  sort(){
    this.props.setNewState({
      sortUp:!this.props.sortUp
    })
  }

  render() {
    let usedData=JSON.parse(JSON.stringify(this.props.customData))
    if(this.props.sortUp){
      usedData.sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
    }else{
      usedData.sort(function (a, b) { return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0); });
    }
    return(
      <View style={{ flex: 1,backgroundColor:'#48dbfb' }}>
        <View searchBar style={{
          backgroundColor: 'white',
          borderColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          height: 50,
          borderWidth: 1,
          marginTop: 10,
          marginLeft: '5%',
          marginRight: '5%',

        }}>
          <Item>
            <Icon style={{ marginLeft: 20 }} name="ios-search" />
            <Input onChangeText={this.SearchFilterFunction.bind(this)}
              placeholder="Search" />
          </Item>
        </View>
        <View style={{ marginLeft: 20, flexDirection: 'row', paddingTop: 20, paddingBottom: 10 }}>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={{ borderWidth: 1, width: 60, backgroundColor: 'white', borderRadius: 6, borderColor: 'white' }} onPress={this.AllFilterFunction.bind(this)}>
              <Text style={{ margin: 10, textAlign: "center" }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.PPMFilterFunction.bind(this)}>
              <Text style={{ margin: 10, textAlign: "center" }}>PPM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.CMFilterFunction.bind(this)}>
              <Text style={{ margin: 10, textAlign: "center" }}>CM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.VerifFilterFunction.bind(this)}>
              <Text style={{ margin: 10, textAlign: "center" }}>Verif</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.sort.bind(this)}>
              <Text style={{ margin: 10, textAlign: "center" }}>Sort</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={usedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              this.renderNotif(item)
            }
            extraData={[this.state,this.props.sortUp]}
          >
          </FlatList>
        </View>
      </View>
    )
  }
}
