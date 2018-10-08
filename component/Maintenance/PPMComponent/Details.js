import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../../Reuseable/Utilities/Icon.js';
import Part1Details from './Details/Part1Details.js';
import Part2Details from './Details/Part2Details.js';
import Part3Details from './Details/Part3Details.js';

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


export default class Details extends Component {
  constructor(props){
    super(props);
  }
  nextPage(){
    let limit=1
    if(this.props.cm){
      limit=2
    }
    if(this.props.currentPage!=limit){
      this.props.saveCurrentMaintenanceData()
      this.refs['pager'].setPage(this.props.currentPage+1);
      this.props.changeCurrentPage(this.props.currentPage+1,0);
    }else{
      this.props.nextMain();
    }
  }
  prevPage(){
    if(this.props.currentPage!=0){
      this.props.saveCurrentMaintenanceData()
      this.refs['pager'].setPage(this.props.currentPage-1);
      this.props.changeCurrentPage(this.props.currentPage-1,0);
    }
  }

  render(){
    let part3=null
    let totalPage=null
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    let nextText="Next"
    if(this.props.cm){
      part3=(
        <View style={styles.formContainer}>
          <Part3Details sparePartNeededList={this.props.sparePartNeededList} data={this.props.cmDetails}/>
        </View>
      )
      totalPage=3
      if(this.props.currentPage==2){
        nextText="Start"
      }
    }else{
      totalPage=2
      if(this.props.currentPage==1){
        nextText="Start"
      }
    }
    let buttonForward=(
      <Button transparent onPress={this.nextPage.bind(this)}>
        <TextN style={{color:'white'}}>{nextText}</TextN>
        <Icon name="arrow-forward" style={{color: 'white'}}/>
      </Button>
    )
    return(
      <View style={{flex:1, backgroundColor:'#48dbfb'}}>
        <StatusBar
          backgroundColor="#48dbfb"
          animated={true}
          barStyle='light-content'
        />
        <View style={{height:40}}>
          <Text style={styles.partText}>Details{'\n'}</Text>
        </View>
        <ViewPager
          initialPage={this.props.currentPage}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            <Part1Details data={this.props.maintenancer}/>
          </View>
          <View style={styles.formContainer}>
            <Part2Details data={this.props.assetDetails}/>
          </View>
          {part3}
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.props.currentPage+1}/{totalPage}</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
