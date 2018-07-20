import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar, FlatList } from 'react-native';
import { Button, Container, Root, Header, Content, Icon, Picker, Form, Item, Input } from "native-base";

import Gradient from 'react-native-linear-gradient';
import Asset from './../Detail/Asset.js';

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


    render() {
        if (this.state.selectState == 0) {
            var main = (

                <View style={{
                    justifyContent: 'center',
                    flexGrow: 1,
                    flexDirection: 'column'
                }}>
                    <Form>
                        <Picker
                            mode="dropdown"
                            placeholder="Select Negeri"
                            style={styles.picker}
                            selectedValue={this.state.selectedNegeri}
                            onValueChange={this.onValueChange.bind(this)}
                            textStyle={{ color: "#fff", fontSize: 20, fontFamily: 'Helvetica' }}
                        >
                            <Picker.Item label="Johor" value="Johor" />
                            <Picker.Item label="Kedah" value="Kedah" />
                            <Picker.Item label="Kelantan" value="Kelantan" />
                            <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
                            <Picker.Item label="Melaka" value="Melaka" />
                            <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
                            <Picker.Item label="Pahang" value="Pahang" />
                            <Picker.Item label="Perak" value="Perak" />
                            <Picker.Item label="Perlis" value="Perlis" />
                            <Picker.Item label="Pulau Pinang" value="Pulau Pinang" />
                            <Picker.Item label="Putra Jaya" value="Putra Jaya" />
                            <Picker.Item label="Selangor" value="Selangor" />
                            <Picker.Item label="Terengganu" value="Terengganu" />
                            <Picker.Item label="Sabah" value="Sabah" />
                            <Picker.Item label="Sarawak" value="Sarawak" />
                            <Picker.Item label="Victoria" value="Victoria" />
                        </Picker>
                        <TouchableOpacity style={styles.button} onPress={this.selectState.bind(this, 1)} >
                            <Text style={styles.buttonText} >Next</Text>
                        </TouchableOpacity>
                    </Form>
                </View>

            );
        }

        //picker item should be in array
        else if (this.state.selectState == 1) {
            if (this.state.selectedNegeri == "Senai") {
                var main = (
                    <View style={{
                        justifyContent: 'center',
                        flexGrow: 1,
                        flexDirection: 'column'
                    }}>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: '#fff' }} />}
                                placeholder="Select Hospital"
                                placeholderStyle={{ color: "#fff", fontSize: 20, fontFamily: 'Helvetica' }}
                                placeholderIconColor="#fff"
                                style={styles.picker}
                                selectedValue={this.state.selectedHosp}
                                onValueChange={this.onHospitalChange.bind(this)}
                                textStyle={{ color: "#fff", fontSize: 20, fontFamily: 'Helvetica' }}
                            >
                                <Picker.Item label="Hospital Senai" value="HSenai" />
                            </Picker>
                            <TouchableOpacity style={styles.button} onPress={this.selectState.bind(this, 2)} >
                                <Text style={styles.buttonText} >Next</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>
                );
            }

            else {
                var main = (
                    <View style={{
                        justifyContent: 'center',
                        flexGrow: 1,
                        flexDirection: 'column'
                    }}>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: '#fff' }} />}
                                placeholder="Select Hospital"
                                placeholderStyle={{ color: "#fff", fontSize: 20, fontFamily: 'Helvetica' }}
                                placeholderIconColor="#fff"
                                style={styles.picker}
                                selectedValue={this.state.selectedHosp}
                                onValueChange={this.onHospitalChange.bind(this)}
                                textStyle={{ color: "#fff", fontSize: 20, fontFamily: 'Helvetica' }}
                            >
                                <Picker.Item label="Hospital Johor" value="Hospital Johor" />
                                <Picker.Item label="Hospital Melaka" value="Hospital Melaka" />
                                <Picker.Item label="Hospital Kuala" value="Hospital Kuala" />
                                <Picker.Item label="Hospital Senai" value="Hospital Senai" />
                                <Picker.Item label="Hospital Palangka" value="Hospital Plangka" />
                            </Picker>
                            <TouchableOpacity style={styles.button} onPress={this.selectState.bind(this, 2)} >
                                <Text style={styles.buttonText} >Next</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>

                );
            }
        }

        //state numbers
        else if (this.state.selectState == 2) {


            var main = (
                <View style={{
                    flexGrow: 1,
                    marginTop: 10,
                    flexDirection: 'column'
                }}>
                    <Header androidStatusBarColor="#F09819" searchBar noShadow rounded style={{ backgroundColor:'rgba(0, 0, 0, 0)'}}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input onChangeText={this.SearchFilterFunction.bind(this) }
                                placeholder="Search" />
                        </Item>
                    </Header>
                      <Text style={styles.title} >{this.state.selectedHosp} </Text>
                      <Text style={styles.subtitle} >{this.state.selectedNegeri} </Text>
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
                                        <Button transparent onPress={this.selectDetail.bind(this, 3, 1, item.name, item.status)}>
                                            <Text style={{ color: '#fff' }}>Detail</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        }
                    >

                    </FlatList>
                    <TouchableOpacity onPress={this.selectState.bind(this, 1)}>
                        <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
                    </TouchableOpacity>

                </View>
            );

        }

        else if (this.state.selectState == 3) {
            var main = (
              <Asset selectedAsset={this.state.selectAsset} selectState={this.selectState.bind(this)} data={this.state.data} />
            );
        }




        return (
            <Root>
                <StatusBar
                    backgroundColor="#F09819"
                    animated={true}
                    barStyle='light-content'
                />
                <Gradient locations={[0.1, 0.75, 1]}
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.5 }}
                    colors={['#F09819', '#edde5d', '#F09819']}
                    style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={styles.container}>
                        {main}
                        {body}
                    </View>
                </Gradient>
            </Root>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column'
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
    }


});
