import React,{Component} from 'react';
import {ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../../Reuseable/Utilities/Icon.js';
import Part1PrePM from './PrePMForm/Part1PrePM.js';
import Part2PrePM from './PrePMForm/Part2PrePM.js';


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


export default class PrePMForm extends Component {
  constructor(props){
    super(props);
  }
  nextPage(){
    this.props.saveCurrentMaintenanceData()
    if(this.props.currentPage!=1){
      this.refs['pager'].setPage(this.props.currentPage+1);
      this.props.changeCurrentPage(this.props.currentPage+1,1);
    }else{
      this.props.nextMain();
    }
  }
  prevPage(){
    this.props.saveCurrentMaintenanceData()
    if(this.props.currentPage!=0){
      this.refs['pager'].setPage(this.props.currentPage-1);
      this.props.changeCurrentPage(this.props.currentPage-1,1);
    }else{
      this.props.prevMain();
    }
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
    if(this.props.currentPage==0){
      let pass=true
      for (i=0;i<this.props.apparatus.length;i++){
        if(this.props.apparatus[i].checked!=true){
          pass=false
        }
      }

      if(pass){
        buttonForward=buttonForwardOK
      }else{
        buttonForward=buttonForwardNo
      }
    }
    else if(this.props.currentPage==1){
      let pass=true
      for (i=0;i<this.props.sparePart.length;i++){
        if(this.props.sparePart[i].id==undefined && this.props.sparePart[i].checked){
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
    let part1=null
    let part2=null
    if(this.props.currentPage==0){
      part1=(
        <Part1PrePM sparePart={this.props.sparePart} apparatus={this.props.apparatus} setNewState={this.props.setNewState.bind(this)}/>
      )
    }else {
      part2=(
        <Part2PrePM sparePart={this.props.sparePart} setNewState={this.props.setNewState.bind(this)}/>
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
          <Text style={styles.partText}>Pre Maintenance Process{'\n'}</Text>
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
            {part2}
          </View>
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.props.currentPage+1}/2</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
