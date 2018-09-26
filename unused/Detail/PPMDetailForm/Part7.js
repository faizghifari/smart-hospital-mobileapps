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
    fontSize: 13,
  },
  notes:{
    color: 'white',
    fontSize: 12,
  },
  subNotes:{
    fontStyle:'italic',
    fontSize: 12,
    color:'white'
  }
})

var radio_props = [
  { label: 'DONE', value: 2 },
  { label: 'NOT DONE**', value: 1 },
  { label: 'NA*', value: 0 }
];

export default class Part7 extends Component {
  constructor(props){
    super(props);
  }


  renderPMT(item,index){
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:4 }}>
        <View style={{flex:0.4,flexDirection:'column',justifyContent:'flex-start'}}>
          <Text style={styles.inspectionName}>{item.name}</Text>
        </View>
        <RadioForm
          style={{flex:0.6, justifyContent:'flex-end'}}
          formHorizontal={true}
          radio_props={radio_props}
          labelHorizontal={false}
          initial={-1}
          buttonInnerColor={'white'}
          buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
          onPress={(value) => {
            newPMTvalue = this.props.PMTvalue;
            newPMTvalue[index]=value;
            this.props.setNewState({ PMTvalue: newPMTvalue })
          }}
        />
      </View>
    )
  }


  render(){
    let PMTdata= [
      {
        name: "Clean/Inspect the Exterior & Interior",
      },
      {
        name: "Adjust Altitude Control & Interior",
      },
      {
        name: "Replace Battery",
      },
      {
        name: "Replace Bellows",
      },
    ]
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 7 - Preventive Maintenance Tasks</Text>
          <FlatList
            style={{flex:1}}
            data={PMTdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => this.renderPMT(item,index)}
          />
          <Text style={styles.notes}>Notes:{'\n'}</Text>
          <Text style={styles.subNotes}>*For all parts, NA defined as NOT APPLICABLE{'\n'}</Text>
          <Text style={styles.subNotes}>**If you havve ticked 'NOT DONE', then input relevant remarks in Part 8{'\n'}</Text>
          <Text style={styles.subNotes}>***Choose whichever applicable. Please indicate in Part 8 for any part replaced{'\n'}</Text>
        </View>
      </ScrollView>
    )
  }
}
