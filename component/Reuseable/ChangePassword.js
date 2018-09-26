import React, {Component} from 'react';
import {Text, StatusBar, View, StyleSheet, TouchableOpacity,Platform,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {Root,Form, Item, Input, Label} from 'native-base';
import Modal from 'react-native-modalbox';

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
  buttonusername:{
    marginTop:20,
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
  form:{
    marginLeft:0,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 200,
  },
  text:{
    textAlign:'center'
  }
});

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      error:false,
      changed:false,
    };
  }


  submitChange(){
    console.log(this.state.password1,this.state.password2)
    if(this.state.password1!='' && this.state.password2!=''){
      console.log('lah')
      this.setState({
        error:false
      })
      if(this.state.password1=='wkwkwk'&&this.state.password2=='wkwkwk'){
        this.setState({
          changed:true
        })
      }else{
        this.setState({
          error:true
        })
      }
    }else{
      this.setState({
        error:true
      })
    }
  }

  render(){
    console.log('render',this.state.error)
    let error=null
    if(this.state.error){
      error=(
          <Text style={{fontSize:13, color:'red', marginTop:5}}>Wrong password on one or both field!</Text>
      )
    }else{
      error=null;
    }
    if(this.state.changed){
      main=(
        <View>
          <Text style={styles.buttonText}>Password successfully changed!</Text>
          <TouchableOpacity style={styles.buttonusername} onPress={this.props.nextMenu.bind(this)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      main=(
        <Form>
         <Item style={styles.form} floatingLabel>
           <Label style={{color:'white'}}>Password</Label>
           <Input style={{color:'white'}} onChangeText={(password1)=>this.setState({password1})} secureTextEntry={true}/>
         </Item>
         <Item style={styles.form} floatingLabel>
           <Label style={{color:'white'}}>Re-type Password</Label>
           <Input style={{color:'white'}} onChangeText={(password2)=>this.setState({password2})} secureTextEntry={true}/>
         </Item>
         {error}
         <View style={{flexDirection:'row', justifyContent:'center'}}>
           <View style={{flex:0.9}}>
             <TouchableOpacity style={styles.buttonusername} onPress={this.submitChange.bind(this)}>
               <Text style={styles.buttonText}>Change Password</Text>
             </TouchableOpacity>
            </View>
          </View>
        </Form>
      )
    }
    return(
      <Root>
        <KeyboardAvoidingView style={{flex:1, flexDirection: 'column'}} enabled behavior="padding">
          <Modal style={[styles.modal]} position={"center"} ref={"loadingModal"} backdropPressToClose={false} swipeToClose={false} animationDuration={0}>
            <ActivityIndicator size="large" color="#0082c6" />
            <Text style={styles.text}>Loading</Text>
          </Modal>
          <Modal style={[styles.modal]} position={"center"} ref={"connError"}>
            <Text style={styles.text}>Connection Error!</Text>
          </Modal>
          <View style={{backgroundColor:'#37BCAE',width: '100%', height: '100%'}}>
            <View style={{flex:0.25, justifyContent:'flex-end'}}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'white', textAlign:'center'}}>Change Password</Text>
            </View>
            <View style={{flex:0.6, justifyContent:'center'}}>
              <View style={{marginLeft:'5%',marginRight:'5%'}}>
                {main}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Root>
    );
  }
}
