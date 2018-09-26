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
  Container, Header, Left, Right, Item, Form, Button, Icon
} from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import Gradient from 'react-native-linear-gradient';
import SideMenu from 'react-native-side-menu';
import Moment from 'moment';
import EngChart from './../../Reuseable/Chart/EngChart.js';
import Notification from './Notification';
import History from './History';
import SideBarEngineer from './SideBarEngineer'
import DetailPastPPM from './../../Maintenance/DetailPastPPM.js'
import ReportAsset from './../../Report/ReportAsset.js'

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
    color: 'white',
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

export default class StartMenuEngineer extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: 'Ir.Reyhan Danu Rahman',
      selectedStartDate: null,
      theState: 0,
      pickedDate: Moment(new Date()).format('YYYY-MM-DD'),
      selectedData: null,
      borndate: '23/11/1994',
      job: 'Engineer',
      address: 'Office of Corporate Affairs, Sultan Ibrahim Chancellery Building,Universiti Teknologi Malaysia, 81310 Johor Bahru,Johor, Malaysia.'
    }
    this.onDateChange = this.onDateChange.bind(this);
    this.reschedule = this.reschedule.bind(this);
    this.selectMain = this.selectMain.bind(this);
    this.arrayAssets = this.props.customData;
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  reschedule(date) {
    this.setState({
      selectedScedhule: date,
    });
  }

  dateChange(date) {
    this.setState({
      pickedDate: date,
      theState: 0
    });
  }

  selectMain(i) {
    this.setState({
      theState: i
    })
  }

  selectDetail(i, item) {
    console.log(i,item)
    this.setState({
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
    this.setState({
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
    this.setState({
      customData: newData
    })
  }

  CMFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset

    newData = newData.filter(function (item) {
      const itemData = item.status
      return itemData.indexOf("Need CM") > -1
    })
    this.setState({
      customData: newData
    })
  }

  AllFilterFunction() {
    var newData = this.arrayAssets //buat array untuk si asset
    this.setState({
      customData: newData
    })
  }

  dateReschedule(date, i) {
    this.setState({
      theState: 1
    });
    var d = Moment(date).format('D-MM-YYYY');
    const indx = this.state.customData.findIndex(x => x.id==i);
   this.state.customData[indx].date = d;
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
        <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignContent: 'center' }} onPress={this.selectDetail.bind(this, 3, item)} >
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
          </View>
          <View style={{ flex: 1, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
            <Text style={styles.assetTitle}>{item.name}</Text>
            <Text style={{ color: 'yellow' }}>{item.status}</Text>
            {item.date != null ?
              <Text style={{ color: 'green' }}>Finish before: {item.date.toLocaleDateString("en-US")}</Text> : <View></View>
            }
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 20 }}>
            {item.date != null ?
              <TouchableOpacity onPress={this.selectDetail.bind(this, 4, item)}>
                <Text style={{color:'white'}}>Reschedule</Text>
              </TouchableOpacity> : <View></View>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  sortPPM(){
    this.setState({
      sortUp:!this.state.sortUp
    })
  }

  render() {
    const data = [39, 14];
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Welcome, Engineer </Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{this.state.name}</Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}></Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{Moment(this.state.pickedDate).format('YYYY-MM-DD').toString()}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.selectMain.bind(this, 1)}>
                <Text style={styles.number1}>30</Text>
              </TouchableOpacity>
              <Text style={{ color: '#1dd1a1', textAlign: 'center' }}>Need PPM</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.selectMain.bind(this, 1)}>
                <Text style={styles.number2}>27</Text>
              </TouchableOpacity>
              <Text style={{ color: '#e17055', textAlign: 'center' }}>Breakdown</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.selectMain.bind(this, 1)}>
                <Text style={styles.number3}>67</Text>
              </TouchableOpacity>
              <Text style={{ color: '#48dbfb', textAlign: 'center' }}>Pending CM</Text>
            </View>
          </View>
          <View style={{
            flexDirection: "row", justifyContent: 'center',
            marginTop: 40,
            alignItems: 'center'
          }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.number4}>30</Text>
                <Text style={{
                  fontSize: 25,
                  color: 'yellow',
                  textAlign: 'center'
                }}>%</Text>
              </View>
              <View>
                <Text style={{ color: 'yellow' }}>Uptime</Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.number5}>27</Text>
                <Text style={{
                  fontSize: 25,
                  color: 'white',
                  textAlign: 'center'
                }}>%</Text>
              </View>
              <View>
                <Text style={{ color: 'white' }}>Downtime</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent: 'center'}}>
            <EngChart data={data} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
