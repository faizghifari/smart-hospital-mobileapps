import React, {Component} from 'React'
import {View,Text,StatusBar,ImageBackground,TouchableOpacity,StyleSheet,FlatList,TextInput,KeyboardAvoidingView} from 'react-native'
import {Button, DatePicker} from 'native-base'
import Chart from './../Chart/Chart.js'
import {MIcon as Icon} from './../Utilities/Icon.js';
import StatisticsDetail from './../Detail/StatisticsDetail.js';

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
  buttonEmail:{
    marginTop:20,
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonText1:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'
  },
  buttonText2:{
    fontSize:15,
    color:'white',
  },
  form:{
    marginLeft:0,
  },
  selectButton:{
    marginLeft:'3%',
    marginRight:'3%',
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:5,
    borderWidth:1,
    marginBottom: 15
  },
  textContainer:{
    padding: 10
  },
  titleFont:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
});

export default class Statistics extends Component{
  constructor(props){
    super(props);
    this.dataProvince=[
      {
        nama:'Penang',
        desc:'10 Hospital'
      },
      {
        nama:'Selangor',
        desc:'10 Hospital'
      },
      {
        nama:'Johor',
        desc:'10 Hospital'
      },
      {
        nama:'Sabah',
        desc:'10 Hospital'
      },
      {
        nama:'Malacca',
        desc:'10 Hospital'
      },
      {
        nama:'Sarawak',
        desc:'10 Hospital'
      },
      {
        nama:'Perak',
        desc:'10 Hospital'
      },
      {
        nama:'Kedah',
        desc:'10 Hospital'
      },
      {
        nama:'Pahang',
        desc:'10 Hospital'
      },
      {
        nama:'Trengganu',
        desc:'10 Hospital'
      },
      {
        nama:'Kelantan',
        desc:'10 Hospital'
      },
      {
        nama:'Negeri Sembilan',
        desc:'10 Hospital'
      },
      {
        nama:'Perlis',
        desc:'10 Hospital'
      },
    ]
    this.state = {
      main: 0,
      chosenDate: new Date(),
      chosenTitle:'',
      chosenDetail:'',
      searchText:null,
      isLoading:false,
      dataSource: dataProvince
    };
    this.setDate = this.setDate.bind(this);
    this.arrayholder=dataProvince
  }


  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.nama.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
        dataSource: newData,
        text: text
    })
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  changeMain(i){
    this.setState({
      main: i
    })
  }


  chooseDetail(param){
    console.log(param);
    this.setState({
      main:param[0],
      chosenTitle:param[1]
    })
  }

  listProvince(item){
    return(
      <TouchableOpacity style={styles.selectButton} onPress={this.chooseDetail.bind(this,[4,item.nama])}>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText1}>{item.nama}</Text>
          <Text style={styles.buttonText2}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  backButtonHandler(){
    this.setState({
      dataSource=this.dataProvince
    })
    if(this.state.main==0){
      this.props.changeMenu(0)
    }else if(this.state.main==1||this.state.main==2||this.state.main==3){
      this.changeMain(0)
    }else if(this.state.main==4){
      this.changeMain(2)
    }
  }

  render(){
    const data = [ 50, 10, 40];


    if(this.state.main==0){
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <TouchableOpacity style={styles.selectButton} onPress={this.changeMain.bind(this,1)}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText1}>All</Text>
              <Text style={styles.buttonText2}>Show the statistic of your country</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectButton} onPress={this.changeMain.bind(this,2)}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText1}>State/Province</Text>
              <Text style={styles.buttonText2}>Show the statistic of the selected State/Province</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectButton} onPress={this.changeMain.bind(this,3)}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText1}>Hospital</Text>
              <Text style={styles.buttonText2}>Show the statistic of the selected hospital</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
      var title='Statistics';
    }else if(this.state.main==1){
      var main=(
        <StatisticsDetail data={data}/>
      );
      var title='Statistics - All';
    }else if(this.state.main==2){
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <FlatList
            style={{flex:1}}
            data={this.state.dataSource}
            renderItem={({item})=>this.listProvince(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
      var title='Statistics - State/Province'
    }else if (this.state.main==3){
      var main=(
        <StatisticsDetail data={data}/>
      )
      var title='Statistics - Hospital'
    }else if (this.state.main==4){
      var main=(
        <StatisticsDetail data={data}/>
      )
      var title=this.state.chosenTitle
      console.log(title);
    }

    if(this.state.main==0){
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backButtonHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
        </View>
      )
    }else if (this.state.main==2 || this.state.main==3) {
      var header=(
        <KeyboardAvoidingView style={{flex:0.1, flexDirection:'row', justifyContent:'center',alignItems:'center'}} enabled behavior='padding'>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backButtonHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85,flexDirection:'row',alignItems:'center',borderRadius:10, borderColor:'white',borderWidth:1,height:40,marginRight:10,justifyContent:'space-around'}}>
            <View style={{flex:0.1}}>
              <Icon name="search" style={{color: 'white',marginLeft:10}}/>
            </View>
            <View style={{flex:0.85}}>
              <TextInput onChangeText={this.SearchFilterFunction.bind(this)} clearButtonMode='always' style={{color:'white'}} placeholder='Search State/Province' placeholderTextColor='#F5F5F5' underlineColorAndroid='transparent'/>
            </View>
          </View>
        </KeyboardAvoidingView>
      )
    }else{
      if(this.)
      var pickerSelector=(
        <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          minimumDate={new Date(2018, 1, 1)}
          maximumDate={new Date(2018, 12, 31)}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          textStyle={{ color: "white" }}
          placeHolderTextStyle={{ color: "white" }}
          onDateChange={this.setDate}
        />
      )
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backButtonHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.55, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={{flex:0.30, justifyContent:'center'}}>
            {pickerSelector}
          </View>
        </View>
      )
    }
    return(
      <View style={{flex:1,flexDirection:'column', backgroundColor:'#3498db'}}>
        <StatusBar
          backgroundColor="#3498db"
          animated={true}
          barStyle='light-content'
        />
        {header}
        {main}
      </View>
    );
  }
}
