import React,{Component} from 'react'
import {View,Text,TouchableOpacity,StatusBar,FlatList,StyleSheet} from 'react-native'

const styles=StyleSheet.create({
  buttonAcc:{
    marginTop:20,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'#00FF00',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonDec:{
    marginTop:20,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'#FF3232',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center'
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
  },
})

export default class NotificationEngineer extends Component{
  constructor(props){
    super(props)
    this.state={
      notification:[{
        name:'Puritan Bennet',
        id:'1',
        type:'PPM',
        due_to:new Date().toString(),
      },{
        name:'Puritan Bennet',
        id:'1',
        type:'PPM',
        due_to:new Date().toString(),
      },{
        name:'Puritan Bennet',
        id:'1',
        type:'PPM',
        due_to:new Date().toString(),
      },{
        name:'Puritan Bennet',
        id:'1',
        type:'PPM',
        due_to:new Date().toString(),
      },]
    }
  }
  notificationHandler(item,index){
    return(
      <View style={{flexDirection:'column',backgroundColor:'white',borderRadius:4,margin:10,padding:10}}>
        <View>
          <Text style={{fontWeight:'bold',fontSize:15}}>{item.name}</Text>
          <Text style={{fontSize:11}}>{item.id}</Text>
          <Text style={{fontSize:13}}>{item.type}</Text>
          <Text style={{fontSize:13}}>{item.due_to}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:0.85,flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.buttonAcc}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDec}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  render(){
    return(
      <View style={{flex:1, flexDirection:'column',backgroundColor:'#1abc9c'}}>
        <StatusBar
          backgroundColor="#1abc9c"
          animated={true}
          barStyle='light-content'
        />
        <View style={{flex:0.1,flexDirection:'column',justifyContent:'center'}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:18}}>Welcome Engineer</Text>
        </View>
        <View style={{flex:0.7,flexDirection:'row',marginLeft:10,marginRight:10}}>
          <FlatList
            style={{flex:1,borderColor:'white',borderWidth:5,borderRadius:5}}
            data={this.state.notification}
            renderItem={({item,index})=>this.notificationHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
        <View style={{flex:0.2,justifyContent:'center'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>List device</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
