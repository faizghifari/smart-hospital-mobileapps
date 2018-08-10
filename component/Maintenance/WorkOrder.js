
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
    ScrollView,
} from 'react-native';

import Gradient from 'react-native-linear-gradient';
import moment from 'moment';

var Form = t.form.Form;

// here we are: define your domain model
var person = t.struct({
    WoNumber: t.String,
    WoDate: t.String,
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


let options = {
  fields: {
    WoNumber: {
      editable:false
    },
    assetNo: {
      editable:false
    },
    hospital: {
      editable:false
    },
    location: {
      editable:false
    },
    requestor:{
      editable:false
    },
    phone:{
      editable:false
    },
    WoDate: {
      editable:false,
      label: 'Work Order Date',
    },
    date: {
      label: 'Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    respondDate: {
      label: 'Respond Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    verifiedDate: {
      label: 'Verified Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    startDate: {
      label: 'Start Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    endDate: {
      label: 'End Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    targetDate: {
      label: 'Target Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
    handoverDate: {
      label: 'Handover Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('MMMM Do YYYY'),
      },
    },
  },
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



export default class WorkOrder extends Component {
    componentDidMount(){
      let person={
        WoNumber: '111',
        WoDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
        assetNo: '123',
        hospital: 'Sultanah Aminah',
        location:'Johor Bahru',
        desc:null
      }
      let requestForm={
        requestor:this.props.users.username,
        designation:null,
        phone:this.props.users.email,
        date:new Date(),
        details:null
      }
      let assesmentDetails={
        respondedBy: null,
        respondDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
        rootCause: null,
        verifiedBy: null,
        verifiedDate: null,
        designation: null
      }
      this.setState({
        person:person,
        requestForm:requestForm,
        assesmentDetails:assesmentDetails
      })
    }
    constructor(props) {
        super(props);
        this.state = {
          theState: 0,
          person:{
            WoNumber: null,
            WoDate: null,
            assetNo: null,
            hospital: null,
            location: null,
            description: null,
          },
          requestForm:{
            requestor: null,
            designation: null,
            phone: null,
            date: null,
            details: null,
          },
          assesmentDetails:{
            respondedBy: null,
            respondDate: null,
            rootCause: null,
            verifiedBy: null,
            verifiedDate: null,
            designation: null
          },
          taskEmployee:{
            taskCode: null,
            task: null,
            startDate: null,
            endDate: null,
            employeeCode: null,
            prepHours: null,
            repHours: null,
            verHours: null,
          },
          sparePart:{
            partCode: null,
            description: null,
            quantity: null
          },
          woReceipt:{
            receivedBy: null,
            date: null,
            woCat: null,
            woType: null,
            wgCode: null,
            targetDate: null,
            priority: null,
            estHours: null,
            parts: null,
            cancelledBy: null,
            reason: null,
          },
          completion:{
            actionTaken: null,
            qcPPM: null,
            qcUptime: null,
            dvoName: null,
            assetRequiredButNotAvailable: null,
            handoverDate: null,
            acceptedBy: null,
            designation: null
          },
          costDetails:{
            resourceType: null,
            PoNo: null,
            PoValue: null,
            contractorCode: null,
            contractorName: null,
            misc: null,
            remarks: null
          }
        };

        this.onPress = this.onPress.bind(this);
    }
    onPress(i) {
      // call getValue() to get the values of the form
      // console.log("REFS.FORM");
      // console.log(this._formRef);
      var value = this._formRef.getValue();
      if (value) { // if validation fails, value will be null
        console.log(value); // value here is an instance of Person
        if(i==1){
          this.setState({
            person:value
          })
        }else if(i==2){
          this.setState({
            requestForm:value
          })
        }else if(i==3) {
          this.setState({
            assesmentDetails:value
          })
        }else if(i==4) {
          this.setState({
            taskEmployee:value
          })
        }else if (i==5) {
          this.setState({
            sparePart:value
          })
        }else if (i==6) {
          this.setState({
            woReceipt:value
          })
        }else if (i==7) {
          this.setState({
            completion:value
          })
        }else if (i==8) {
          this.setState({
            costDetails:value
          })
        }
        if(i!=8){
          this.setState({
            theState: i
          });
        }else{
          this.props.changeStepMaintenance(2)
        }
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
                      type={person}
                      options={options}
                      value={this.state.person}
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
                      value={this.state.requestForm}
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
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this,8)} underlayColor='#99d9f4'>
                      <Text style={styles.buttonText}>Submit</Text>
                  </TouchableHighlight>
              </ScrollView>
          )
      }

      return (
          <Gradient
          colors={['#FFFFFF', '#FFEFBA']}
          style={{ flex: 1, flexDirection: 'column' }}>
            <StatusBar
              backgroundColor="#FFFFFF"
              animated={true}
              barStyle='light-content'
            />
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
