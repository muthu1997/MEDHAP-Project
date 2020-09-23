import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, Platform, AlertIOS, TouchableOpacity, Image, ActivityIndicator, Constants, Button } from 'react-native';
import { Camera } from 'expo-camera';
//import {Permissions} from 'expo';
import * as Permissions from 'expo-permissions';
// import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export default class CameraUpload extends Component {
  constructor(props) {
    super(props)

    // console.log(this.props.question_item_id);
    this.state = {
      BackButtonText: '',
      hasPermission: null,
      type: Camera.Constants.Type.back,
      cameraType: '',
      isLoading: false,
    }
  }


  _pickImage = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      //alert(status);
      this.setState({ hasPermission: status === 'granted' });
    //this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission 
    //const { status } = await Permissions.getAsync( Permissions.CAMERA );
    // const { status, expires, permissions } = await Permissions.getAsync(
    //   Permissions.CAMERA_ROLL
    // );
    // if (status !== 'granted') {
    //   alert('Hey! You have not enabled selected permissions');
    // }
    const { status } = await Camera.requestPermissionsAsync();
    if (status == 'granted') {
      console.log('Permission Granted for Camera')
    }
    alert(status)
    // if (Platform.OS === 'ios') {
    //   const { status } = await Camera.requestPermissionsAsync();
    //   //alert(status)
    //   if (status !== 'granted') {
    //     alert('Sorry, we need camera roll permissions to make this work!');
    //   }else {
    //     this.setState({ hasPermission: status === 'granted' });
    //   }
    // }
    // Camera Permission
    //const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }


  handleCameraType = () => {
    const { cameraType } = this.state

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {

      this.setState({ isLoading: true });
      let photo = await this.camera.takePictureAsync({
        base64: true,
        quality: 0.2,
        // onPictureSaved :this.afterSaved(),
      });
      // console.log(photo);
      this.uploadImag(photo);
    }
  }

  pickImage = async () => {
    this.setState({ isLoading: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    // console.log(result);
    this.uploadImag(result);
  }

  // afterSaved(){
  //   console.log("stop loading");
  // }

  uploadImag = async (imgFile) => {
    // console.log(imgFile['base64']);
    if (Platform.OS === 'android') {
      
      Toast.showWithGravity('Uploading selfi', Toast.LONG, Toast.TOP);
    } else {
      AlertIOS.alert('Uploading selfi');
    }

    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL');
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');
    params.append('auth_id', AuthoKey);
    params.append('imageFile', imgFile['base64']);
    params.append('index_value', this.props.index_value);
    axios.post(baseURL + 'api/uploadImage', params)
      .then(response => {
        let resVal = response.data;
        if (resVal.status == 'success') {
          // console.log("Upload Success");
          if (Platform.OS === 'android') {
            
            Toast.showWithGravity('Selfi uploaded', Toast.LONG, Toast.TOP);
          } else {
            AlertIOS.alert('Selfi uploaded');
          }

          if (this.props.index_value == 4) {
            AsyncStorage.setItem('selfiUploaded4', '1');
          } else if (this.props.index_value == 6) {
            AsyncStorage.setItem('selfiUploaded6', '1');
          }

          this.setState({ isLoading: false });
          Actions.pop()
        } else {
          // console.log("Upload Error");
          this.setState({ isLoading: false });
          Actions.pop()
        }
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })
  }

  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View style={{flex:1,backgroundColor:'#FFFF'}}>
        <Button title="hi" onPress={()=>this._pickImage()} />
      </View>
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.cameraBox}>
          <Camera style={styles.cameraArea} type={this.state.cameraType} ref={ref => {
            this.camera = ref;
          }} >
            {this.state.isLoading && <ActivityIndicator style={styles.activityLoader} />}
          </Camera>
          <View style={styles.buttonsArea}>
            <View style={styles.buttonsAreaInnter}>
              <TouchableOpacity
                style={styles.buttonsItem}
                onPress={() => this.pickImage()}
              >
                <Image source={require('../assets/icons/camera_1.png')} style={styles.footerMenuIcons} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonsItem}
                onPress={() => this.takePicture()}
              >
                <Image source={require('../assets/icons/camera_2.png')} style={styles.footerMenuIcons} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonsItem}
                onPress={() => this.handleCameraType()}
              >
                <Image source={require('../assets/icons/camera_3.png')} style={styles.footerMenuIcons} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cameraBox: {
    flex: 2,
    flexDirection: 'column',
  },
  cameraArea: {
    height: '90%',
  },
  buttonsArea: {
    height: '10%',
    backgroundColor: '#40408B',
  },
  buttonsAreaInnter: {
    width: '100%',
    flex: 3,
    flexDirection: 'row',
  },
  buttonsItem: {
    width: '33.3%',
    alignSelf: 'center',
    // backgroundColor:'red',
    textAlign: 'center',
  },
  footerMenuIcons: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  activityLoader: {
    color: '#FFF',
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingTop: '30%',
    backgroundColor: '#333',
    opacity: 0.8,
  }
});
