import React,{Component} from 'react';
import {ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../../Reuseable/Utilities/Icon.js';
import Part1Main from './Maintenance/Part1Main.js';
import Part2Main from './Maintenance/Part2Main.js';
import Part3Main from './Maintenance/Part3Main.js';
import Part4Main from './Maintenance/Part4Main.js';
import Part5Main from './Maintenance/Part5Main.js';
import Part6Main from './Maintenance/Part6Main.js';
import Part7Main from './Maintenance/Part7Main.js';
import Part8Main from './Maintenance/Part8Main.js';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  partText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingBottom:5
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
  },
  assetDetails:{
    fontSize:15,
    color:'white'
  }
})


export default class Main extends Component {
  constructor(props){
    super(props);
  }
  nextPage(){
    this.props.saveCurrentMaintenanceData()
    if(this.props.currentPage!=7){
      this.refs['pager'].setPage(this.props.currentPage+1);
      this.props.changeCurrentPage(this.props.currentPage+1,2);
    }else{
      this.props.nextMain();
    }
  }
  prevPage(){
    this.props.saveCurrentMaintenanceData()
    if(this.props.currentPage!=0){
      this.refs['pager'].setPage(this.props.currentPage-1);
      this.props.changeCurrentPage(this.props.currentPage-1,2);
    }else{
      this.props.prevMain();
    }
  }

  checkApparatus(apparatus){
    let pass=0
    for(let i=0;i<apparatus.length;i++){
      if(apparatus[i].name=='Electrical Safety Analyzer'){
        continue
      }
      if(apparatus[i].task==null){
        if(apparatus[i].value==undefined){
          return 1
        }
        else if(apparatus[i].value < apparatus[i].lowerLimit || apparatus[i].value > apparatus[i].upperLimit){
          return 2
        }
      }else{
        pass=this.checkApparatus(apparatus[i].task)
      }
    }
    return pass
  }

  render(){
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
    let buttonForwardCM=(
      <Button transparent onPress={this.props.goToCM.bind(this)}>
        <TextN style={{color:'white'}}>Go To CM</TextN>
        <Icon name="arrow-forward" style={{color: 'white'}}/>
      </Button>
    )
    if(this.props.currentPage==0){
      if(this.props.assetDetails.founded!=undefined){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.props.currentPage==1) {
      if(this.props.precaution[0]==false && this.props.precaution[1]==true && this.props.precaution[2]==true){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.props.currentPage==2) {
      if(this.props.apparatus[0].founded!=undefined || this.props.apparatus[0].founded!=false){
        if(this.props.apparatus[0].value!=""&&this.props.apparatus[0].value!=undefined){
          if(this.props.apparatus[0].value<this.props.apparatus[0].threshold){
            buttonForward=buttonForwardOK
          }else{
            buttonForward=buttonForwardCM
          }
        }else{
          buttonForward=buttonForwardNo
        }
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.props.currentPage==3) {
      let pass=this.checkApparatus(this.props.apparatus)
      if(pass==0){
        buttonForward=buttonForwardOK
      }else if(pass==1){
        buttonForward=buttonForwardNo
      }else{
        buttonForward=buttonForwardCM
      }
    }else if (this.props.currentPage==4) {
      let pass=true
      for (i=0;i<this.props.VIdata.length;i++){
        if(this.props.VIdata[i].value==undefined){
          pass=false
        }
      }
      if(pass){
        let passCM=true
        for (i=0;i<this.props.VIdata.length;i++){
          if(this.props.VIdata[i].value=='Fail'){
            passCM=false
          }
        }
        if(passCM){
          buttonForward=buttonForwardOK
        }else{
          buttonForward=buttonForwardCM
        }
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.props.currentPage==5) {
      let pass=true
      for (i=0;i<this.props.TIdata.length;i++){
        if(this.props.TIdata[i].value==undefined){
          pass=false
        }
      }
      if(pass){
        let passCM=true
        for (i=0;i<this.props.TIdata.length;i++){
          if(this.props.TIdata[i].value=='Fail'){
            passCM=false
          }
        }
        if(passCM){
          buttonForward=buttonForwardOK
        }else{
          buttonForward=buttonForwardCM
        }
      }else{
        buttonForward=buttonForwardNo
      }
    }else if (this.props.currentPage==6) {
      let pass=true
      for (i=0;i<this.props.PMTdata.length;i++){
        if(this.props.PMTdata[i].value==undefined){
          pass=false
        }
      }
      if(pass){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }else{
      buttonForward=buttonForwardOK
    }
    let part1=null //this method used to prevent duplicate scanner (cause lagging)
    let part3=null
    let part4=null
    if(this.props.currentPage==0){
      part1=(
        <Part1Main currentPage={this.props.currentPage} assetDetails={this.props.assetDetails} setNewState={this.props.setNewState.bind(this)}/>
      )
    }else if(this.props.currentPage==2){
      part3=(
        <Part3Main currentPage={this.props.currentPage} apparatus={this.props.apparatus} setNewState={this.props.setNewState.bind(this)}/>
      )
    }else if (this.props.currentPage==3) {
      part4=(
        <Part4Main saveCurrentMaintenanceData={this.props.saveCurrentMaintenanceData.bind(this)} currentApparatus={this.props.currentApparatus} currentPage={this.props.currentPage} apparatus={this.props.apparatus} setNewState={this.props.setNewState.bind(this)}/>
      )
    }
    return(
      <View style={{flex:1, backgroundColor:'#48dbfb'}}>
        <StatusBar
          backgroundColor="#48dbfb"
          animated={true}
          barStyle='light-content'
        />
        <View style={{height:40}}>
          <Text style={styles.partText}>Maintenance Process{'\n'}</Text>
        </View>
        <ViewPager
          initialPage={this.props.currentPage}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            {part1}
          </View>
          <View style={styles.formContainer}>
            <Part2Main precaution={this.props.precaution} setNewState={this.props.setNewState.bind(this)}/>
          </View>
          <View style={styles.formContainer}>
            {part3}
          </View>
          <View style={styles.formContainer}>
            {part4}
          </View>
          <View style={styles.formContainer}>
            <Part5Main saveCurrentMaintenanceData={this.props.saveCurrentMaintenanceData.bind(this)} VIdata={this.props.VIdata} setNewState={this.props.setNewState.bind(this)}/>
          </View>
          <View style={styles.formContainer}>
            <Part6Main saveCurrentMaintenanceData={this.props.saveCurrentMaintenanceData.bind(this)} TIdata={this.props.TIdata} setNewState={this.props.setNewState.bind(this)}/>
          </View>
          <View style={styles.formContainer}>
            <Part7Main saveCurrentMaintenanceData={this.props.saveCurrentMaintenanceData.bind(this)} sparePart={this.props.sparePart} PMTdata={this.props.PMTdata} setNewState={this.props.setNewState.bind(this)}/>
          </View>
          <View style={styles.formContainer}>
            <Part8Main notes={this.props.notes} setNewState={this.props.setNewState.bind(this)}/>
          </View>
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.props.currentPage+1}/8</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
