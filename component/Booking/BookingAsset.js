import React, { Component } from 'React'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Picker,
  Dimensions
} from 'react-native';
import {
  Item, Input, Icon, DatePicker
} from 'native-base';
import Moment from 'moment';
import Modal from 'react-native-modalbox';


var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 4,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  assetTitle: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Helvetica'
  },
  iconStyle: {
    color: 'white',
    fontSize: 30,
    padding: 20,
    paddingBottom: 5,
  },
  calendar: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 100,
  },
  iconText: {
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    color: 'white'
  },
  number1: {
    fontSize: 50,
    color: '#1dd1a1',
    textAlign: 'center'
  },
  number2: {
    fontSize: 50,
    color: '#ee5253',
    textAlign: 'center'
  },
  number3: {
    fontSize: 50,
    color: '#0abde3',
    textAlign: 'center'
  },
  number4: {
    fontSize: 50,
    color: 'yellow',
    textAlign: 'center'
  },
  number5: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  timeBox: {
    width:60,
    borderRadius:10,
    padding:10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.75,
    width: width*0.75,
    backgroundColor:'black'
  },
})

export default class BookingAsset extends Component {
  constructor(props) {
    super(props);
    this.state={
      calendarItem:null,
      selectedData:null,
      selectedDate:new Date(),
      deptList:[
        {
          name:'Clinical Centre'
        },{
          name:'Operating Theater'
        },{
          name:'ICU'
        },{
          name:'Emergency Room'
        },{
          name:'Impatient'
        }
      ],
      selectedDept:'1',
      data: [
        {
          name: 'Syringe Pump',
          image: require('../../assets/b.png'),
          location:'Room 1',
          id:'10121312323',
          bookTime:[null,1,null,1,null,1,null,null,1,1]
        },
        {
          name: 'Electropump',
          image: require('../../assets/c.png'),
          location:'Room 2',
          id:'10121312326',
          bookTime:[null,1,null,1,null,1,null,null,1,1]
        },
        {
          name: 'X-Ray',
          image: require('../../assets/a.png'),
          location:'Room 3',
          id:'10121312322',
          bookTime:[1,null,null,null,1,null,null,null,1,1],
        },
        {
          name: 'X-Ray',
          image: require('../../assets/a.png'),
          location:'Room 2',
          id:'10121312327',
          bookTime:[null,1,null,1,null,1,null,null,1,1]
        },
        {
          name: 'Electro Pump',
          image: require('../../assets/b.png'),
          location:'Room 3',
          id:'10121312328',
          bookTime:[null,1,null,1,null,1,null,null,1,1]
        }
      ],
      text:null
    }
    this.arrayAssets=this.state.data
  }


  SearchFilterFunction(text) {
    var newData = this.arrayAssets //buat array untuk si asset
    newData = newData.filter(function (item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      data:newData,
      text:text
    })
  }


  openCalendar(item){
    if(this.state.calendarItem==item){
      this.setState({
        calendarItem:null
      })
    }else{
      this.setState({
        calendarItem:item
      })
    }
  }

  bookThis(item){
    if(this.state.selectedData==item){
      this.setState({
        selectedData:null
      })
    }else{
      this.setState({
        selectedData:item
      })
    }
  }

  pickThis(item,index,bookIndex){
    let calendarItemNew=this.state.data
    if(calendarItemNew[bookIndex].bookTime[index]==null){
      calendarItemNew[bookIndex].bookTime[index]=2
    }else if (calendarItemNew[bookIndex].bookTime[index]==2) {
      calendarItemNew[bookIndex].bookTime[index]=null
    }
    this.setState({
      data:calendarItemNew
    })
  }

  renderBookTime(item,index,bookIndex){
    let color=null
    let press=null
    let text=null
    if(item==null){
      color='rgba(0,0,0,0)'
      press=this.pickThis.bind(this,item,index,bookIndex)
    }
    else if(item==1){
      color='#FF6961'
    }else if (item==2) {
      color='#77DD77'
      press=this.pickThis.bind(this,item,index,bookIndex)
    }
    switch(index){
      case 0:
        text='08:00'
        break;
      case 1:
        text='09:00'
        break;
      case 2:
        text='10:00'
        break;
      case 3:
        text='11:00'
        break;
      case 4:
        text='12:00'
        break;
      case 5:
        text='13:00'
        break;
      case 6:
        text='14:00'
        break;
      case 7:
        text='15:00'
        break;
      case 8:
        text='16:00'
        break;
      case 9:
        text='17:00'
        break;
    }
    return(
      <TouchableOpacity style={[styles.timeBox,{backgroundColor:color}]} onPress={press}>
        <Text style={{color:'white',textAlign:'center'}}>{text}</Text>
      </TouchableOpacity>
    )
  }

  openModal(){
    this.refs.summary.open()
  }

  renderBook(item,index){
    let status=null
    let press=null
    let reschedule=null
    let bookButton=null
    let bookIndex=index
    if(this.state.selectedDept==1){
      if(this.state.selectedData==item){
        reschedule=(
          <View style={{margin:20}}>
            <FlatList
              data={item.bookTime}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item,index})=>this.renderBookTime(item,index,bookIndex)}
              horizontal={true}
              extraData={this.state}
            />
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.button} onPress={this.openModal.bind(this,item)}>
                <Text style={{color:'white'}}>Book</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.bookThis.bind(this,item)}>
                <Text style={{color:'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }else {
        bookButton=(
          <TouchableOpacity style={styles.button} onPress={this.bookThis.bind(this,item)}>
            <Text style={{color:'white'}}>Book</Text>
          </TouchableOpacity>
        )
      }
    }
    return(
      <View style={{
        flex: 1, flexDirection: "column", backgroundColor: '#72e2fc',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
      }}>
        <View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignContent: 'center' }}>
            <View style={{ flex: 0.3, justifyContent: 'center', alignContent: 'center' }}>
              <Image style={{ width: 80, height: 80, margin: 10 }} source={item.image} />
            </View>
            <View style={{ flex: 0.3, marginBottom: 15, justifyContent: 'center', width: 200, marginLeft: 10 }}>
              <Text style={styles.assetTitle}>{item.name}</Text>
              <Text style={styles.assetTitle}>{item.id}</Text>
              <Text style={styles.assetTitle}>{item.location}</Text>
              {status}
            </View>
            <View style={{ flex: 0.4, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {bookButton}
            </View>
          </View>
        </View>
        {reschedule}
      </View>
    )
  }

  renderList(){
    let array=[]
    this.state.deptList.map((item,index)=>{
      array.push(
        <Picker.Item key={index} label={item.name.toString()} value={item.name.toString()} />
      )
    })
    return array
  }

  onValueChange(item){
    this.setState({
      selectedDept:item
    })
  }

  timeConfirm(){
    let array=[]
    this.state.selectedData.bookTime.map((item,index)=>{
      if(item==2){
        let text=null
        switch(index){
          case 0:
            text='08:00'
            break;
          case 1:
            text='09:00'
            break;
          case 2:
            text='10:00'
            break;
          case 3:
            text='11:00'
            break;
          case 4:
            text='12:00'
            break;
          case 5:
            text='13:00'
            break;
          case 6:
            text='14:00'
            break;
          case 7:
            text='15:00'
            break;
          case 8:
            text='16:00'
            break;
          case 9:
            text='17:00'
            break;
        }
        array.push(
          <Text key={index} style={{color:'white',marginLeft:10}}>{text}</Text>
        )
      }
    })
    return array
  }

  bookFinal(){
    this.refs.summary.close()
    let index=null
    for(let i=0;i<this.state.data;i++){
      if(this.state.data[i]==this.state.selectedData){
        index=this.state.data[i]
      }
    }
    let selectedDataNew=this.state.selectedData
    for(let i=0;i<selectedDataNew.bookTime.length;i++){
      if(selectedDataNew.bookTime[i]==2){
        selectedDataNew.bookTime[i]=1
      }
    }
    let newData=this.state.data
    newData[index]=selectedDataNew
    this.setState({
      data:newData,
      selectedData:null
    })
    this.props.mockUpOnly()
    window.alert('Booked!')
  }

  cancelBook(item){
    this.refs.summary.close()
    this.bookThis(item)
  }

  setDate(newDate){
    this.setState({
      selectedDate:newDate
    })
  }

  render() {
    let isiModal=null
    if(this.state.selectedData!=null){
      isiModal=(
        <ScrollView style={{flex:1}}>
          <Text style={{textAlign:'center',color:'white',marginTop:20}}>Booking Summary</Text>
          <View style={{ flex: 0.3, justifyContent: 'center', flexDirection:'row'}}>
            <Image style={{ width: 80, height: 80, margin: 10 }} source={this.state.selectedData.image} />
          </View>
          <Text style={{color:'white',fontWeight:'bold'}}>Booker</Text>
          <Text style={{color:'white',marginLeft:10}}>Dr. OZ</Text>
          <Text style={{color:'white',fontWeight:'bold'}}>Asset type</Text>
          <Text style={{color:'white',marginLeft:10}}>{this.state.selectedData.name}</Text>
          <Text style={{color:'white',fontWeight:'bold'}}>Asset Location</Text>
          <Text style={{color:'white',marginLeft:10}}>{this.state.selectedData.location}</Text>
          <Text style={{color:'white',fontWeight:'bold'}}>Date</Text>
          <Text style={{color:'white',marginLeft:10}}>{Moment(this.state.selectedDate).format('D-MM-YYYY')}</Text>
          <Text style={{color:'white',fontWeight:'bold'}}>Time</Text>
          {this.timeConfirm()}
          <TouchableOpacity style={styles.button} onPress={this.bookFinal.bind(this,this.state.selectedData)}>
            <Text style={{color:'white'}}>Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.cancelBook.bind(this,this.state.selectedData)}>
            <Text style={{color:'white'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      )
    }
    return(
      <View style={{ flex: 1,backgroundColor:'#48dbfb' }}>
        <Modal style={[styles.modal]} position={"center"} ref={"summary"} backdropPressToClose={false} swipeToClose={false} animationDuration={0}>
          {isiModal}
        </Modal>

        <View searchBar style={{
          backgroundColor: 'white',
          borderColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          height: 50,
          borderWidth: 1,
          marginTop: 10,
          marginLeft: '5%',
          marginRight: '5%',

        }}>
          <Item>
            <Icon style={{ marginLeft: 20 }} name="ios-search" />
            <Input onChangeText={this.SearchFilterFunction.bind(this)}
              placeholder="Search" />
          </Item>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:20,marginRight:20}}>
          <Text style={{color:'white',flex:0.2,fontSize:16}}>Dept:</Text>
          <Picker
            mode="dropdown"
            style={{marginTop:20,marginBottom:10,flex:0.6,color:'white' }}
            selectedValue={this.state.selectedDept}
            onValueChange={this.onValueChange.bind(this)}
          >
            {this.renderList()}
          </Picker>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Today"
            textStyle={{ color: "white" }}
            placeHolderTextStyle={{ color: "white" }}
            onDateChange={this.setDate.bind(this)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={( {item,index} ) =>
              this.renderBook(item,index)
            }
            extraData={this.state}
          >
          </FlatList>
        </View>
      </View>
    )
  }
}
