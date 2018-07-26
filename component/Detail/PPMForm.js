import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar} from 'react-native';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import {CheckBox, ListItem, Body, Text as TextN,Button,Radio} from 'native-base';
import {MIcon as Icon} from './../Utilities/Icon.js';

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
  notAllText:{
    marginTop:10,
    padding:10,
    marginBottom:10,
    fontSize:13,
    color:'white',
    textAlign:'center',
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  }
})

export default class PPMForm extends Component {
  constructor(props){
    super(props);
    this.state={
      dataDevice:[
        {
          deviceName:'Electrical Safety Analyzer'
        },{
          deviceName:'Ventilator Tester'
        }
      ],
      precaution:[
        false,false,false,false,false
      ],
      apparatus:[
        false,false
      ],
      electricalSafetyTest:false,
      apparatusDone:false,
      scanning:0,
      currentPage:0,
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
  specialPrecautions(data,index){
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={this.state.precaution[index]} onPress={this.precautionHandler.bind(this,index)} />
        <Body>
          <TextN style={{color:'white'}}>{data.procedure}</TextN>
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
    if(this.state.currentPage!=3){
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
  safetySelect(value){
    if(value){
      this.setState({
        electricalSafetyTest:true
      })
    }else{
      this.setState({
        electricalSafetyTest:false
      })
    }
  }
  render(){
    let precautions=[{
      procedure:'If there is evidence of fluid contamination, submit the device for cleaning and decontamination before inspection it.'
    },{
      procedure:'Wear appropriate Personal Protection Equipment (PPE) during work.'
    },{
      procedure:'Wear grounded electrostatic wristband when handling PCB or electronic components.'
    },{
      procedure:'Refer to the safety procedure for additional precautions and guidance as per manufacturer guidelines.'
    },{
      procedure:'Make sure the test equipment used are duty calibrated.'
    }]
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
      let pass=true
      for (i=0;i<this.state.precaution.length;i++){
        if(!this.state.precaution[i]){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      };
    }else if(this.state.currentPage==3){
      if(this.state.apparatusDone){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }else {
      buttonForward=buttonForwardOK
    }
    if(this.state.apparatusDone){
      var button=(
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )
    }else{
      var button=(
        <Text style={styles.notAllText}>Please scan all the useable device barcode to proceed</Text>
      )
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
      electricalSafety=(
        <View style={{flexDirection:'column'}}>
          <View>
            <Text style={{color:'white',textAlign:'center',padding:10}}>Electrical Safety Test</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{flexDirection:'row'}}>
              <Radio
                color={"white"}
                selectedColor={"white"}
                selected={this.state.electricalSafetyTest}
                onPress={this.safetySelect.bind(this,true)}
              />
              <TextN style={{color:'white', paddingLeft:20}}>Pass</TextN>
            </View>
            <View style={{flexDirection:'row'}}>
              <Radio
                color={"white"}
                selectedColor={"white"}
                selected={!this.state.electricalSafetyTest}
                onPress={this.safetySelect.bind(this,false)}
              />
              <TextN style={{color:'white', paddingLeft:20}}>Fail</TextN>
            </View>
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
          initialPage={3}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
              <View style={styles.subFormContainer}>
                <Text style={styles.subPartText}>Part 1 - Maintenancer Details</Text>
                <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
                <Text style={styles.subAssetDetails}>10000{'\n'}</Text>
                <Text style={styles.assetDetails}>• Name{'\n'}</Text>
                <Text style={styles.subAssetDetails}>Rezky Alamsyah{'\n'}</Text>
                <Text style={styles.assetDetails}>• Email{'\n'}</Text>
                <Text style={styles.subAssetDetails}>rezkyal2@gmail.com{'\n'}</Text>
                <Text style={styles.assetDetails}>• Phone Number{'\n'}</Text>
                <Text style={styles.subAssetDetails}>+6285718246369{'\n'}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.formContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
              <View style={styles.subFormContainer}>
                <Text style={styles.subPartText}>Part 2 - Asset Details</Text>
                <Text style={styles.assetDetails}>• Work Order No{'\n'}</Text>
                <Text style={styles.subAssetDetails}>111{'\n'}</Text>
                <Text style={styles.assetDetails}>• Manufacturer{'\n'}</Text>
                <Text style={styles.subAssetDetails}>Puritan Bennet{'\n'}</Text>
                <Text style={styles.assetDetails}>• Frequency{'\n'}</Text>
                <Text style={styles.subAssetDetails}>12 Monthly{'\n'}</Text>
                <Text style={styles.assetDetails}>• Asset No{'\n'}</Text>
                <Text style={styles.subAssetDetails}>12345{'\n'}</Text>
                <Text style={styles.assetDetails}>• Model{'\n'}</Text>
                <Text style={styles.subAssetDetails}>Puritan Bennett-840{'\n'}</Text>
                <Text style={styles.assetDetails}>• PPM Hours{'\n'}</Text>
                <Text style={styles.subAssetDetails}>1.50{'\n'}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.formContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
              <View style={styles.subFormContainer}>
                <Text style={styles.subPartText}>Part 3 - Special Precaution</Text>
                <FlatList
                  style={{flex:1}}
                  data={precautions}
                  renderItem={({item,index})=>this.specialPrecautions(item,index)} //change this
                  keyExtractor={(item,key) => key.toString()}
                />
              </View>
            </ScrollView>
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
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.state.currentPage+1}/4</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
