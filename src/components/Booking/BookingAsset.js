
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
import { RNCamera } from 'react-native-camera';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'



const _format = 'LLL'
const _today = Moment().format(_format)
const _maxDate = Moment().add(3, 'months').format(_format)

export default class workOrder extends Component {


    initialState = {
        [_today]: { disabled: true }
    }
    constructor(props) {
        super(props);
        this.state = {
            dates: {},
            showToast: false,
            _markedDates: {
                '2018-08-20': { textColor: 'red' },
                '2018-08-21': { textColor: 'red' },
                '2018-08-22': { textColor: 'red' },
                '2018-08-31': { textColor: 'red' }
            },
            testDates: ['2018-08-20', '2018-08-21', '2018-08-22'],
            theState: 2,
            theSubState: 0,
            theNext: 0,
            startDate: new Date(_today),
            endDate: new Date(_today),
            selectedHospital: "",
            selectedAsset: "",
            customData: [
                {
                    name: 'Hospital Johor',
                    status: 'Used',
                    books: [{ start: new Date(2017, 6, 12), end: new Date(2017, 6, 15) }, { start: new Date(2017, 6, 17), end: new Date(2017, 6, 19) }]
                },
                {
                    name: 'Hospital Malaka',
                    status: 'Repairing',
                },
                {
                    name: 'Hospital Sarawak',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Klanten',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Selangor',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Penang',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Kelantan',
                    status: 'Used',
                },
                {
                    name: 'Hospital Kuala Lumpur',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Labuan',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Negeri Sembilan',
                    status: 'Registered',
                },
                {
                    name: 'Hospital Perak',
                    status: 'Registered',
                },

            ],
            assetData: [
                {
                    name: 'Pumper',
                    status: 'Used',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Used',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                },
            ],
        };
        this.arrayHospital = this.state.customData;
        this.arrayAssets = this.state.assetData;
        this.openCalendar = this.openCalendar.bind(this);
    }


    //make it a object
    onDaySelect = (day) => {
        const _selectedDay = Moment(day.dateString).format(_format);

        let selected = true;
        if (this.state._markedDates[_selectedDay]) {
            // Already in marked dates, so reverse current marked state
            selected = !this.state._markedDates[_selectedDay].selected;
        }

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: { selected } } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates });
    }


    SearchFilterFunction(text) {
        var newData = this.arrayHospital //buat array untuk si asset

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

    SearchFilterFunction1(text) {
        var newData = this.arrayAssets //buat array untuk si asset

        newData = newData.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1 //ini apa ya
        })
        this.setState({
            assetData: newData,
            text: text
        })
    }

    /* confirmDate({ startDate, endDate }) {
         this.setState({
             startDate,
             endDate
         });
 
         
     }*/



    openCalendar(startDate, endDate) {
        var s = Moment(startDate).format('YYYY-MM-DD')
        const e = Moment(endDate).format('YYYY-MM-DD')
        console.log("YAYY")
        var date1 = Moment(s);
        var date2 = Moment(e);
        var diff = date2.diff(date1, 'days');
        console.log(s)
        console.log(e)
        console.log(diff)
        var markedDates = { ...this.state._markedDates, ...{ [s]: { textColor: 'blue' } } }
        //var updatedMarkedDates = Object.assign({ [e]: { textColor: 'blue' }} , markedDates);

        for (var i = 0; i < diff; i++) {
            var new_date = Moment(s, "YYYY-MM-DD").add(1, 'day');
            const nd = Moment(new_date).format('YYYY-MM-DD')
            const updatedMarkedDates = Object.assign({ [nd]: { textColor: 'blue' } }, markedDates);
            markedDates = updatedMarkedDates;
            s = new_date;
            console.log(markedDates)
        }
        //const updatedMarkedDates = { ...this.state._markedDates, ...{ [s]: { textColor: 'blue' } }, ...{ [e]: { textColor: 'blue' } } }
        this.setState({ _markedDates: markedDates });
        this.setState({ theNext: 1 });
        Toast.show({
            text: "Asset booked!",
            buttonText: "Okay",
            type: "success"
        })
    }

    selectHospital(i, j) {
        this.setState({
            theState: i,
            selectedHospital: j
        })
    }

    selectAsset(i, j) {
        this.setState({
            theState: i,
            selectedAsset: j
        })
    }


    render() {
        if (this.state.theState == 0) {
            var main = (
                <View style={{ flex: 1 }}>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginLeft: 20, marginTop: 20 }}>Choose Hospital</Text>
                    </View>
                    <View style={[styles.container, { flex: 4 }]}>
                        <FlatList
                            data={this.state.customData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{
                                    flex: 1, flexDirection: "row", backgroundColor: 'white',
                                    borderColor: 'white',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    margin: 10
                                }}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ justifyContent: 'center', marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                            <Text style={styles.assetTitle}>{item.name}</Text>
                                            <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}  >
                                                <Text style={{ color: '#95afc0', marginRight: 20 }} onPress={this.selectHospital.bind(this, 1, item.name)}  >Next</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            }
                        >
                        </FlatList>
                    </View>
                </View>
            )
        }

        //SELECT ASSET
        else if (this.state.theState == 1) {
            var main = (
                <View style={{ flex: 1 }}>


                    <View style={{ flex: 2 }}>
                        <TouchableOpacity onPress={() => this.setState({ theState: 0 })}>
                            <Icon type="FontAwesome" name="chevron-left" style={{ color: 'white', marginTop: 40, marginLeft: 20, fontSize: 20 }} />
                        </TouchableOpacity>
                        <View searchBar style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            height: 50,
                            borderWidth: 1,
                            marginTop: 20,
                            marginLeft: '5%',
                            marginRight: '5%',

                        }}>
                            <Item>
                                <Icon style={{ marginLeft: 20 }} name="ios-search" />
                                <Input onChangeText={this.SearchFilterFunction1.bind(this)}
                                    placeholder="Search" />
                            </Item>
                        </View>


                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginLeft: 20, marginTop: 20 }}>{this.state.selectedHospital}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: 20, marginTop: 10 }}>Choose Asset</Text>

                    </View>
                    <View style={[styles.container, { flex: 4 }]}>
                        <FlatList
                            data={this.state.assetData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{
                                    flex: 1, flexDirection: "row", backgroundColor: 'white',
                                    borderColor: 'white',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    margin: 10
                                }}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ justifyContent: 'center', marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                            <Text style={styles.assetTitle}>{item.name}</Text>
                                            <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}  >
                                                <Text style={{ color: '#95afc0', marginRight: 20 }} onPress={this.selectAsset.bind(this, 2, item.name)}>Next</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            }
                        >
                        </FlatList>
                    </View>

                </View>
            )
        }

        else if (this.state.theState == 2) {

            // optional property, too.


            if (this.state.theSubState == 0) {

                var submain = (
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ theSubState: 1 })} >
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            borderRadius: 4,
                            borderWidth: 1,
                            margin: 10,
                            width: "90%",
                            height: 260,
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}>
                            <View style={{ margin: 10 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.assetTitle, { fontSize: 19 }]}>{this.state.selectedAsset}</Text>
                                    <Text style={[styles.assetTitle]}>ID:231230193</Text>
                                </View>

                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>BOOKING DATE</Text>
                                    <Text >From: {Moment(this.state.startDate).format('DD MMM YYYY HH:mm')} </Text>
                                    <Text >To:      {Moment(this.state.endDate).format('DD MMM YYYY HH:mm')} </Text>
                                </View>

                                <View style={{ marginTop: 30, marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>BOOKING BY</Text>
                                    <Text >Name: Reyhan Danu Rahman</Text>
                                    <Text >ID: 02930923 </Text>
                                    <Text >Dept: Neuorology </Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }

            else {
                var submain = (
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ theSubState: 0 })} >
                        <View style={{
                            margin: 10,
                            width: "90%",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}>
                            <Calendar
                                // we use moment.js to give the minimum and maximum dates.
                                minDate={_today}
                                maxDate={_maxDate}
                                // hideArrows={true}
                                markedDates={this.state._markedDates}
                                markingType={'period'}
                                style={{ width: "100%" }}

                                theme={{
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#b6c1cd',
                                    textDayFontFamily: 'fontAwesome',
                                    textMonthFontFamily: 'fontAwesome',
                                    textDayHeaderFontFamily: 'fontAwesome',
                                }}

                            //markedDates={this.state._markedDates}
                            />
                        </View>
                    </TouchableOpacity>
                )
            }

            if (this.state.theNext == 0) {
                var button = (
                    <TouchableOpacity style={[styles.button, { width: 200, marginBottom: 80 }]} onPress={this.openCalendar.bind(this, this.state.startDate, this.state.endDate)} >
                        <Text style={styles.buttonText}>SAVE BOOKING</Text>
                    </TouchableOpacity>
                )
            }

            else if (this.state.theNext == 1) {
                var button = (
                    <TouchableOpacity style={[styles.button, { width: 200, marginBottom: 80 }]} onPress={() => { this.setState({ theState: 3 }) }}  >
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                )
            }
            //CALENDAR
            var main = (

                <View style={{ flex: 1 }}>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.setState({ theState: 1 })}>
                            <Icon type="FontAwesome" name="chevron-left" style={{ color: 'white', marginTop: 40, marginLeft: 20, fontSize: 20, marginBottom: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center' }}>CONFIRM BOOKING</Text>
                    </View>


                    <View style={{ flex: 6, justifyContent: 'center', marginTop: 40 }}>

                        {submain}


                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Text style={{ textAlign: 'right', fontSize: 10 }}> *Click anywhere in the box for calendar </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <Text>From: </Text>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.startDate}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    minuteInterval={10}
                                    onDateChange={(datetime) => { this.setState({ startDate: datetime }); }}
                                />
                            </View>


                            <View style={{ marginTop: 20 }}>
                                <Text>To: </Text>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.endDate}
                                    mode="datetime"
                                    placeholder="select date"
                                    format="YYYY-MM-DD HH:mm"
                                    minDate={Date(_today)}
                                    maxDate={_maxDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ endDate: date }) }}
                                />
                            </View>
                        </View>


                        <View style={{ alignItems: 'center' }}>
                            {button}
                        </View>

                    </View>
                </View>
            )
            console.log(this.state._markedDates);
        }

        else if (this.state.theState == 3) {
            var main = (
                <View style={styles.container2}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.code128]}
                        onBarCodeRead={(e) => {
                            window.alert(e.data)
                        }}
                    />
                     <View style={{backgroundColor:'white', justifyContent: 'center',}}>
                    <TouchableOpacity
                        
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}} onPress={() => { this.setState({ theState: 2 }) }} > BACK </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }


        return (
            <Root>
                <Gradient
                    colors={['#8AC7C3', '#8AC7C3']}
                    style={{ flex: 1, flexDirection: 'column' }}>
                    <KeyboardAvoidingView behavior="padding" style={styles.containerKeyboard}>
                        {main}
                    </KeyboardAvoidingView>

                </Gradient>
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
        flex: 1
    },
    assetTitle: {
        color: '#535c68',
        fontWeight: 'bold',
        fontSize: 15,
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

});

