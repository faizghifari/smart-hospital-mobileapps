import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN} from 'native-base';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
  },
  subPartText:{
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingBottom:15
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
})


export default class Part3 extends Component {
  constructor(props){
    super(props);
  }
  specialPrecautions(data,index){
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={this.props.precaution[index]} onPress={this.props.precautionHandler.bind(this,index)} />
        <Body>
          <TextN style={{color:'white'}}>{data.procedure}</TextN>
        </Body>
      </ListItem>
    )
  }

  render(){
    let precautions=[{
      procedure:'If there is evidence of fluid contamination, submit the device for cleaning and decontamination before inspection it.'
    },{
      procedure:'Wear appropriate Personal Protection Equipment (PPE) during work.'
    },{
      procedure:'Wear grounded electrostatic wristband when handling PCB or electronic components.'
    }]
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 4 - Special Precaution</Text>
          <FlatList
            style={{flex:1}}
            data={precautions}
            renderItem={({item,index})=>this.specialPrecautions(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
