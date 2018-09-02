
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

var Form = t.form.Form;

var sparePart = t.struct({
    partCode: t.list(t.String),
    description: t.list(t.String),
    quantity: t.list(t.String)
});

//const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
Form.stylesheet.textbox.normal.fontSize = 14;
Form.stylesheet.textbox.error.fontSize = 14;
Form.stylesheet.controlLabel.normal.fontSize = 14;
Form.stylesheet.controlLabel.error.fontSize = 14;
Form.stylesheet.button.width = 75;
Form.stylesheet.button.backgroundColor = "#ff7979";
Form.stylesheet.button.borderColor = "#ff7979";
Form.stylesheet.buttonText.fontSize = 14;



export default class Part6WO extends Component {
    constructor(props) {
        super(props);
    }

    onChange(value){
      this.props.setNewState({
        sparePart:value
      })
    }

    render() {
      return(
        <ScrollView style={styles.container}>
            {/* display */}
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'center', marginBottom: 20 }}>Spare Parts Needed</Text>
            <Form
                ref={(ref) => this.props.changeFormRef(ref)}
                type={sparePart}
                options={this.props.options}
                value={this.props.form}
                onChange={this.onChange.bind(this)}
            />
            <TouchableHighlight style={styles.button} onPress={this.props.onPress.bind(this, 6)} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor:'#636e70' }]}  onPress={this.props.onBack.bind(this,4)} underlayColor='#99d9f4'>
              <Text style={[styles.buttonText, {color:'white'}]}>Back</Text>
            </TouchableHighlight>
        </ScrollView>
      )
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
