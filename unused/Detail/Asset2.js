import React,{Component} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar, FlatList } from 'react-native';
import { Button, Container, Root, Header, Content, Icon, Picker, Form, Item, Input } from "native-base";

export default class Asset extends Component{
  render(){
    return(
      <View style={{ justifyContent: 'center', flexGrow: 1}}>
          <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              margin: 10,
              alignItems: 'center'
          }}>

              <Image style={{ width: 100, height: 100, margin: 10 }} source={{uri:'https://raw.githubusercontent.com/faizghifari/smart-hospital-mobileapps/app-rey/src/images/medical.png?token=AYaoAZDGA7cVKZJVUJk3gOz95TEpCU9nks5bWBVPwA%3D%3D'}} />
              <View >
                  <Text style={styles.assetTitle}>{this.props.selectedAsset}</Text>
                  <Text style={styles.assetSubtitle}>Status: {this.props.data.assetStatus}</Text>
                  <Text style={styles.assetSubtitle}>Number: {this.props.data.number}</Text>
                  <Text style={styles.assetSubtitle}>Description: </Text>
                  <Text style={styles.assetSubtitle}>Purchase Date: {this.props.data.purchaseDate}</Text>
                  <Text style={styles.assetSubtitle}>Purchase Place: {this.props.data.purchasePlace}</Text>
                  <Text style={styles.assetSubtitle}>Location Code: {this.props.data.locationCode}{this.props.assetStatus}</Text>
                  <Text style={styles.assetSubtitle}>Type: </Text>
                  <Text style={styles.assetSubtitle}>Cost: {this.props.data.cost} </Text>
                  <Text style={styles.assetSubtitle}>Warrany Date: </Text>
                  <Text style={styles.assetSubtitle}>Manufacturer: </Text>
                  <Text style={styles.assetSubtitle}>Brand and Model: </Text>
                  <Text style={styles.assetSubtitle}></Text>
              </View>
          </View>
          <TouchableOpacity onPress={this.props.selectState.bind(this, 2)}>
              <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
          </TouchableOpacity>
      </View>
    )
  }
}
