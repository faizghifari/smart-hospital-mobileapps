import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN,Button,Radio,Item} from 'native-base';
import {MIcon as Icon} from './../Utilities/Icon.js';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import Part1 from './PPMDetailForm/Part1.js';
import Part2 from './PPMDetailForm/Part2.js';
import Part3 from './PPMDetailForm/Part3.js';
import Part4 from './PPMDetailForm/Part4.js';
import Part5 from './PPMDetailForm/Part5.js';
import Part6 from './PPMDetailForm/Part6.js';
import Part7 from './PPMDetailForm/Part7.js';
import Part8 from './PPMDetailForm/Part8.js';
import Part9 from './PPMDetailForm/Part9.js';
import Part10 from './PPMDetailForm/Part10.js';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  partText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:20,
    paddingBottom:5
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
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
  },
  button:{
    marginTop:10,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
    marginBottom:30
  },
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center',
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
  inspectionName: {
    color: 'white',
    fontSize: 15,
  },
  inspectionDesc:{
    color: 'white',
    fontSize: 12,
  }
})

var radio_props = [
  { label: 'PASS', value: 2 },
  { label: 'FAIL', value: 1 },
  { label: 'NA', value: 0 }
];

export default class PPMForm extends Component {
  constructor(props){
    super(props);
    this.state={
      maintenancer:{
        ID:'10000',
        Name:'Rezky Alamsyah',
        Email:'rezkyal2@gmail.com',
        Phone:'+6285718246369'
      },
      assetDetails:{
        No:'111',
        Manufacturer:'Puritan Bennet',
        Frequency:'12 Monthly',
        AssetNo:'12345',
        Model:'Puritan Bennet-840',
        Hours:'1.50'
      },
      precaution:[
        false,false,false
      ],
      apparatus:[
        true,true
      ],
      electricalNumber:null,
      VIvalue:[
        null,null,null,null,null,null,null,null,null
      ],
      TIvalue:[
        null,null,null,null,null,null,null,null,null
      ],
      PMTvalue:[
        null,null,null,null
      ],
      quanValue:[
        null,null,null
      ],
      quanPass:[
        false,false,false
      ],
      electricalSafetyTest:false,
      dataDevice:[
        {
          deviceName:'Electrical Safety Analyzer'
        },{
          deviceName:'Ventilator Tester'
        }
      ],
      apparatusDone:true,
      scanning:0,
      currentPage:0,
      quanData:[
        {
          Desc: "Oxygen concentration",
          Bold: true,
          Units: "%",
          Set: null,
          LimitBelow: 0,
          LimitAbove: 103,
        },
        {
          Desc: "Tidal volume (Adult)",
          Bold: true,
          Units: null,
          Set: null,
          LimitBelow: null,
          LimitAbove: null,
        },
        {
          Desc: "Exhaled",
          Bold: false,
          Units: "mL",
          Set: 700,
          LimitBelow: 0,
          LimitAbove: 6000,
        }
      ],
      TIdata:[
        {
          name: "Bellow Performance ",
          description: "Verify integrity"
        },
        {
          name: "Bellow Assembly Leak Test",
          description: "Verify operation"
        },
        {
          name: "Power ON self test",
          description: "Verify operation"
        },
        {
          name: "Pop-off valve performace",
          description: "Verify integrity"
        },
        {
          name: "Low O2 Supply Pressure Alarm test",
          description: "verify operation"
        },
        {
          name: "Low Airway Pressure Alarm test",
          description: "Verify operation"
        },
        {
          name: "Pressure Relief Valve test-verify operation",
          description: "Verify operation"
        },
        {
          name: "Controller Assembly Leak test",
          description: "Verif operation"
        },
        {
          name: "High Airway Pressure Switch test",
          description: "verify operation"
        },
      ],
      VIdata:[
        {
          name: "Chassis",
          description: "Verify physical integrity, cleanliness and condition"
        },
        {
          name: "Mount/Fasterners",
          description: "Verify physical integrity"
        },
        {
          name: "Fittings/Connectors",
          description: "Check all fittings/connectors"
        },
        {
          name: "Patient Circuit",
          description: "Verify physical integrity"
        },
        {
          name: "Indicator/Display",
          description: "Verify proper operation of controls"
        },
        {
          name: "Tubes/Hoses",
          description: "Verify integrity"
        },
        {
          name: "Alarms",
          description: "Check all alarms available"
        },
        {
          name: "Audible Signals",
          description: "Confirm appropiate volume and operation of volume controls"
        },
        {
          name: "Internal Hose",
          description: "Verify physical integrity"
        }
      ]
    }
  }
  testApparatus(data,index){
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={this.state.apparatus[index]} />
        <Body>
          <TextN style={{color:'white'}}>{data.deviceName}</TextN>
        </Body>
      </ListItem>
    )
  }
  precautionHandler(index){
    let newPrecaution=this.state.precaution;
    newPrecaution[index]=(!this.state.precaution[index]);
    this.setState({
      precaution:newPrecaution
    })
  }
  barcodeHandler(data){
    let alert=null
    this.setState({
      scanning:1
    })
    console.log(this.state.dataDevice);
    if(data=='111'){
      window.alert('ESA useable!');
      let newApparatus=this.state.apparatus;
      newApparatus[0]=true
      this.setState({
        apparatus:newApparatus
      })
    }else if(data=='222'){
      window.alert('VT useable!');
      let newApparatus=this.state.apparatus;
      newApparatus[1]=true
      this.setState({
        apparatus:newApparatus
      })
    }else if(data=='333'){
      window.alert('ESA unuseable!');
    }else if(data=='444') {
      window.alert('VT unuseable!');
    }else{
      window.alert('Barcode device wrong!');
    }
    console.log(this.state.apparatus);
    this.setState({
      scanning:0
    })
    let pass=true
    for (i=0;i<this.state.apparatus.length;i++){
      if(!this.state.apparatus[i]){
        pass=false
      }
    }
    console.log(pass);
    if(pass){
      this.setState({
        scanning:2,
        apparatusDone:true
      })
    };
  }
  nextPage(){
    if(this.state.currentPage!=8){
      this.refs['pager'].setPage(this.state.currentPage+1);
      this.setState({
        currentPage:this.state.currentPage+1,
        scanning:2
      })
    }
    if(this.state.currentPage==2){
      this.setState({
        scanning:0
      })
    }
  }
  prevPage(){
    if(this.state.currentPage!=0){
      this.refs['pager'].setPage(this.state.currentPage-1);
      this.setState({
        currentPage:this.state.currentPage-1,
        scanning:2
      })
    }
    if(this.state.currentPage==4){
      this.setState({
        scanning:0
      })
    }
  }

  render(){
    console.log(this.state.quanPass);
    let electricalSafety=null
    let buttonForward=null
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    let buttonForwardOK=(
      <Button transparent onPress={this.nextPage.bind(this)}>
        <TextN style={{color:'white'}}>Next</TextN>
        <Icon name="arrow-forward" style={{color: 'white'}}/>
      </Button>
    )
    let buttonForwardNo=(
      <Button transparent disabled>
        <TextN style={{color:'transparent'}}>Next</TextN>
        <Icon name="arrow-forward" style={{color: 'transparent'}}/>
      </Button>
    )
    if(this.state.currentPage==2 ){
      let pass=false
      if(!this.state.precaution[0]&&this.state.precaution[1]&&this.state.precaution[2]){
        pass=true
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      };
    }else if(this.state.currentPage==3){
      if(this.state.apparatusDone && (this.state.electricalNumber <= 10) && (this.state.electricalNumber!=null) && (this.state.electricalNumber!='')){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.state.currentPage==4) {
      let pass=true
      for(i=0;i<this.state.VIvalue.length;i++){
        if(this.state.VIvalue[i]==null){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else {
        buttonForward=buttonForwardNo
      }
    }else if (this.state.currentPage==5) {
      let pass=true
      for(i=0;i<this.state.TIvalue.length;i++){
        if(this.state.TIvalue[i]==null){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else {
        buttonForward=buttonForwardNo
      }
    }else if (this.state.currentPage==6) {
      let pass=true
      for(i=0;i<this.state.PMTvalue.length;i++){
        if(this.state.PMTvalue[i]==null){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else {
        buttonForward=buttonForwardNo
      }
    }else if (this.state.currentPage==7) {
      let pass=true
      for(i=0;i<this.state.quanValue.length;i++){
        if(this.state.quanValue[i]==null || this.state.quanValue[i]==""){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else {
        buttonForward=buttonForwardNo
      }
    }
    else {
      buttonForward=buttonForwardOK
    }
    if(this.state.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0 && this.state.currentPage==3){
      var scanner=(
        <BarcodeScanner
            style={{ flex: 1, height:'50%' }}
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
    if(this.state.apparatus[0]){
      let result=null
      if(this.state.electricalNumber>10){
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
              <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(electricalNumber) => this.setState({electricalNumber})} />
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
      <View style={{flex:1, backgroundColor:'#48dbfb'}}>
        <StatusBar
          backgroundColor="#48dbfb"
          animated={true}
          barStyle='light-content'
        />
        <View style={{height:60}}>
          <Text style={styles.partText}>Maintenance Process{'\n'}</Text>
        </View>
        <ViewPager
          initialPage={0}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            <Part1 data={this.state.maintenancer}/>
          </View>
          <View style={styles.formContainer}>
            <Part2 data={this.state.assetDetails}/>
          </View>
          <View style={styles.formContainer}>
            <Part3 precaution={this.state.precaution} precautionHandler={this.precautionHandler.bind(this)} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.subFormContainer}>
              <Text style={styles.subPartText}>Part 4 - Test Apparatus</Text>
              {scanner}
              <Text style={styles.deviceText}>Scan the device barcode</Text>
              <FlatList
                style={{flex:1}}
                data={this.state.dataDevice}
                renderItem={({item,index})=>this.testApparatus(item,index)} //change this
                keyExtractor={(item,key) => key.toString()}
              />
              {electricalSafety}
            </View>
          </View>
          <View style={styles.formContainer}>
            <Part5 VIdata={this.state.VIdata} VIvalue={this.state.VIvalue} setNewState={this.setState.bind(this)} />
          </View>
          <View style={styles.formContainer}>
            <Part6 TIdata={this.state.TIdata} TIvalue={this.state.TIvalue} setNewState={this.setState.bind(this)} />
          </View>
          <View style={styles.formContainer}>
            <Part7 PMTvalue={this.state.PMTvalue} setNewState={this.setState.bind(this)} />
          </View>
          <View style={styles.formContainer}>
            <Part8 quanPass={this.state.quanPass} quanValue={this.state.quanValue} quanData={this.state.quanData} setNewState={this.setState.bind(this)} />
          </View>
          <View style={styles.formContainer}>
            <Part9 setNewState={this.setState.bind(this)}/>
          </View>
          <View style={styles.formContainer}>
            <Part10 VIdata={this.state.VIdata} VIvalue={this.state.VIvalue} dataDevice={this.state.dataDevice} assetDetails={this.state.assetDetails} maintenancer={this.state.maintenancer} setNewState={this.setState.bind(this)}/>
          </View>
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.state.currentPage+1}/9</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
