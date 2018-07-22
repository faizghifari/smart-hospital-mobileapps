import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar, FlatList } from 'react-native';
import { Root, Form, Item, Input, Container, Content } from "native-base";

import Gradient from 'react-native-linear-gradient';
import Chart from './../components/Charts/EngChart';

export default class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectState: 0,
            selectedNegeri: "",
            selectedHosp: "",
            selectedAsset: "jhk",
            selectDetail: "",
            assetStatus: "",
            ownership: "no one",
            supplier: "henkel",
            statusColor: <Text style={styles.used}>Status: Available</Text>
        };
        this.arrayAssets = this.state.customData;

    }



    render() {
        const data = [39, 14];
        var main = (
            <View style={{ justifyContent: 'center', flexGrow: 1, }}>
                <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'white',
                    borderRadius: 10,
                    borderWidth: 1,
                    margin: 10,
                    alignItems: 'center'
                }}>

                    <Image style={{ width: 100, height: 100, margin: 10 }} source={this.props.data.image} />

                    <View >

                        <Text style={styles.assetSubtitle}>AssetID: 1892ID9231</Text>
                        <Text style={styles.assetSubtitle}>Serial Number: 1892ID9231</Text>
                        <Text style={styles.assetSubtitle}>Description: </Text>
                        <Text style={styles.assetSubtitle}>Ownership: {this.state.ownership} </Text>
                        <Text style={styles.assetSubtitle}>Supplier: {this.state.supplier} </Text>
                        <Text style={styles.assetSubtitle}>Purchase Date: 23/11/2004</Text>
                        <Text style={styles.assetSubtitle}>Purchase Place: Johor</Text>
                        <Text style={styles.assetSubtitle}>Type: </Text>
                        <Text style={styles.assetSubtitle}>Cost: RM140 </Text>
                        <Text style={styles.assetSubtitle}>Warrany Date: </Text>
                        <Text style={styles.assetSubtitle}>Manufacturer: </Text>
                        <Text style={styles.assetSubtitle}>Model: </Text>
                        <Text style={styles.assetSubtitle}>Year: 2005 </Text>
                        <Text style={styles.assetSubtitle}></Text>
                    </View>
                </View>
                <Chart data={data} />
               
                <Form>
                    <Item>
                        <Input placeholder="Ownership"
                            placeholderTextColor="rgba(225, 225, 225, 0.7)"
                            onChangeText={(ownership) => this.setState({ ownership })}
                            style={{color: "white"}} />
                    </Item>
                    <Item>
                        <Input placeholder="Suppplier"
                            placeholderTextColor="rgba(225, 225, 225, 0.7)"
                        />
                    </Item>
                </Form>
                <TouchableOpacity >
                    <Text style={styles.button} >Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity >
                    <Text style={{ fontSize: 13, color: 'white', marginTop: 5, marginLeft: 20, marginBottom: 10 }} >Back</Text>
                </TouchableOpacity>
            </View>
        );



        return (

            <Container>

                <StatusBar
                    animated={true}
                    barStyle='light-content'
                />
                <Gradient locations={[0.1, 0.75]}
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.5 }}
                    colors={['#48dbfb', '#2193b0']}
                    style={{ flex: 1, flexDirection: 'column' }}>
                    <Content>
                        <View style={styles.container}>
                            {main}
                        </View>
                    </Content>
                </Gradient>

            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    asset: {
        marginLeft: 20,
        marginTop: 20
    },

    assetSubtitle: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 15
    },
    button: {
        marginTop: 20,
        marginLeft: '15%',
        marginRight: '15%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        color: 'white'
    },




}); 