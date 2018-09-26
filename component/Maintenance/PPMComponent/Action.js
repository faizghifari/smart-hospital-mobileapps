import React,{Component} from 'react';
import {ViewPager} from 'rn-viewpager';
import {StyleSheet,View,StatusBar,Text,TouchableOpacity,TextInput} from 'react-native';
import {Button,Text as TextN} from 'native-base';

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

  add(){
    if(this.state.action!=''){
      let list=this.state.list
      list.push(
        this.state.action
      )
      this.setState({list})
    }
  }

  remove(index){
    let list=this.state.list
    list.splice(index,1)
    this.setState({list})
  }

  render(){
    let part3=null
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
              <Text style={{color:'white',textAlign:'center',paddingTop:10,fontSize:20,fontWeight:'bold'}}>Spare Part Needed</Text>
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
              <TouchableOpacity onPress={this.submit.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
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
