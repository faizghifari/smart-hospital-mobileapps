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
  { label: 'PASS', value: 'Pass' },
  { label: 'FAIL', value: 'Fail' },
  { label: 'NA', value: 'NA' }
];

export default class Part5Main extends Component {
  constructor(props){
    super(props);
  }


  renderTechnical(item,index){
    let initial=null
    if(this.props.TIdata[index].value==undefined){
      initial=-1
    }else if(this.props.TIdata[index].value=='Pass'){
      initial=0
    }else if(this.props.TIdata[index].value=='Fail'){
      initial=1
    }else if(this.props.TIdata[index].value=='NA'){
      initial=2
    }
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
          initial={initial}
          buttonInnerColor={'white'}
          buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
          onPress={(value) => {
            newTIdata = this.props.TIdata;
            newTIdata[index].value=value;
            this.props.setNewState({ TIdata: newTIdata })
            this.props.saveCurrentMaintenanceData()
          }}
        />
      </View>
    )
  }


  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 6 - Technical Inspection</Text>
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
