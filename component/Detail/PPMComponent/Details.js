import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../../Utilities/Icon.js';
import Part1Details from './Details/Part1Details.js';
import Part2Details from './Details/Part2Details.js';

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
  }
})


export default class Details extends Component {
  constructor(props){
    super(props);
  }
  nextPage(){
    if(this.props.currentPage!=1){
      this.refs['pager'].setPage(this.props.currentPage+1);
      this.props.changeCurrentPage(this.props.currentPage+1,0);
    }else{
      this.props.nextMain();
    }
  }
  prevPage(){
    if(this.props.currentPage!=0){
      this.refs['pager'].setPage(this.props.currentPage-1);
      this.props.changeCurrentPage(this.props.currentPage-1,0);
    }
  }

  render(){
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    let buttonForward=(
      <Button transparent onPress={this.nextPage.bind(this)}>
        <TextN style={{color:'white'}}>Next</TextN>
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
        <View style={{height:60}}>
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
