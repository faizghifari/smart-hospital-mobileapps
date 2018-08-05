import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput,Dimensions} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN} from 'native-base';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';

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
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
  deviceText:{
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:15,
    paddingBottom:15
  },
  assetDetails:{
    fontSize:15,
    color:'white'
  },
  subAssetDetails:{
    fontSize:13,
    paddingLeft:20,
    color:'white'
  },
})


export default class Part1Main extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0
    }
  }

  barcodeHandler(data){
    console.log(data);
    this.setState({
      scanning:1
    })
    let founded=false;
    if(this.props.assetDetails.AssetNo==data){
      let newAssetDetails=this.props.assetDetails;
      newAssetDetails.founded=true;
      this.setState({
        scanning:2,
      })
      this.props.setNewState({
        assetDetails:newAssetDetails
      })
      window.alert('Founded!');
    }else{
      window.alert('Wrong qrcode!');
      this.setState({
        scanning:0,
      })
    }
  }

  render(){
    console.log(this.props.currentPage);
    if(this.state.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0  && this.props.currentPage==0 && this.props.assetDetails.founded!=true){
      var scanner=(
        <BarcodeScanner
            style={{ flex: 1, height:'100%' }}
            onBarcodeRead={({ data, type }) => {
                // handle your scanned barcodes here!
                // as an example, we show an alert:
                this.barcodeHandler(data);
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
    const {height, width} = Dimensions.get('window');
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 1 - Scan the equipment</Text>
          <View style={{height:height/2}}>
            {scanner}
          </View>
          <Text style={styles.deviceText}>Scan the equipment you need to Maintenance</Text>
          <Text style={styles.assetDetails}>• Manufacturer{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Manufacturer}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Asset No{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.AssetNo}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Model{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Model}{'\n'}</Text>
        </View>
      </ScrollView>
    )
  }
}
