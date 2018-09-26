import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput} from 'react-native';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import {CheckBox, ListItem, Body, Text as TextN,Radio} from 'native-base';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
  },
  subPartText:{
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingBottom:15
  },
  deviceText:{
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:15,
    paddingBottom:15
  }
})


export default class Part4 extends Component {
  constructor(props){
    super(props);
  }

  testApparatus(data,index){
    console.log(index);
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={this.props.apparatus[index]} />
        <Body>
          <TextN style={{color:'white'}}>{data.deviceName}</TextN>
        </Body>
      </ListItem>
    )
  }

  render(){
    console.log('that',this.props.scanning, this.props.currentPage);
    console.log('THIS',this.props.dataDevice);
    let electricalSafety=null
    if(this.props.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.props.scanning==0){
      var scanner=(
        <BarcodeScanner
            style={{ flex: 1, height:'50%' }}
            onBarcodeRead={({ data, type }) => {
                // handle your scanned barcodes here!
                // as an example, we show an alert:
                this.props.barcodeHandler(data);
            }}
            onException={exceptionKey => {
                // check instructions on Github for a more detailed overview of these exceptions.
                switch (exceptionKey) {
                    case Exception.NO_PLAY_SERVICES:
                    // tell the user they need to update Google Play Services
                    case Exception.LOW_STORAGE:
                    // tell the user their device doesn't have enough storage to fit the barcode scanning magic
                    case Exception.NOT_OPERATIONAL:
                    // Google's barcode magic is being downloaded, but is not yet operational.
                    default:
                        break;
                }
            }}
            focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
            torchMode={TorchMode.ON /* could be the default OFF */}
            cameraFillMode={
                CameraFillMode.FIT /* could also be FIT */
            }
            barcodeTypes={
                BarcodeType.QR_CODE |
                BarcodeType.CODE_128
            }
        />
      )
    }else{
      var scanner=(
        <View style={{flex:1}}>
        </View>
      )
    }
    if(this.props.apparatus[0]){
      let result=null
      if(this.props.electricalNumber>10){
        result=(
          <Text style={{color:'red',fontSize:15, textAlign:'center'}}>Fail</Text>
        )
      }else{
        result=(
          <Text style={{color:'green',fontSize:15, textAlign:'center'}}>Pass</Text>
        )
      }
      electricalSafety=(
        <View style={{flexDirection:'column'}}>
          <View>
            <Text style={{color:'white',textAlign:'center',padding:10}}>Electrical Safety Test{'\n'}</Text>
            <Text style={{color:'white',textAlign:'center',padding:3}}>In accordance to MS IEC 60601 / 61010 / 62353</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:15}}>Result: </Text>
            </View>
            <View>
              <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(electricalNumber) => this.props.setNewState({electricalNumber})} />
            </View>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:15}}>µA (Limit 10 µA)</Text>
            </View>
          </View>
          <View style={{marginTop:15}}>
            {result}
          </View>
        </View>
      )
    }
    return(
      <View style={styles.subFormContainer}>
        <Text style={styles.subPartText}>Part 4 - Test Apparatus</Text>
        {scanner}
        <Text style={styles.deviceText}>Scan the device barcode</Text>
        <FlatList
          style={{flex:1}}
          data={this.props.dataDevice}
          renderItem={({item,index})=>this.testApparatus(item,index)} //change this
          keyExtractor={(item,key) => key.toString()}
        />
        {electricalSafety}
      </View>
    )
  }
}
