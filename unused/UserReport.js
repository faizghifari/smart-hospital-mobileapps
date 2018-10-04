import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, StatusBar, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Body, CheckBox, ListItem, Item } from "native-base";

import Gradient from 'react-native-linear-gradient';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { PagerTabIndicator, IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import WorkOrder from './WorkOrder'

export default class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VIdata: [
        {
          name: "Chassis",
          value: null,
          description: "verify physical integrity, cleanliness and condition"
        },
        {
          name: "Mount/Fasterners",
          value: null,
          description: "verify physical integrity"
        },
        {
          name: "Fittings/Connectors",
          value: null,
          description: "check all fittings/connectors"
        },
        {
          name: "Patient Circuit",
          value: null,
          description: "verify physical integrity"
        },
        {
          name: "Indicator/Display",
          value: null,
          description: "verify proper operation of controls"
        },
        {
          name: "Tubes/Hoses",
          value: null,
          description: "verify integrity"
        },
        {
          name: "Alarms",
          value: null,
          description: "check all alarms available"
        },
        {
          name: "Audible Signals",
          value: null,
          description: "Confirm appropiate volume and operation of volume controls"
        },
        {
          name: "Internal Hose",
          value: null,
          description: "Verify physical integrity"
        },

      ],
      TIdata: [
        {
          name: "Bellow Performance ",
          value: null,
          description: "Verify integrity"
        },
        {
          name: "Bellow Assembly Leak Test",
          value: null,
          description: "Verify operation"
        },
        {
          name: "Power ON self test",
          value: null,
          description: "Verify operation"
        },
        {
          name: "Pop-off valve performace",
          value: null,
          description: "Verify integrity"
        },
        {
          name: "Low O2 Supply Pressure Alarm test",
          value: null,
          description: "verify operation"
        },
        {
          name: "Low Airway Pressure Alarm test",
          value: null,
          description: "Verify operation"
        },
        {
          name: "Pressure Relief Valve test-verify operation",
          value: null,
          description: "Verify operation"
        },
        {
          name: "Controller Assembly Leak test",
          value: null,
          description: "Verif operation"
        },
        {
          name: "High Airway Pressure Switch test",
          value: null,
          description: "verify operation"
        },

      ],
      selectState: 0,
      friends: [
        { id: "10", name: "REPAIR", color: "red" },
        { id: "20", name: "NOT REPAIR", color: "green" },
        { id: "30", name: "BASIC TREATMENT", color: "yellow" },
        { id: "40", name: "DISPOSAL", color: "black" }],
      assetStatus: "",
      ownership: "no one",
      supplier: "henkel",
      value: 0,
      checkbox: false,
      checkbox1: false,
      checkbox2: false,
      selectedId: null,
      page: 0,
      statusColor: <Text style={styles.used}>Status: Available</Text>
    };
    this.arrayAssets = this.state.customData;

  }

  onCheckBoxPress(cb, ID) {
    if (ID == 0) {
      this.setState({
        checkbox: !cb
      });
    }
    else if (ID == 1) {
      this.setState({
        checkbox1: !cb
      })
    }
  }


  onCheckBoxPress2(value) {
    this.setState({
      selectedId: value
    });

  }

  render() {
    var radio_props = [
      { label: 'PASS', value: 2 },
      { label: 'FAIL', value: 1 },
      { label: 'NA', value: 0 }
    ];
    const data = [39, 14];

    //reportpage
    if (this.state.selectState == 0) {
      var main = (
        <ScrollView style={{ flexGrow: 1, marginTop: 40 }}>
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            margin: 10
          }}>
            <View style={{ marginLeft: 20 }}>
              <View style={{
                backgroundColor: 'white',
                borderColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                marginRight: 20,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,

              }}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100 }} source={require('../../assets/a.png')} />
                  <Text style={[styles.asset, { color: 'black' }]}>ASSET DETAIL</Text>
                </View>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Date: 25/7/2018</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>User ID: 1892ID9231</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Title: Broken cable </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Name: {this.state.ownership} </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Supplier: {this.state.supplier} </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Purchase Date: 23/11/2004</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Warrany Date: </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Manufacturer: </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10, marginBottom: 10 }]}>Model: </Text>
              </View>
              <Text style={styles.assetSubtitle}>--------------------------</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100 }} source={require('../../assets/engA.jpg')} />
                <Text style={styles.asset}>REPORTER</Text>
              </View>
              <Text style={styles.assetSubtitle}>Date: 25/7/2018</Text>
              <Text style={styles.assetSubtitle}>User ID: 1892ID9231</Text>
              <Text style={styles.assetSubtitle}>Title: Heart Doctor </Text>
              <Text style={styles.assetSubtitle}>Name: Puan </Text>
              <Text style={styles.assetSubtitle}>Purchase Date: 23/11/2004</Text>
              <Text style={styles.assetSubtitle}>--------------------------</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100 }} source={require('../../assets/engA.jpg')} />
                <Text style={styles.asset}>REPORTEE</Text>
              </View>
              <Text style={styles.assetSubtitle}>Name: Reyhan Danu Rahman</Text>
              <Text style={styles.assetSubtitle}>User ID: 1892ID9231 </Text>
              <Text style={styles.assetSubtitle}>Date: </Text>
              <Text style={styles.assetSubtitle}>--------------------------</Text>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white',
              }}>FINDING</Text>
              <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                marginRight: 20,
                margin: 10
              }}>
                <Text style={{ margin: 10, color: 'white' }}>1: Broken cable</Text>
                <Text style={{ margin: 10, color: 'white' }}>2: Cracked asset</Text>

              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.props.toCM()} >
            <Text style={styles.buttonText}>GO TO CM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.props.selectMain.bind(this,1)}>
            <Text style={styles.buttonText}>DISMISS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ this.props.selectMain.bind(this,1) } >
            <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }


    //the forms
    else if (this.state.selectState == 1) {

      var main =
        (

          <View style={{ margin: 20, marginTop: 50 }}>
            <Text style={{ color: 'white', fontSize: 25 }}>VISUAL INSPECTION</Text>
            <FlatList
              style={{ marginTop: 50 }}
              data={this.state.VIdata}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.assetSubtitle}>{item.name}</Text>
                  <Text style={styles.assetSubtitleDesc}>{item.desc}</Text>
                  <RadioForm style={{ textAlign: 'right' }} formHorizontal={true}
                    radio_props={radio_props}
                    labelHorizontal={false}
                    initial={0} buttonInnerColor={'white'}
                    buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
                    onPress={(value) => { this.setState({ value: value }) }}
                  />
                </View>
              }
            >
            </FlatList>

          </View>

        )

      //if (this.state.page == 1) {
      var main2 =
        (

          <View style={{ margin: 20, marginTop: 50 }}>
            <Text style={{ color: 'white', fontSize: 25 }}>TECHNICAL INSPECTION</Text>
            <FlatList
              style={{ marginTop: 50 }}
              data={this.state.TIdata}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.assetSubtitle}>{item.name}</Text>
                  <RadioForm style={{ textAlign: 'right' }} formHorizontal={true}
                    radio_props={radio_props}
                    labelHorizontal={false}
                    initial={0} buttonInnerColor={'white'}
                    buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
                    onPress={(value) => { this.setState({ value: value }) }}
                  />
                </View>
              }
            >
            </FlatList>

          </View>

        )
      // }

      //else if (this.state.page == 2) {
      var main3 =
        (
          <KeyboardAvoidingView behavior="padding" style={styles.containerKeyboard}>
            <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
              <View style={{
                padding: 10, marginTop: 50, backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                margin: 10
              }}>
                <TextInput
                  style={{ height: 100, color: 'white' }}
                  placeholder="Type here for additional comments!"
                  multiline={true}
                  onChangeText={(text) => this.setState({ text })}
                />

              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={(value) => this.setState({ selectState: 3, page: 0 })} >
                  <Text style={styles.buttonText}  >NEXT</Text>
                </TouchableOpacity>



              </View>
            </View>
          </KeyboardAvoidingView>
        )

      // }

    }


   /* else if (this.state.selectState == 2) {
      var main = (
        <View style={{ flex: 1, flexGrow: 1, marginTop: 40, marginLeft: 20 }}>
          <View style={{
            backgroundColor: 'white',
            borderColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            marginRight: 20,
            marginTop: 20,
            blurRadius: 1
          }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
              <Image style={{ width: 100, height: 100 }} source={require('./../../../images/assets/a.png')} />
              <Text style={[styles.asset, { color: 'black' }]}>ASSET DETAIL</Text>
            </View>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Date: 25/7/2018</Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>User ID: 1892ID9231</Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Title: Broken cable </Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Name: {this.state.ownership} </Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Supplier: {this.state.supplier} </Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Purchase Date: 23/11/2004</Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Warrany Date: </Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10 }, { color: 'black' }]}>Manufacturer: </Text>
            <Text style={[styles.assetSubtitle, { marginLeft: 10, marginBottom: 10 }]}>Model: </Text>
          </View>
          <Text style={{ color: 'white', fontSize: 25, marginTop: 10 }}>FINDINGS</Text>
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            marginRight: 20,
            margin: 10
          }}>
            <TextInput
              style={{ height: 100, color: 'white' }}
              placeholder="1. Broken"
              multiline={true}
              onChangeText={(text) => this.setState({ text })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={(value) => this.setState({ selectState: 3 })} >
            <Text style={styles.buttonText} >NEXT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(value) => { this.setState({ selectState: 1 }) }} >
            <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
          </TouchableOpacity>
        </View>
      )
    } */

    else if (this.state.selectState == 3) {
      const content = this.state.selectedId == 10
        ? <TouchableOpacity style={styles.button} onPress={(value) => this.setState({ selectState: 9 })} >
          <Text style={[styles.buttonText, { textAlign: 'center' }]} >WORK ORDER</Text>
        </TouchableOpacity>
        : <TouchableOpacity style={styles.button} onPress={(value) => this.setState({ selectState: 0 })} >
          <Text style={[styles.buttonText, { textAlign: 'center' }]} >SUBMIT</Text>
        </TouchableOpacity>;


      var main = (
        <View style={{ flex: 1, flexGrow: 1, marginTop: 40, marginLeft: 20 }}>
          <Text style={{ color: 'white', fontSize: 25, marginTop: 10 }}>PLAN OF ACTION</Text>
          <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }}>IDENTIFICATION BREAKDOWS</Text>
          <ListItem style={{ marginRight: 30, marginTop: 20 }}>
            <CheckBox checked={this.state.checkbox}
              color={"blue"}
              onPress={() => this.onCheckBoxPress(this.state.checkbox, 0)} />
            <Text style={{ color: 'white', marginLeft: 10 }}>CRACKS</Text>
          </ListItem>
          <ListItem style={{ marginRight: 30 }}>
            <CheckBox checked={this.state.checkbox1}
              color={"blue"}
              onPress={() => this.onCheckBoxPress(this.state.checkbox1, 1)} />
            <Body>
              <Text style={{ color: 'white', marginLeft: 10 }}>DEAD</Text>
            </Body>
          </ListItem>

          <View style={{ marginTop: 40 }}>
            <FlatList
              extraData={this.state}
              keyExtractor={(item, index) => item.id}
              data={this.state.friends}

              renderItem={({ item }) => {
                return <ListItem style={{ marginRight: 30, marginTop: 20 }}>
                  <CheckBox
                    color={item.color}
                    checked={this.state.selectedId == item.id}
                    onPress={() => this.onCheckBoxPress2(item.id)}
                  />
                  <Body>
                    <Text style={{ color: 'white', marginLeft: 10 }}>{item.name}</Text>
                  </Body>
                </ListItem>
              }}
            />

          </View>
          {content}

          <TouchableOpacity onPress={(value) => { this.setState({ selectState: 1 }) }} >
            <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
          </TouchableOpacity>

        </View>

      )
    }

    if (this.state.selectState == 1) {
      return (

        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ flex: 1, backgroundColor: 'white' }}
            indicator={this._renderDotIndicator()}
          >
            <View style={{ backgroundColor: 'cadetblue' }}>
              {main}
            </View>
            <View style={{ backgroundColor: 'cornflowerblue' }}>
              {main2}
            </View>
            <View style={{ backgroundColor: 'lightgreen' }}>
              {main3}
            </View>
          </IndicatorViewPager>
        </View>
      );
    }

    //will be changed later
    else if(this.state.selectState == 9) {
      return (
        <Wo />
      )
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor: 'cadetblue' }}>
        <StatusBar
          backgroundColor="#00FFFF"
          animated={true}
          barStyle='light-content'
        />
          <View style={{ flex: 1 }} >
            {main}
          </View>
        </View>
      );
    }
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  _renderTabIndicator() {
    let tabs = [{
      text: 'Visual Inspection',
    }, {
      text: 'Functional Inspection',

    }, {
      text: 'Additional Comments',
    }
    ];
    return <PagerTabIndicator tabs={tabs} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  asset: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginLeft: 20,
  },
  containerKeyboard: {
    flex: 1
  },
  assetSubtitle: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 15,
    width: 200,
  },
  assetSubtitleDesc: {
    color: '#FFF',
    fontSize: 13,
    width: 200,
  },
  button: {
    marginTop: 20,
    marginLeft: '15%',
    marginRight: '15%',
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
  }
});
