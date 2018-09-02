import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar, FlatList } from 'react-native';
import { Button, Container, Root, Header, Content, Picker, Form, Item, Input } from "native-base";

import Gradient from 'react-native-linear-gradient';
import Asset from './../Detail/Asset.js';
import {MIcon as Icon} from './../Utilities/Icon.js';

export default class AssetsManagement extends Component {
    selectPage;
    constructor(props) {
        super(props);
        this.state = {
            customData: [
                {
                    name: 'Syringe Pump',
                    status: 'Used',
                },
                {
                    name: 'Electropump',
                    status: 'Repairing',
                },
                {
                    name: 'Xray Data',
                    status: 'Registered',
                },
                {
                    name: 'Xray Data',
                    status: 'Registered',
                },
                {
                    name: 'Xray Data',
                    status: 'Registered',
                },
                {
                    name: 'Xray Data',
                    status: 'Registered',
                },
                {
                    name: 'Syringe Pump',
                    status: 'Used',
                },



            ],
            data:{
              number:"1892ID9231",
              purchaseDate:"23/11/2004",
              purchasePlace:"Johor",
              locationCode:"13837DAD012",
              cost:"RM140"
            },
            selectState: 0,
            selectedNegeri: "",
            selectedHosp: "",
            selectedAsset: "jhk",
            selectDetail: "",
            assetStatus: "",
            statusColor: <Text style={styles.used}>Status: Available</Text>
        };
            this.arrayAssets = this.state.customData;

    }

    SearchFilterFunction(text){
          var newData = this.arrayAssets //buat array untuk si asset

          newData=newData.filter(function(item){
          const itemData = item.name.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1 //ini apa ya
        })


          this.setState({
              customData: newData,
              text: text
          })

        }



    selectColor(status) {
        if (status == 'Used') {
            this.setState({
                statusColor: <Text style={styles.repairing}>Status: {status}</Text>,
                selectState: 1
            })
        }
        else {
            this.setState({
                statusColor: <Text style={styles.repairing}>Status: {status}</Text>,
                selectState: 1
            })
        }

    }

    selectDetail(i, j, name, status) {
        this.setState({
            selectState: i,
            selectedAsset: name,
            assetStatus: status

        })
    }

    selectPage(i) {
        this.props.selectPage(i);
    }

    selectState(i) {
        this.setState({
            selectState: i
        })
    }

    onValueChange(value) {
        this.setState({
            selectedNegeri: value
        });
    }

    onHospitalChange(value) {
        this.setState({
            selectedHosp: value
        });
    }

    onAssetChange(value) {
        this.setState({
            selectedAsset: value
        });
    }

    chooseDetail(name){
      this.setState({
        selectState:1,
        selectedHosp:name
      })
    }

    listItem(item){
      return(
        <TouchableOpacity style={styles.selectButton} onPress={this.chooseDetail.bind(this,[item.nama])}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText1}>{item.nama}</Text>
            <Text style={styles.buttonText2}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
        if (this.state.selectState == 0) {
          var main = (
            <View>
              <Text style={{textAlign:'center',color:'white', margin:10}}>Choose Hospital</Text>
            </View>
          );
          var body = (
            <View style={{flex:0.9,flexDirection:'column'}}>
              <FlatList
                style={{flex:1}}
                data={data}
                renderItem={({item})=>this.listItem(item)}
                keyExtractor={(item,key) => key.toString()}
              />
            </View>
          )
        }

        //picker item should be in array
        else if (this.state.selectState == 1) {
          var main = (
              <View style={{
                  flexGrow: 1,
                  marginTop: 10,
                  flexDirection: 'column'
              }}>
                  <Header androidStatusBarColor="#F09819" searchBar noShadow rounded style={{ backgroundColor:'rgba(0, 0, 0, 0)'}}>
                    <TouchableOpacity onPress={this.selectState.bind(this, 0)}>
                        <Icon name="arrow-back" style={{color: 'white',padding:10}}/>
                    </TouchableOpacity>
                    <Item>
                        <Icon name="ios-search" />
                        <Input onChangeText={this.SearchFilterFunction.bind(this) }
                            placeholder="Search" />
                    </Item>
                  </Header>
                    <Text style={styles.title} >{this.state.selectedHosp} </Text>
                  <View>
                      <View style={{flexDirection: "row",justifyContent:"space-around" }}>
                          <View style={{ flex: 0.3, flexDirection:'column',justifyContent:'center' }}>
                              <Text style={styles.number1}> 30 </Text>
                              <Text style={{ color: '#1dd1a1', textAlign: 'center' }}>Used</Text>
                          </View>
                          <View style={{ flex: 0.3, flexDirection:'column',justifyContent:'center' }}>
                              <Text style={styles.number2}> 27 </Text>
                              <Text style={{ color: '#e17055', textAlign: 'center' }}>Repairing</Text>
                          </View>
                          <View style={{ flex: 0.3, flexDirection:'column',justifyContent:'center' }}>
                              <Text style={styles.number3}> 67 </Text>
                              <Text style={{ color: '#48dbfb', textAlign: 'center' }}>Registered</Text>
                          </View>
                      </View>
                  </View>
              </View>
          );


          var body = (
              <View style={{ flexGrow: 4, flexDirection:'column' }}>
                  <FlatList
                      style={{flex:3}}
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
                                  <Image style={{flex:0.2, width: 60, height: 60, margin: 10 }} source={{uri:'https://raw.githubusercontent.com/faizghifari/smart-hospital-mobileapps/app-rey/src/images/medical.png?token=AYaoAZDGA7cVKZJVUJk3gOz95TEpCU9nks5bWBVPwA%3D%3D'}} />
                                  <View style={{flex:0.6, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
                                      <Text style={styles.assetTitle}>{item.name}</Text>
                                      <Text></Text>


                                      <Text> {this.state.statusColor}</Text>

                                  </View>
                                  <View style={{flex:0.2, justifyContent: 'center'}}>
                                      <Button transparent onPress={this.selectDetail.bind(this, 2, 1, item.name, item.status)}>
                                          <Text style={{ color: '#fff' }}>Detail</Text>
                                      </Button>
                                  </View>
                              </View>
                          </View>
                      }
                  >

                  </FlatList>
              </View>
          );

        }

        //state numbers
        else if (this.state.selectState == 2) {
          return(
            <View style={{flex:1}}>
              <Asset selectedAsset={this.state.selectAsset} selectState={this.selectState.bind(this,1)} data={this.state.data} />
            </View>
          )
        }
        return (
            <Root>
                <StatusBar
                    backgroundColor="#F09819"
                    animated={true}
                    barStyle='light-content'
                />
                  <View style={styles.container}>
                      {main}
                      {body}
                  </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:'#FBB248'
    },

    number1: {
        textAlign:'center',
        fontSize: 30,
        color: '#1dd1a1'
    },
    number2: {
        textAlign:'center',
        fontSize: 30,
        color: '#ee5253'
    },
    number3: {
        textAlign:'center',
        fontSize: 30,
        color: '#0abde3'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Helvetica',
        marginLeft: 20,
        marginTop: 20
    },
    subtitle: {
        color: '#FFF',
        fontSize: 15,
        marginLeft: 20
    },
    assetTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Helvetica'
    },
    assetSubtitle: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 15
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
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '700'
    },
    used: {
        color: '#55efc4',
        marginTop: 5,
        fontSize: 15,
        marginLeft: 20
    },
    repairing: {
        color: '#d63031',
        marginTop: 5,
        fontSize: 15,
        marginLeft: 20
    },picker:{
        color:'white',
        marginTop: 20,
        marginLeft: '15%',
        marginRight: '15%',
    },
    selectButton:{
      marginLeft:'3%',
      marginRight:'3%',
      backgroundColor:'rgba(0, 0, 0, 0)',
      borderColor:'white',
      borderRadius:5,
      borderWidth:1,
      marginBottom: 15
    },
    textContainer:{
      padding: 10
    },
    buttonText1:{
      fontSize:20,
      color:'white',
      fontWeight:'bold'
    },
    buttonText2:{
      fontSize:15,
      color:'white',
    },

});
