import React, {component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator,
}from 'react-native';
import Modal from 'react-native-modalbox';
import {MIcon as Icon} from './Icon.js';

const styles = StyleSheet.create({
  menuContainer:{
    alignItems:'center',
    flexDirection:'row',
    padding: 16,
  },
  menuIcon:{
    color: 'grey',
    fontSize:30
  },
  menuKata:{
    fontSize: 20,
    marginLeft: 26
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 200,
  },
});



export default class Drawer extends React.Component {
  constructor(props){
    super(props);
  }

  _images(){
    if(this.props.data==null){
      return(
        <View>
        </View>
      )
    }
    else{
      var base64Icon = 'data:image/png;base64,'+this.props.data.ProfileImage;
      return(
        <View>
          <Image style={{margin: 5,width: 75, height: 75, borderRadius: 75/2}} source={{uri: base64Icon}}/>
        </View>
      )
    }
  }

  render(){
    console.log('berubah');
    var rend=[];
    var signButton=[];
    rend.push(
      <View key='0'>
        <Text style={{margin: 10,fontSize: 20, textAlign: 'left', color: 'white'}}>Guest User</Text>
      </View>
    );
    signButton.push(
      <View key='0'>
        <TouchableNativeFeedback>
          <View>
            <View style={styles.menuContainer}>
              <Text style={styles.menuKata}>Daftar sebagai anggota</Text>
            </View>
            <View style={{
              borderBottomColor:'grey',
              borderBottomWidth:StyleSheet.hairlineWidth,
              marginLeft:16,
            }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
    return(
      <View style={{flex: 1,flexDirection: 'column'}}>
        <Modal style={[styles.modal]} position={"center"} ref={"loading"} backdropPressToClose={false} swipeToClose={false} animationDuration={0}>
          <ActivityIndicator size="large" color="#0082c6" />
          <Text style={styles.text}>Loading</Text>
        </Modal>
        <Modal style={[styles.modal]} position={"center"} ref={"connError"}>
          <Text style={styles.text}>Connection error</Text>
        </Modal>
        <View style={{flex: 0.3, backgroundColor: 'skyblue', flexDirection:'column'}}>
          <View style={{margin: 10, flex: 0.6, justifyContent: 'center'}}>
            {this._images()}
          </View>
          <View style={{margin:10, flex: 0.4, justifyContent: 'flex-end'}}>
            {rend}
          </View>
        </View>
        <View style={{flex: 0.7, flexDirection:'column'}}>
          <View>
            <TouchableNativeFeedback>
              <View>
                <View style={styles.menuContainer}>
                  <Text style={styles.menuKata}>OPAC</Text>
                </View>
                <View style={{
                  borderBottomColor:'grey',
                  borderBottomWidth:StyleSheet.hairlineWidth,
                  marginLeft:16,
                }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          {signButton}
          <View>
            <TouchableNativeFeedback>
              <View>
                <View style={styles.menuContainer}>
                  <Text style={styles.menuKata}>About</Text>
                </View>
                <View style={{
                  borderBottomColor:'grey',
                  borderBottomWidth:StyleSheet.hairlineWidth,
                  marginLeft:16,
                }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }
}
