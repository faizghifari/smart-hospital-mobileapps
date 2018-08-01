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
  Container, Header, Left, Thumbnail, Right, Item, Input, Form, Button, Badge, Icon, Drawer
} from 'native-base';

import Moment from 'moment';


import Gradient from 'react-native-linear-gradient';
import Chart from './../Charts/EngChart';
import SideBar from './../Users/Engineer/SideBar';
import CalendarPicker from 'react-native-calendar-picker';
import SideMenu from 'react-native-side-menu'
import OpenCamera from './../Utilities/Camera'

import Detail from './../Users/Engineer/CM'


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
    fontSize: 20,
    fontFamily: 'Helvetica',
    marginTop: 20
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

export default class StartMenu extends Component {
  selectPage;
  constructor(props) {
    super(props);
    this.state = {
      customData: [
        {
          name: 'Syringe Pump',
          status: 'Need CM',
          image: require('../../images/assets/b.png')
        },
        {
          name: 'Electropump',
          status: 'Need PPM',
          image: require('../../images/assets/c.png')
        },
        {
          name: 'Xray Data',
          status: 'Need CM',
          image: require('../../images/assets/b.png')
        },
        {
          name: 'Xray Data',
          status: 'Need CM',
          image: require('../../images/assets/a.png')
        },
        {
          name: 'Electro Pump',
          status: 'Need CM',
          image: require('../../images/assets/b.png')
        },
        {
          name: 'Xray Data',
          status: 'Need CM',
          image: require('../../images/assets/c.png')
        },
        {
          name: 'Syringe Pump',
          status: 'Need CM',
          image: require('../../images/assets/d.png')
        },
      ],
      name: 'Ir.Reyhan Danu Rahman',
      selectedStartDate: null,
      theState: 0,
      pickedDate: Date(),
      selectedData: null,
      borndate: '23/11/1994',
      job: 'Engineer',
      address: 'Office of Corporate Affairs, Sultan Ibrahim Chancellery Building,Universiti Teknologi Malaysia, 81310 Johor Bahru,Johor, Malaysia.'

    };
    this.onDateChange = this.onDateChange.bind(this);
    this.selectMain = this.selectMain.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
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
    this.setState({
      theState: i,
      selectedData: item
    })
  }


  render() {
    const menu = <SideBar selectMain={this.selectMain.bind(this)} />;
    const data = [39, 14];

    //Dashboard 
    if (this.state.theState == 0) {
      var main = (
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

          <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Welcome, Engineer </Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{this.state.name}</Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}></Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{Moment(this.state.pickedDate).format('dddd, DD/MM/YYYY')}</Text>
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
                  color: 'black',
                  textAlign: 'center'
                }}>%</Text>
              </View>
              <View>
                <Text style={{ color: 'black' }}>Downtime</Text>
              </View>
            </View>

          </View>
          <Chart data={data} />
        </ScrollView>

      )
    }

    //List of the assets (Notifications)
    else if (this.state.theState == 1) {
      var main = (

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.customData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View style={{
                flex: 1, flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'white',
                borderRadius: 10,
                borderWidth: 1,
                margin: 10
              }}>

                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
                  <View style={{ marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
                    <Text style={styles.assetTitle}>{item.name}</Text>
                    <Text></Text>
                    <Text style={{ color: 'yellow' }}> {item.status}</Text>
                  </View>
                  <View style={{ textAlign: 'right', justifyContent: 'center', marginLeft: 30 }}>
                    <Button transparent onPress={this.selectDetail.bind(this, 3, item)}>
                      <Icon type="FontAwesome" name="exclamation-triangle" style={{ color: 'yellow' }} />
                    </Button>
                  </View>
                </View>
              </View>
            }
          >
          </FlatList>

        </View>


      )
    }

    //calendar
    else if (this.state.theState == 2) {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      pickedDate = startDate;
      var main = (
        <View style={styles.calendar}>
          <CalendarPicker
            selectedDayColor="#fdcb6e"
            textStyle={{ color: 'white' }}
            onDateChange={this.onDateChange}
          />
          <View>
            <Button transparent onPress={this.selectMain.bind(this, 0)} >
              <Text style={{ color: 'white', marginLeft: 20 }} onPress={this.dateChange.bind(this, pickedDate)}> Save  </Text>
            </Button>
          </View>
        </View>

      );
    }

    //to the detail
    else if (this.state.theState == 3) {
      var main =
        (
          //the deail 
          <Detail data={this.state.selectedData} selectMain={this.selectMain} > </Detail>
        )
    }


    //profile
    else if (this.state.theState == 4) {
      var main =
        (
          <View style={{ flex: 1, justifyContent: 'center' }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>

              <Thumbnail large source={require('./../../images/avatar/engA.jpg')} />
              <Text style={{ color: "white", marginTop: 20 }}>{this.state.name}</Text>
              <Text style={{ color: "white", marginTop: 20 }}>{this.state.borndate}</Text>
              <Text style={{ color: "white", marginTop: 20 }}>{this.state.job}</Text>
              <Text style={{ color: "white", marginTop: 20, textAlign: 'center' }}>{this.state.address}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Form>
                <Item>
                  <Input placeholder={this.state.name}
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    onChangeText={(name) => this.setState({ name })}
                    style={{ color: "white" }} />
                </Item>
                <Item>
                  <Input placeholder={this.state.borndate}
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    onChangeText={(borndate) => this.setState({ borndate })}
                  />
                </Item>
                <Item>
                  <Input placeholder={this.state.job}
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    onChangeText={(job) => this.setState({ job })}
                  />
                </Item>
                <Item>
                  <Input placeholder={this.state.address}
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    onChangeText={(address) => this.setState({ address })}
                  />
                </Item>
              </Form>
              <TouchableOpacity style={styles.button} onPress={this.selectMain.bind(this, 0)}>
                <Text style={styles.buttonText}  >SAVE</Text>
              </TouchableOpacity>

            </View>
          </View>
        )
    }

    else if(this.state.theState == 9)
    {
      var main = (
        <View style={{flex: 1, backgroundColor: 'white'}}>
        <OpenCamera/>
        </View>
     
      )
    }


    if (this.state.theState != 3) {
      return (
        <SideMenu menu={menu} >
          <Gradient locations={[0.1, 0.75]}
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.5 }}
            colors={['#48dbfb', '#2193b0']}
            style={{ flex: 1, flexDirection: 'column' }}>

            <Header style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} >
              <Left>
                <Button transparent onPress={this.selectMain.bind(this, 1)} >
                  <Icon ios='ios-mail' android="md-mail" style={{ marginLeft: 10, color: 'white', fontSize: 26 }} />
                </Button>
              </Left>
              <Right>
                <Button transparent onPress={this.selectMain.bind(this, 2)} >
                  <Icon type="Octicons" name="calendar" style={{ color: 'white' }} />
                </Button>
                <Button transparent onPress={this.selectMain.bind(this, 4)} >
                  <Icon ios='ios-contact' android="md-contact" style={{ color: 'white' }} />
                </Button>
              </Right>
            </Header>
            <StatusBar
              animated={true}
              barStyle='light-content'
            />
            <View style={styles.container}>
              {main}
            </View>
          </Gradient>
        </SideMenu>

      )
    }

    
    else {
      return (
        <View style={styles.container}>
          {main}
        </View>
      )
    }



  }
}