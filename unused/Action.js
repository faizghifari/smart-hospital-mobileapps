import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text,TouchableOpacity,TextInput,Dimensions,FlatList} from 'react-native';
import {Button,Text as TextN} from 'native-base';
import {MIcon as Icon} from './../Reuseable/Utilities/Icon.js'

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
    backgroundColor:'#72E2FC',
    flex:1
  }
})


export default class Actions extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      action:''
    }
  }
  submit(){
    Alert.alert(
      'Submission',
      'Submit form?',
      [
        {text: 'Ok', onPress: ()=> {this.nextPage()}},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }
  nextPage(){
    window.alert('Submitted!')
    this.props.saveCurrentMaintenanceData()
    this.props.nextMain();
  }
  prevPage(){
    this.props.saveCurrentMaintenanceData()
    this.props.prevMain()
  }

  add(){
    if(this.state.action!=''){
      let actionList=this.props.actionList
      list.push(
        this.state.action
      )
      this.props.setNewState({list})
    }
  }

  remove(index){
    let list=this.state.list
    list.splice(index,1)
    this.props.setNewState({list})
  }

  render(){
    let list=null
    let {height, width} = Dimensions.get('window');
    let part3=null
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    let nextText="Next"
    let buttonForward=(
      <Button transparent onPress={this.submit.bind(this)}>
        <TextN style={{color:'white'}}>Next</TextN>
        <Icon name="arrow-forward" style={{color: 'white'}}/>
      </Button>
    )
    if(this.props.actionList.length!=0){
      list=(
        <FlatList
          style={{maxHeight:height/2,marginTop:20}}
          data={this.props.actionList}
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
              <Text style={{color:'white',textAlign:'center',paddingTop:10,fontSize:20,fontWeight:'bold'}}>Spare Part Needed</Text>
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
