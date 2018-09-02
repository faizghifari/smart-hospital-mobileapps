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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    marginLeft: '15%',
    marginRight: '15%',
    padding: 10,
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

export default class History extends Component {
  constructor(props) {
    super(props);
    this.arrayAssets = this.props.customData;
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
      historyData: newData,
      text: text
    })
  }

  PPMFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.past
      return itemData.indexOf("PPM") > -1
    })
    this.props.setNewState({
      historyData: newData
    })
  }

  CMFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.past
      return itemData.indexOf("CM") > -1
    })
    this.props.setNewState({
      historyData: newData
    })
  }

  AllFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset
    this.props.setNewState({
      historyData: newData
    })
  }


  renderHistory(item){
    let status=null
    return(
      <View style={{
        flex: 1, flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
      }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignContent: 'center' }} onPress={this.props.changeMenu.bind(this, 5, item)} >
          <View style={{ flex: 0.3, justifyContent: 'center', alignContent: 'center' }}>
            <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
          </View>
          <View style={{ flex: 0.5, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
            <Text style={styles.assetTitle}>{item.name}</Text>
            <Text style={{color:'green'}}>{item.past}</Text>
            <Text style={{ color: 'yellow' }}>{item.status}</Text>
            <Text style={{ color: 'green' }}>Finished at: {item.date.toLocaleDateString()}</Text>
          </View>
          <View style={{flex:0.2,flexDirection:'column',justifyContent:'center'}}>
            <TouchableOpacity onPress={this.props.changeMenu.bind(this, 5, item)}>
              <Text style={{color:'white'}}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  sortPPM(){
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
      <View style={{ flex: 1 }}>
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
          <TouchableOpacity style={{ borderWidth: 1, width: 60, backgroundColor: 'white', borderRadius: 6, borderColor: 'white' }} onPress={this.AllFilterFunction.bind(this)}>
            <Text style={{ margin: 10, textAlign: "center" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.PPMFilterFunction.bind(this)}>
            <Text style={{ margin: 10, textAlign: "center" }}>PPM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.CMFilterFunction.bind(this)}>
            <Text style={{ margin: 10, textAlign: "center" }}>CM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10, width: 60, backgroundColor: 'white', borderWidth: 1, borderRadius: 6, borderColor: 'white' }} onPress={this.sortPPM.bind(this)}>
            <Text style={{ margin: 10, textAlign: "center" }}>CM</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.customData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              this.renderHistory(item)
            }
          >
          </FlatList>
        </View>
      </View>
    )
  }
}
