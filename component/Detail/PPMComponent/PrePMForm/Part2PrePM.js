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
  }
})


export default class Part2PrePM extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0
    }
  }
  sparePartHandler(data,index){
    let check=false;
    let desc=null;
    if(data.id!=undefined){
      check=true;
      desc=data.name+', id='+data.id
    }else{
      desc=data.name
    }
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={check} />
        <Body>
          <TextN style={{color:'white'}}>{desc}</TextN>
        </Body>
      </ListItem>
    )
  }

  barcodeHandler(data){
    console.log(data);
    this.setState({
      scanning:1
    })
    let founded=false;
    for(i=0;i<this.props.sparePart.length;i++){
      if(data==this.props.sparePart[i].typeId && (this.props.sparePart[i].id==undefined)){
        let newSparePart = this.props.sparePart;
        newSparePart[i].id = 1;
        this.props.setNewState({
          sparePart:newSparePart
        })
        founded=true;
        window.alert('Founded! '+this.props.sparePart[i].name+', id=1');
      }
    }
    if(!founded){
      window.alert('Wrong qrcode!');
    }
    let pass=true
    for (i=0;i<this.props.sparePart.length;i++){
      if(this.props.sparePart[i].id==undefined){
        console.log(i);
        pass=false
      }
    }
    if(pass){
      this.setState({
        scanning:2,
      })
    }else{
      this.setState({
        scanning:0,
      })
    };
  }

  render(){
    let pass=true
    for (i=0;i<this.props.sparePart.length;i++){
      if(this.props.sparePart[i].id==undefined){
        pass=false
      }
    }
    if(this.state.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0 && !pass){
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
          <Text style={styles.subPartText}>Part 2 - Spare Part</Text>
          <View style={{height:height/2}}>
            {scanner}
          </View>
          <Text style={styles.deviceText}>Scan the spare part barcode</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.sparePart}
            renderItem={({item,index})=>this.sparePartHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
