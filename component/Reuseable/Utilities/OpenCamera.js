import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

import Gradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50
    },
    buttonContainer: {
        width: 195,
        height: 43,
        alignItems: 'center',
        backgroundColor:'white'
    },

    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        padding: 15,
        marginLeft: 1,
        marginRight: 1,
        width: 198
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default class OpenCamera extends Component {

    constructor() {
        super();
        this.state = {
            image: null,
            images: null
        };
    }

    selectMain(i) {
        this.props.selectCam(0);
    }

    pickSingleWithCamera(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                //imgs: this.state.imgs.push({uri: image.path, width: image.width, height: image.height}),
                images: null
            });
        }).catch(e => alert(e));
    }


    cleanupImages() {
        ImagePicker.clean().then(() => {
            console.log('removed tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }

    cleanupSingleImage() {
        let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
            console.log(`removed tmp image ${image.uri} from tmp directory`);
        }).catch(e => {
            alert(e);
        })
    }

    cropLast() {
        if (!this.state.image) {
            return Alert.alert('No image', 'Before open cropping only, please select image');
        }

        ImagePicker.openCropper({
            path: this.state.image.uri,
            width: 200,
            height: 200
        }).then(image => {
            console.log('received cropped image', image);
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
                images: null
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }

    pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
                images: null
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
                    return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
                })
            });
        }).catch(e => alert(e));
    }

    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }


    renderImage(image) {
        return <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
        console.log(image);
    }

    renderAsset(image) {
        return this.renderImage(image);
    }

    render() {
        return (
          <View style={styles.container}>
              <ScrollView style={{ marginTop: 80 }}>
                  {this.state.image ? this.renderAsset(this.state.image) : null}
                  {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
              </ScrollView>
              <Gradient
                  colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                  start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                  style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', width: 200 }}
              >
                  <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>OPEN CAMERA</Text>
                  </TouchableOpacity>
              </Gradient>
              <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Select From Camera Roll</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.selectMain.bind(this,0)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
          </View>
        );
    }
}
