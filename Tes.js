import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, StatusBar, TextInput } from 'react-native';
import { Container, Content } from "native-base";

import Gradient from 'react-native-linear-gradient';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import ToolTip from 'react-native-tooltip';

export default class Asset extends Component {
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
      assetStatus: "",
      ownership: "no one",
      supplier: "henkel",
      value: 0,
      statusColor: <Text style={styles.used}>Status: Available</Text>
    };
    this.arrayAssets = this.state.customData;

  }



  render() {
    var radio_props = [
      { label: 'PASS', value: 2 },
      { label: 'FAIL', value: 1 },
      { label: 'NA', value: 0 }
    ];
    const data = [39, 14];

    if (this.state.selectState == 0) {
      var main = (
        <View style={{ flexGrow: 1, marginTop: 40 }}>
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            margin: 10
          }}>
            <View style={{ marginLeft: 20 }}>
              <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                marginRight: 20,
                marginTop: 20
              }}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100 }} source={require('./src/images/assets/a.png')} />
                  <Text style={styles.asset}>ASSET DETAIL</Text>
                </View>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Date: 25/7/2018</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>User ID: 1892ID9231</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Title: Broken cable </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Name: {this.state.ownership} </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Supplier: {this.state.supplier} </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Purchase Date: 23/11/2004</Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Warrany Date: </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10 }]}>Manufacturer: </Text>
                <Text style={[styles.assetSubtitle, { marginLeft: 10, marginBottom: 10 }]}>Model: </Text>
              </View>
              <Text style={styles.assetSubtitle}>--------------------------</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100 }} source={require('./src/images/avatar/engA.jpg')} />
                <Text style={styles.asset}>REPORTER</Text>
              </View>
              <Text style={styles.assetSubtitle}>Date: 25/7/2018</Text>
              <Text style={styles.assetSubtitle}>User ID: 1892ID9231</Text>
              <Text style={styles.assetSubtitle}>Title: Heart Doctor </Text>
              <Text style={styles.assetSubtitle}>Name: Puan </Text>
              <Text style={styles.assetSubtitle}>Purchase Date: 23/11/2004</Text>
              <Text style={styles.assetSubtitle}>--------------------------</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <Image style={{ width: 100, height: 100 }} source={require('./src/images/avatar/engA.jpg')} />
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
                <Text style={{ margin: 10, color: 'white' }}>1: </Text>
                <Text style={{ margin: 10, color: 'white' }}>2: </Text>

              </View>
            </View>
          </View>

          <TouchableOpacity onPress={(value) => this.setState({ selectState: 1 })} >
            <Text style={styles.button} >Next</Text>
          </TouchableOpacity>

          <TouchableOpacity /*onPress={ this.props.selectMain.bind(this,1) }*/ >
            <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    else if (this.state.selectState == 1) {
      var main =
        (

          <View style={{ margin: 20, marginTop: 50 }}>
            <Text style={{ color: 'white', fontSize: 25 }}>VISUAL INSPECTION</Text>
            <FlatList
              data={this.state.VIdata}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ToolTip
                    ref='tooltip'
                    actions={[{ text: item.description }]}
                    onHide={this.handleHide}
                    onShow={this.handleShow}
                    underlayColor={'rgba(0, 0, 0, 0)'}
                    style={styles.selectedName}
                  >
                    <Text style={styles.assetSubtitle}>{item.name}</Text>
                  </ToolTip>


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
            <TouchableOpacity onPress={(value) => this.setState({ selectState: 0 })} >
              <Text style={styles.button} >Next</Text>
            </TouchableOpacity>
          </View>

        )

      var main2 =
        (

          <View style={{ margin: 20, marginTop: 50 }}>
            <Text style={{ color: 'white', fontSize: 25 }}>TECHNICAL INSPECTION</Text>
            <FlatList
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
            <TouchableOpacity onPress={(value) => this.setState({ selectState: 0 })} >
              <Text style={styles.button} >Next</Text>
            </TouchableOpacity>
          </View>

        )

      var main3 =
        (
          <View>
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
            <TouchableOpacity onPress={(value) => this.setState({ selectState: 0 })} >
              <Text style={styles.button} >Next</Text>
            </TouchableOpacity>
          </View>
        )
    }

    if (this.state.selectState == 0) {
      return (
        <Container>
          <StatusBar
            animated={true}
            barStyle='light-content'
          />
          <Content>
            <View style={{ backgroundColor: 'cadetblue' }}>
              {main}
            </View>
          </Content>

        </Container>

      );
    }

    else {
      return (
        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ flex: 1, backgroundColor: 'white' }}
            indicator={this._renderTabIndicator()}
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
  }

  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
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

  assetSubtitle: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 15,
    width: 200,
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
    color: 'white'
  },

}); 