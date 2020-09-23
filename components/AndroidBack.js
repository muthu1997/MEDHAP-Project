import React, {Component} from 'react';
import {Platform, Alert, BackHandler, Animated, AsyncStorage, Linking, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class AndroidBack extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
    }
  }

  componentDidMount() {
    if(Platform.OS !== 'ios'){
      BackHandler.addEventListener('hardwareBackPress', () => {
        if(Actions.currentScene === 'login' || Actions.currentScene === 'dashboard'){     
          Alert.alert('Info',
            'Are you sure you want to leave this app?',[
              {text: 'Rate App', onPress: () => {
                Linking.openURL("https://play.google.com/store/apps/details?id=com.medhaphygenic.userPortalApplication")
              }},
              {text: 'Exit', onPress: () => {
                BackHandler.exitApp();
              }},
              {text: 'Cancel', onPress: () => {
                
              }},
            ],
            { cancelable: false }
          );
          return true;
        } else {
          return false;
        }
      });
    }
  }


  render() {
    return (
        <View></View>
    );
  }
}