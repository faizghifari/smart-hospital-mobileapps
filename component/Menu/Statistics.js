import React, {Component} from 'React'
import {View,Text,StatusBar,ImageBackground,TouchableOpacity,StyleSheet,FlatList,TextInput,KeyboardAvoidingView,Picker} from 'react-native'
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
    this.dataHospital=[
      {
        nama:'AAA',
        desc:'Jalan abc - Johor'
      },
      {
        nama:'BBB',
        desc:'Jalan aab - Melacca'
      },
      {
        nama:'CCC',
        desc:'Jalan aba - KL'
      },
      {
        nama:'DDD',
        desc:'Jalan cba'
      },
      {
        nama:'EAC',
        desc:'Jalan casca'
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
      dataProvince: this.dataProvince,
      dataHospital: this.dataHospital,
      dateType:'daily',
      month:'07',
      year:'18'
    };
    this.setDate = this.setDate.bind(this);
    this.arrayProvince=this.dataProvince;
    this.arrayHospital=this.dataHospital;
  }


  SearchFilterFunction(text){
    if(this.state.main==2){
      var newData = this.arrayProvince
    }else if(this.state.main==3){
      var newData = this.arrayHospital
    }
    newData=newData.filter(function(item){
      const itemData = item.nama.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    if(this.state.main==2){
      this.setState({
          dataProvince: newData,
          text: text
      })
    }else if(this.state.main==3){
      this.setState({
          dataHospital: newData,
          text: text
      })
    }

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

  listItem(item){
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
      dataProvince:this.dataProvince,
      dataHospital:this.dataHospital
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
            data={this.state.dataProvince}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
      var title='Statistics - State/Province'
    }else if (this.state.main==3){
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <FlatList
            style={{flex:1}}
            data={this.state.dataHospital}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
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
      if(this.state.dateType=='daily'){
        var pickerSelector=(
          <DatePicker
            defaultDate={new Date(2018, 7, 17)}
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
      }else if (this.state.dateType=='monthly') {
        var pickerSelector=(
          <View>
            <Picker
              selectedValue={this.state.month}
              style={{color:'white', height: 50, width:80 }}
              onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
              <Picker.Item label="Jan" value="01" />
              <Picker.Item label="Feb" value="02" />
              <Picker.Item label="Mar" value="03" />
              <Picker.Item label="Apr" value="04" />
              <Picker.Item label="May" value="05" />
              <Picker.Item label="Jun" value="06" />
              <Picker.Item label="Jul" value="07" />
              <Picker.Item label="Agst" value="08" />
              <Picker.Item label="Sept" value="09" />
              <Picker.Item label="Oct" value="10" />
              <Picker.Item label="Nov" value="11" />
              <Picker.Item label="Dec" value="12" />
            </Picker>
            <Picker
              selectedValue={this.state.year}
              style={{color:'white', height: 30, width:80 }}
              onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue})}>
              <Picker.Item label="2010" value="18" />
              <Picker.Item label="2011" value="19" />
              <Picker.Item label="2012" value="20" />
              <Picker.Item label="2013" value="21" />
              <Picker.Item label="2014" value="22" />
              <Picker.Item label="2015" value="23" />
              <Picker.Item label="2016" value="24" />
              <Picker.Item label="2017" value="25" />
              <Picker.Item label="2018" value="26" />
            </Picker>
          </View>
        )
      }else{
        var pickerSelector=(
          <View>
            <Picker
              selectedValue={this.state.year}
              style={{color:'white', height: 50, width:80 }}
              onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue})}>
              <Picker.Item label="2010" value="18" />
              <Picker.Item label="2011" value="19" />
              <Picker.Item label="2012" value="20" />
              <Picker.Item label="2013" value="21" />
              <Picker.Item label="2014" value="22" />
              <Picker.Item label="2015" value="23" />
              <Picker.Item label="2016" value="24" />
              <Picker.Item label="2017" value="25" />
              <Picker.Item label="2018" value="26" />
            </Picker>
          </View>
        )

      }
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backButtonHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.35, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={{flex:0.20,justifyContent:'center'}}>
            <Picker
              selectedValue={this.state.dateType}
              style={{color:'white', height: 50, width:80 }}
              onValueChange={(itemValue, itemIndex) => this.setState({dateType: itemValue})}>
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
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
