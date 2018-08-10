
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


import { Container, Root, Toast, Input, Item, Icon } from "native-base"
import Gradient from 'react-native-linear-gradient';
import Moment from 'moment';
//import Calendar from 'react-native-calendar-select';
import { RNCamera } from 'react-native-camera';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TagSelect } from 'react-native-tag-select';


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
            selectedHour: true,
            _markedDates: {
                '2018-08-20': { textColor: 'red' },
                '2018-08-21': { textColor: 'red' },
                '2018-08-22': { textColor: 'red' },
                '2018-08-31': { textColor: 'red' }
            },
            testDates: ['2018-08-20', '2018-08-21', '2018-08-22'],
            theState: 1,
            theSubState: 0,
            theNext: 0,
            startDate: new Date(_today),
            endDate: new Date(_today),
            markedHours: [],
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
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                    hours: ['10:00', '13:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                    hours: ['14:00', '12:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['16:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Used',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['17:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['12:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['08:00'],
                    dates: ['2018-09-09']
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'X-Ray Scanner',
                    status: 'Repairing',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'USG Monitor',
                    status: 'Registered',
                    hours: ['15:00'],
                    dates: ['2018-08-09']
                },
                {
                    name: 'UV Scanner',
                    status: 'Registered',
                    hours: ['08:00', '09:00'],
                    dates: ['2018-08-09']
                },
            ],
        };
        this.arrayHospital = this.state.customData;
        this.arrayAssets = this.state.assetData;
        this.openCalendar = this.openCalendar.bind(this);
    }

    buttonPressed(data) {
        var re = data;
        this.state.markedHours.push(re);

        //this.state.markedHours.push(re);

        /*var index = this.state.markedHours.indexOf(re);
        if (index > 0) {
            this.state.markedHours.splice(index, 1);
        }
        else {
            this.state.markedHours.push(data);
        }*/


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




    SearchFilterFunction1(text) {
        var newData = this.arrayAssets //buat array untuk si asset

        newData = newData.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            assetData: newData,
            text: text
        })
    }

    DateFilterFunction1(text) {
        var newData = this.arrayAssets //buat array untuk si asset
        var dateString = text.toString();
        newData = newData.filter(function (item) {
            const itemData = item.dates[0]
            const textData = dateString
            return itemData.indexOf(textData) < 0
        })
        this.setState({
            assetData: newData,
            text: text
        })
    }




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

            //here is the hour buttons, better to wrap it

            var hours = (
                <View> <Text> {this.state.markedHours[0]} </Text></View>
            )

            //if (this.state.selectedHour == 0) {
            var button8 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "08.00")}>
                    <Text style={styles.buttonText}>08:00</Text>
                </TouchableOpacity>
            )
            //}

            //else {
            var button8selected = (
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => this.setState({ selectedHour: 0 })} >
                    <Text style={styles.buttonText}>09:00</Text>
                </TouchableOpacity>
            )
            // }




            var button8r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>08:00</Text>
                </View>
            )

            var button9 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "09.00")} >
                    <Text style={styles.buttonText}>09:00</Text>
                </TouchableOpacity>
            )
            var button9r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>09:00</Text>
                </View>
            )

            var button10 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "10.00")} >
                    <Text style={styles.buttonText}>10:00</Text>
                </TouchableOpacity>
            )
            var button10r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>10:00</Text>
                </View>
            )

            var button11 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "11.00")}>
                    <Text style={styles.buttonText}>11:00</Text>
                </TouchableOpacity>
            )
            var button11r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>11:00</Text>
                </View>
            )

            var button12 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "12.00")} >
                    <Text style={styles.buttonText}>12:00</Text>
                </TouchableOpacity>
            )
            var button12r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>12:00</Text>
                </View>
            )

            var button13 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "13.00")} >
                    <Text style={styles.buttonText}>13:00</Text>
                </TouchableOpacity>
            )
            var button13r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>13:00</Text>
                </View>
            )

            var button14 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "14.00")} >
                    <Text style={styles.buttonText}>14:00</Text>
                </TouchableOpacity>
            )
            var button14r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>14:00</Text>
                </View>
            )

            var button15 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "15.00")}>
                    <Text style={styles.buttonText}>15:00</Text>
                </TouchableOpacity>
            )
            var button15r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>15:00</Text>
                </View>
            )

            var button16 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "16.00")} >
                    <Text style={styles.buttonText}>16:00</Text>
                </TouchableOpacity>
            )
            var button16r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>16:00</Text>
                </View>
            )

            var button17 = (
                <TouchableOpacity style={[styles.button]} onPress={this.buttonPressed.bind(this, "17.00")} >
                    <Text style={styles.buttonText}>17:00</Text>
                </TouchableOpacity>
            )
            var button17r = (
                <View style={[styles.button, { backgroundColor: 'red' }]}  >
                    <Text style={styles.buttonText}>17:00</Text>
                </View>
            )









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
                                <Input onChangeText={this.SearchFilterFunction1.bind(this)}
                                    placeholder="Search" />
                            </Item>
                        </View>

                        <DatePicker
                            style={[{ marginLeft: 20 }, { marginTop: 20 }]}
                            date={this.state.startDate}
                            mode="date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            customStyles={{
                                dateText: {
                                    color: 'white',
                                    marginLeft: 20
                                },
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                            }}
                            cancelBtnText="Cancel"
                            minuteInterval={10}
                            onDateChange={this.DateFilterFunction1.bind(this)} //{(datetime) => { this.setState({ startDate: datetime }); }}
                        />



                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginLeft: 20, marginTop: 20 }}>Hospital Johor</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: 20, marginTop: 10 }}>Choose Asset</Text>
                        <Text style={{ fontSize: 15, color: 'white', marginLeft: 20, marginTop: 10, marginRight: 20 }} >Booked hours: {this.state.markedHours + " "} </Text>



                    </View>
                    <View style={[styles.container, { flex: 1.6 }]}>
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
                                    <View style={{ flex: 1 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                            <Text style={[styles.assetTitle, { marginTop: 20 }]}>{item.name}</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                {item.hours.includes("08:00") ? button8r : button8}
                                                {item.hours.includes("09:00") ? button9r : button9}
                                                {item.hours.includes("10:00") ? button10r : button10}
                                                {item.hours.includes("11:00") ? button11r : button11}
                                                {item.hours.includes("12:00") ? button12r : button12}
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                {item.hours.includes("13:00") ? button13r : button13}
                                                {item.hours.includes("14:00") ? button14r : button14}
                                                {item.hours.includes("15:00") ? button15r : button15}
                                                {item.hours.includes("16:00") ? button16r : button16}
                                                {item.hours.includes("17:00") ? button17r : button17}
                                            </View>



                                            <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}  >
                                                <Text style={{ color: '#95afc0' }} onPress={this.selectAsset.bind(this, 2, item.name)}>Next</Text>
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
                                    <Text >Date: {Moment(this.state.startDate).format('DD MMM YYYY HH:mm')} </Text>
                                    <Text >Hours: {this.state.markedHours + " "} </Text>
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
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', }}>
                        <TouchableOpacity

                            style={styles.capture}
                        >
                            <Text style={{ fontSize: 14 }} onPress={() => { this.setState({ theState: 2 }) }} > BACK </Text>
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
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: 'grey',
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
        marginLeft: 80,
        marginRight: 80,
        marginTop: 200,
        marginBottom: 200
    },

});

