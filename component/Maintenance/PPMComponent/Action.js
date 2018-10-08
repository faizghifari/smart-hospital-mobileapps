import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text,TouchableOpacity,TextInput,Dimensions,FlatList,ScrollView} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../../Reuseable/Utilities/Icon.js'

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
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center'
  },
  container:{
    backgroundColor:'#48dbfb',
    flex:1
  }
})

var {height, width} = Dimensions.get('window');

export default class Actions extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      action:''
    }
  }
  nextPage(){
    this.props.saveCurrentMaintenanceData()
    this.props.nextMain();
  }
  prevPage(){
    this.props.saveCurrentMaintenanceData()
    this.props.prevMain();
  }

  add(){
    if(this.state.action!=''){
      let list=this.state.list
      list.push(
        this.state.action
      )
      this.setState({list})
    }
  }

  renderList(item,index){
    return(
      <View style={{marginLeft:'15%', marginRight:'15%',flexDirection:'row', justifyContent:'space-around',marginBottom:10}}>
        <Text style={{color:'white',fontSize:15}}>{index+1}. {item}</Text>
        <TouchableOpacity onPress={this.remove.bind(this,index)} style={[styles.button,{marginTop:0}]}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    )
  }

  remove(index){
    let list=this.state.list
    list.splice(index,1)
    this.setState({list})
  }

  render(){
    let part3=null
    let list=null
    if(this.state.list.length!=0){
      list=(
        <FlatList
          style={{maxHeight:height/2,marginTop:20}}
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) =>
            this.renderList(item,index)
          }
        />
      )
    }else{
      list=(
        <Text style={{color:'white',textAlign:'center',fontSize:18,marginTop:15,}}>Empty</Text>
      )
    }
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    let nextText="Next"
    if(this.props.cm){
      if(this.props.currentPage==2){
        nextText="Start"
      }
    }else{
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
          <Text style={styles.partText}>Action{'\n'}</Text>
        </View>
        <ViewPager
          initialPage={this.props.currentPage}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            <ScrollView style={styles.container}>
              <Text style={{color:'white',textAlign:'center',paddingTop:10,fontSize:20,fontWeight:'bold'}}>Action Given</Text>
              {list}
              <View style={{flexDirection:'row', justifyContent:'space-around',marginLeft:'5%',marginRight:'5%',marginTop:20}}>
                <View style={{flexDirection:'column',flex:0.45}}>
                  <Text style={{color:'white',fontSize:10}}>Action given</Text>
                  <TextInput underlineColorAndroid='transparent' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(action) =>this.setState({action})} />
                </View>
              </View>
              <TouchableOpacity onPress={this.add.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>1/1</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
