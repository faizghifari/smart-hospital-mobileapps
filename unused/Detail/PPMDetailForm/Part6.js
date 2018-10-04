import React,{Component} from 'react';
import RadioForm from 'react-native-simple-radio-button';
import {View,Text,StyleSheet,FlatList,ScrollView} from 'react-native';

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
  inspectionName: {
    color: 'white',
    fontSize: 15,
  },
  inspectionDesc:{
    color: 'white',
    fontSize: 12,
  }
})

var radio_props = [
  { label: 'PASS', value: 2 },
  { label: 'FAIL', value: 1 },
  { label: 'NA', value: 0 }
];

export default class Part6 extends Component {
  constructor(props){
    super(props);
  }


  renderTechnical(item,index){
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:4 }}>
        <View style={{flex:0.6,flexDirection:'column',justifyContent:'flex-start'}}>
          <Text style={styles.inspectionName}>{item.name}</Text>
          <Text style={styles.inspectionDesc}>{item.description}</Text>
        </View>
        <RadioForm
          style={{flex:0.4}}
          formHorizontal={true}
          radio_props={radio_props}
          labelHorizontal={false}
          initial={-1}
          buttonInnerColor={'white'}
          buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
          onPress={(value) => {
            newTIvalue = this.props.TIvalue;
            newTIvalue[index]=value;
            this.props.setNewState({ TIvalue: newTIvalue })
          }}
        />
      </View>
    )
  }


  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 6 - Visual Inspection</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.TIdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => this.renderTechnical(item,index)}
          />
        </View>
      </ScrollView>
    )
  }
}
