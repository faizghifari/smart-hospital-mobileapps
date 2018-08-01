
'use strict';

import React, { Component } from 'React'
var t = require('tcomb-form-native');
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    Image,
    FlatList,
    ScrollView
} from 'react-native';

import Gradient from 'react-native-linear-gradient';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    WoNumber: t.String,
    WoDate: t.Date,
    assetNo: t.Number,
    hospital: t.String,
    location: t.String,
    description: t.String,
});

var requestForm = t.struct({
    requestor: t.String,
    designation: t.String,
    phone: t.String,
    date: t.Date,
    details: t.String,
    radicare: t.Boolean
});

var assesmentDetails = t.struct({
    respondedBy: t.String,
    respondDate: t.Date,
    rootCause: t.String,
    verifiedBy: t.String,
    verifiedDate: t.Date,
    designation: t.String
});

var taskEmployee = t.struct({
    taskCode: t.String,
    task: t.String,
    startDate: t.Date,
    endDate: t.Date,
    employeeCode: t.list(t.String),
    prepHours: t.list(t.String),
    repHours: t.list(t.String),
    verHours: t.list(t.String),
});

var sparePart = t.struct({
    partCode: t.list(t.String),
    description: t.list(t.String),
    quantity: t.list(t.String)
});

var woReceipt = t.struct({
    receivedBy: t.String,
    date: t.Date,
    woCat: t.String,
    woType: t.String,
    wgCode: t.String,
    targetDate: t.Date,
    priority: t.String,
    estHours: t.Number,
    parts: t.Boolean,
    cancelledBy: t.String,
    reason: t.String,
});


var completion = t.struct({
    actionTaken: t.list(t.String),
    qcPPM: t.String,
    qcUptime: t.String,
    dvoName: t.String,
    assetRequiredButNotAvailable: t.Boolean,
    handoverDate: t.Date,
    acceptedBy: t.String,
    designation: t.String
});

var costDetails = t.struct({
    resourceType: t.String,
    PoNo: t.Number,
    PoValue: t.Number,
    contractorCode: t.String,
    contractorName: t.String,
    misc: t.String,
    remarks: t.String
});


var options = {
   
}; // optional rendering options (see documentation)

//const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
Form.stylesheet.textbox.normal.fontSize = 14;
Form.stylesheet.textbox.error.fontSize = 14;
Form.stylesheet.controlLabel.normal.fontSize = 14;
Form.stylesheet.controlLabel.error.fontSize = 14;
Form.stylesheet.button.width = 75;
Form.stylesheet.button.backgroundColor = "#ff7979";
Form.stylesheet.button.borderColor = "#ff7979";
Form.stylesheet.buttonText.fontSize = 14;



export default class workOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: 0
        };

        this.onPress = this.onPress.bind(this);
    }
    onPress(i) {
        // call getValue() to get the values of the form
        // console.log("REFS.FORM");
        // console.log(this._formRef);
        var value = this._formRef.getValue();
       if (value) { // if validation fails, value will be null
            // console.log(value); // value here is an instance of Person
            this.setState({
                theState: i
            });
        }
    }

    render() {
        if (this.state.theState == 0) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', textAlign: 'center', marginBottom: 20 }}>WORK ORDER</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={Person}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,1)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 1) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Request From</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={requestForm}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,2)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 2) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>WO Receipt and Classification</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={woReceipt}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,3)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 3) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Assesment Details</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={assesmentDetails}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,4)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 4) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Tasks/Employee</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={taskEmployee}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,5)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 5) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Spare Parts</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={sparePart}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,6)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 6) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Completion</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={completion}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,7)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        else if (this.state.theState == 7) {
            var main = (
                <ScrollView style={styles.container}>
                    {/* display */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 20 }}>Cost Details</Text>
                    <Form
                        ref={(ref) => this._formRef = ref}
                        type={costDetails}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,0)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                </ScrollView>
            )
        }

        return (
            <Gradient 
                colors={['#FFFFFF', '#FFEFBA']}
                style={{ flex: 1, flexDirection: 'column' }}>
                
                    {main}
      
                </Gradient>
            

        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    buttonText: {
        fontSize: 15,
        color: 'black',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
