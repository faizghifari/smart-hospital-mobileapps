import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import RNCamera from 'react-native-camera';
import {MIcon as Icon} from './../Utilities/Icon.js';

export default class QRScanner extends Component {
  constructor(props){
    super(props);
    this.state={
      data:'null',
      type:'null'
    }
  }
  onSuccess(e){
    this.setState({
      data: e.data,
      type: e.type
    })
  }
  render() {
    if(Platform.OS==='android'){
      var scanner = (
        <BarcodeScanner
            style={{ flex: 1 }}
            onBarcodeRead={({ data, type }) => {
                // handle your scanned barcodes here!
                // as an example, we show an alert:
                this.setState({
                  data: data,
                  type: type
                })

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
      );
    }else{
      var scanner=(
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarcodeRead={this.onSuccess.bind(this)}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr,RNCamera.Constants.BarCodeType.code128]}
        />
      );
    }
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Scan Device QR</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
            <Text>Data: {this.state.data}, Type: {this.state.type}</Text>
            {scanner}
        </View>
      </View>
    );
  }
}
