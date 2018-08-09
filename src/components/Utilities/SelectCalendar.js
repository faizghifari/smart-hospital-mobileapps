

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

import Gradient from 'react-native-linear-gradient';
import Calendar from 'react-native-calendar-select';
import Moment from 'moment';

import Back from './../../../Tes'

export default class workOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: 0,
            startDate: new Date(2017, 6, 12),
            endDate: new Date(2017, 6, 13),

        };

        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }


    confirmDate({ startDate, endDate }) {
        this.setState({
            startDate,
            endDate
        });
    }
    openCalendar() {
        this.calendar && this.calendar.open();
    }

    render() {

        let customI18n = {
            'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'text': {
                'start': 'Check in',
                'end': 'Check out',
                'date': 'Date',
                'save': 'Confirm',
                'clear': 'Reset'
            },
            'date': 'DD / MM'  // date format
        };
        // optional property, too.
        let color = {
            subColor: '#f0f0f0'
        };

        if(this.state.theState == 0)
        {
            var main = (
                <View>
    
                    <View >
                        <Button color='white' title="Open Calendar" onPress={this.openCalendar} />
    
                        <Calendar
                            i18n="en"
                            ref={(calendar) => { this.calendar = calendar; }}
                            customI18n={customI18n}
                            color={color}
                            format="YYYYMMDD"
                            minDate="20170510"
                            maxDate="20180312"
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onConfirm={this.confirmDate}
                        />
                    </View>
    
                    <Text>{Moment(this.state.startDate).format('DD MMM YYYY')}</Text>
                    <Text>{Moment(this.state.endDate).format('DD MMM YYYY')}</Text>
                    <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}  >
                        <Text style={{ color: '#95afc0', marginRight: 20 }} onPress={() => this.setState({ theState: 1 })}>Next</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else if(this.state.theState == 1)
        {
            var main = (
                <Back/>
            )

        }
        

       




        return (
            <View>

                {main}


            </View>


        );
    }
}


