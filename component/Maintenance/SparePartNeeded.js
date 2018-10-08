import React, {Component} from 'react'
import {StyleSheet,View,ScrollView,Text,TextInput,TouchableOpacity,FlatList,Dimensions,Alert} from 'react-native';

const styles=StyleSheet.create({
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

var {height, width} = Dimensions.get('window');

export default class SparePartNeeded extends Component{
  constructor(props){
    super(props)
    this.state={
      list:[],
      name:null,
      qty:null
    }
  }
  renderList(item,index){
    return(
      <View style={{marginLeft:'15%', marginRight:'15%',flexDirection:'row', justifyContent:'space-around',marginBottom:10}}>
        <Text style={{color:'white',fontSize:15}}>{index+1}. {item.name} x {item.qty}</Text>
        <TouchableOpacity onPress={this.remove.bind(this,index)} style={[styles.button,{marginTop:0}]}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    )
  }
  add(){
    if(this.state.name!=''&&this.state.qty!=''){
      let list=this.state.list
      list.push(
        {
          name:this.state.name,
          qty:this.state.qty
        }
      )
      this.setState({list})
    }
  }

  remove(index){
    let list=this.state.list
    list.splice(index,1)
    this.setState({list})
  }

  submit(){
    Alert.alert(
      'Submission',
      'Submit form?',
      [
        {text: 'Ok', onPress: ()=> {window.alert('Submitted');this.props.changeStepMaintenance(2)}},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  render(){
    console.log(this.state.list)
    let list=null
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
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
    return(
      <ScrollView style={styles.container}>
        <Text style={{color:'white',textAlign:'center',paddingTop:10,fontSize:20,fontWeight:'bold'}}>Spare Part Needed</Text>
        {list}
        <View style={{flexDirection:'row', justifyContent:'space-around',marginLeft:'5%',marginRight:'5%',marginTop:20}}>
          <View style={{flexDirection:'column',flex:0.45}}>
            <Text style={{color:'white',fontSize:10}}>Name</Text>
            <TextInput underlineColorAndroid='transparent' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(name) =>this.setState({name})} />
          </View>
          <View style={{flexDirection:'column',flex:0.45}}>
            <Text style={{color:'white',fontSize:10}}>Quantity</Text>
            <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(qty) =>this.setState({qty})} />
          </View>
        </View>
        <TouchableOpacity onPress={this.add.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.submit.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
      </ScrollView>
    )
  }
}
