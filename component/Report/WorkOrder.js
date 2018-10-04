
'use strict';

import React, { Component } from 'React'
import {validate} from 'tcomb-validation'
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

import Part1WO from './WorkOrderComponent/Part1WO.js'
import Part2WO from './WorkOrderComponent/Part2WO.js'
import Part3WO from './WorkOrderComponent/Part3WO.js'
import Part4WO from './WorkOrderComponent/Part4WO.js'
import Part5WO from './WorkOrderComponent/Part5WO.js'
import Part6WO from './WorkOrderComponent/Part6WO.js'
import Part7WO from './WorkOrderComponent/Part7WO.js'
import Part8WO from './WorkOrderComponent/Part8WO.js'


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
    date: t.String,
    details: t.String,
});

var assesmentDetails = t.struct({
    respondedBy: t.String,
    respondDate: t.String,
    rootCause: t.String,
    verifiedBy: t.String,
    verifiedDate: t.String,
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
    date: t.String,
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
    handoverDate: t.String,
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
            editable: false
        },
        assetNo: {
            editable: false
        },
        hospital: {
            editable: false
        },
        location: {
            editable: false
        },
        requestor: {
            editable: false
        },
        phone: {
            editable: false
        },
        respondedBy: {
            editable: false
        },
        receivedBy: {
            editable: false
        },
        woCat: {
            editable: false
        },
        woType: {
            editable: false
        },
        taskCode: {
            editable: false
        },
        wgCode: {
            editable: false
        },
        acceptedBy: {
            editable: false
        },
        resourceType: {
            editable: false
        },
        PoNo: {
            editable: false
        },
        PoValue: {
            editable: false
        },
        contractorCode: {
            editable:false
        },
        contractorName: {
            editable:false
        },
        verifiedBy: {
            editable: false
        },
        WoDate: {
            editable: false,
            label: 'Work Order Date',
        },
        date: {
            label: 'Date',
            editable: false,
        },
        respondDate: {
            label: 'Respond Date',
            editable: false,
        },
        verifiedDate: {
            label: 'Verified Date',
            editable: false,
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
            editable: false
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
    componentDidMount() {
        let person = {
            WoNumber: '1130201',
            WoDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            assetNo: '111010010110',
            hospital: 'Sultanah Aminah',
            location: 'Johor Bahru',
            desc: "Ventilator"
        }
        let requestForm = {
            requestor: "Dr. OZ",
            designation: "Doctor",
            phone: "+60-2321-12312",
            date: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            details: "Can't turn on the asset, i think the power cable broke"
        }
        let woReceipt = {
            receivedBy: 'Ir. Reyhan Danu',
            date: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            woCat: 'Category',
            woType: 'PPM',
            wgCode: '23DFSDF32',
            targetDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            priority: "Medium",
            estHours: "1.5",
            parts: null,
        }
        let assesmentDetails = {
            respondedBy: "Ir. Reyhan Danu",
            respondDate: "August 9th 2018",
            rootCause: null,
            verifiedBy: "Reyhan Danu Rahman",
            verifiedDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            designation: null
        }
        let completion = {
            actionTaken: null,
            qcPPM: null,
            qcUptime: null,
            dvoName: null,
            assetRequiredButNotAvailable: null,
            handoverDate: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a').toString(),
            acceptedBy: "Reyhan Danu Rahman",
            designation: null
        }
        let costDetails = {
            resourceType: "Cardio",
            PoNo: "2070911",
            PoValue: 22,
            contractorCode: "98093HF",
            contractorName: "iLife",
            misc: null,
            remarks: null
        }
        this.setState({
            person: person,
            requestForm: requestForm,
            assesmentDetails: assesmentDetails,
            taskEmployee: taskEmployee,
            woReceipt: woReceipt,
            completion: completion,
            costDetails: costDetails
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            theState: 0,
            person: {
                WoNumber: null,
                WoDate: null,
                assetNo: null,
                hospital: null,
                location: null,
                description: null,
            },
            requestForm: {
                requestor: null,
                designation: null,
                phone: null,
                date: null,
                details: null,
            },
             woReceipt: {
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
            assesmentDetails: {
                respondedBy: null,
                respondDate: null,
                rootCause: null,
                verifiedBy: null,
                verifiedDate: null,
                designation: null
            },
            taskEmployee: {
                taskCode: null,
                task: null,
                startDate: null,
                endDate: null,
                employeeCode: null,
                prepHours: null,
                repHours: null,
                verHours: null,
            },
            sparePart: {
                partCode: null,
                description: null,
                quantity: null
            },
            completion: {
                actionTaken: null,
                qcPPM: null,
                qcUptime: null,
                dvoName: null,
                assetRequiredButNotAvailable: null,
                handoverDate: null,
                acceptedBy: null,
                designation: null
            },
            costDetails: {
                resourceType: null,
                PoNo: null,
                PoValue: null,
                contractorCode: null,
                contractorName: null,
                misc: null,
                remarks: null
            }
        };
        this._formRef
        this.onPress = this.onPress.bind(this);
    }

    changeFormRef(ref){
      this._formRef=ref
    }

    onPress(i) {
        // call getValue() to get the values of the form
        // console.log("REFS.FORM");
        // console.log(this._formRef);
        var value = this._formRef.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            if (i == 1) {
                this.setState({
                    person: value
                })
            } else if (i == 2) {
                this.setState({
                    requestForm: value
                })
            } else if (i == 3) {
                this.setState({
                    woReceipt: value
                })
            } else if (i == 4) {
                this.setState({
                    assesmentDetails: value
                })
            } else if (i == 5) {
                this.setState({
                    taskEmployee: value
                })
            } else if (i == 6) {
                this.setState({
                    sparePart: value
                })
            } else if (i == 7) {
                this.setState({
                    completion: value
                })
            } else if (i == 8) {
                this.setState({
                    costDetails: value
                })
            }
            if (i != 8) {
                this.setState({
                    theState: i
                });
            } else {
                this.props.changeStepMaintenance(2)
            }
        }
    }

    onBack(i){
      if(i!=-1){
        this.setState({
          theState:i
        })
      }
    }

    render() {
        console.log(this.state)
        if (this.state.theState == 0) {
            var main = (
              <Part1WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.person} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 1) {
            var main = (
              <Part2WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.requestForm} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 2) {
            var main = (
              <Part3WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.woReceipt} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 3) {
            var main = (
              <Part4WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.assesmentDetails} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 4) {
            var main = (
              <Part5WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.taskEmployee} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 5) {
            var main = (
              <Part6WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.sparePart} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 6) {
            var main = (
              <Part7WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.completion} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
            )
        }

        else if (this.state.theState == 7) {
            var main = (
              <Part8WO onBack={this.onBack.bind(this)} setNewState={this.setState.bind(this)} _formRef={this._formRef} form={this.state.costDetails} onPress={this.onPress.bind(this)} changeFormRef={this.changeFormRef.bind(this)} options={options} />
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
