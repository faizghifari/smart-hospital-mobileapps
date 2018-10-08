import React, {Component} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';

const styles=StyleSheet.create({
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center'
  },
  button:{
    marginTop:20,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  titleFont:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  descFont:{
    color:'white',
    textAlign:'center',
    paddingTop:10
  }
})

export default class MapsManual extends Component{
  constructor(props){
    super(props)
    this.state={
      status:0,
      device:null,
      room:null,
    }
  }

  barcodeHandler(data){
    if(this.state.status==0){
      this.setState({
        status:1,
        room:data,
      })
      window.alert('Founded! Room:'+data)
    }else if (this.state.status==1) {
      this.setState({
        status:2,
        device:data
      })
      window.alert('Founded! Asset:'+data)
      if(this.props.startBooking){
        header='Successful! asset '+data+' in room '+this.state.room+' taken for booking! (PIC: Dr. OZ)'
        window.alert(header)
      }else if (this.props.endBooking) {
        header='Successful! asset '+data+' in room '+this.state.room+' returned (PIC: Dr. OZ)'
        window.alert(header)
      }else{
        header='Successful! asset '+data+' assigned to room '+this.state.room
        window.alert(header)
      }
      this.props.backHandler()
    }
  }

  reset(){
    this.setState({
      device:null,
      room:null,
      status:0
    })
  }

  render(){
    let scanner = null
    let header = null
    let device = null
    if(this.state.status!=2){
      scanner = (
        <BarcodeScanner
            style={{ flex: 1 }}
            onBarcodeRead={({ data, type }) => {
                // handle your scanned barcodes here!
                // as an example, we show an alert:
                this.barcodeHandler(data)
            }}
            onException={exceptionKey => {
                // check instructions on Github for a more detailed overview of these exceptions.
                switch (exceptionKey) {
                    case Exception.NO_PLAY_SERVICES:
                      this.setState({
                        qrExcept:1
                      })
                    case Exception.LOW_STORAGE:
                      this.setState({
                        qrExcept:2
                      })
                    case Exception.NOT_OPERATIONAL:
                      this.setState({
                        qrExcept:3
                      })
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
      );
    }else{
      scanner=(
        <TouchableOpacity onPress={this.reset.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Again</Text>
        </TouchableOpacity>
      )
    }
    if(this.state.status==0){
      header='Scan the room QR/BarCode'
    }else if (this.state.status==1) {
      device=(
        <Text style={styles.descFont}>Room No. {this.state.room}</Text>
      )
      header='Scan the device QR/BarCode'
    }
    return(
      <View style={{flex:1,flexDirection:'column',backgroundColor:'#58ACE3'}}>
        <View style={{flex:0.1}}>
          <Text style={styles.descFont}>{header}</Text>
        </View>
        <View style={{flex:0.7, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.8}}>
            {scanner}
          </View>
        </View>
        <View style={{flex:0.2,justifyContent:'center'}}>
          {device}
        </View>
      </View>
    )
  }
}
