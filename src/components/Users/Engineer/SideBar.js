import React, { Component } from 'React'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ImageBackground
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Title, Content, CardItem, Card, Button, Badge, Icon, Drawer, Thumbnail
} from 'native-base';


import Gradient from 'react-native-linear-gradient';


const styles = StyleSheet.create({

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
    iconStyle: {
        color: 'white',
        fontSize: 30,
        padding: 20,
        paddingBottom: 5,
    },
    iconText: {
        fontSize: 17,
        textAlign: 'center',
        padding: 10,
        color: 'white'
    },
    number1: {
        fontSize: 50,
        color: '#1dd1a1',
        textAlign: 'center'
    },
    number2: {
        fontSize: 50,
        color: '#ee5253',
        textAlign: 'center'
    },
    number3: {
        fontSize: 50,
        color: '#0abde3',
        textAlign: 'center'
    },
    number4: {
        fontSize: 50,
        color: 'yellow',
        textAlign: 'center'
    },
    number5: {
        fontSize: 50,
        color: 'black',
        textAlign: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default class StartMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: 0
        }
    }
    selectMain(i) {
        this.props.selectMain(i);
    }

    selectCam(i) {
        this.props.selectCam(i);
    }
     

    selectState(i) {
        this.setState({
            theState: i
        });
    }



    render() {

        const data = [39, 14];
    
            var main = (

                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>

                        <Thumbnail large source={require('../../../images/avatar/engA.jpg')} />
                        <Text style={{ color: "white", marginTop: 20 }}>Ir. Reyhan Danu</Text>
                    </View>
                    <View style={{ flex: 3 }}>

                        <TouchableOpacity style={styles.button} onPress={this.selectMain.bind(this, 1)}>
                            <Text style={styles.buttonText}>Assets List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.selectMain.bind(this, 1)}>
                            <Text style={styles.buttonText}>PPM Assets List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.selectMain.bind(this, 1)}>
                            <Text style={styles.buttonText}>CM Assets List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.selectCam.bind(this,1)}>
                            <Text style={styles.buttonText}>Open Camera</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

            )
        


        return (



            <Gradient locations={[0.1, 0.75]}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.5 }}
                colors={['#48dbfb', '#2193b0']}
                style={{ flex: 1, flexDirection: 'column' }}>
                {main}
            </Gradient>




        )
    }
}

