import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import Hindi from './PageTermsAndConditionsHindi.js';
import Tamil from './PageTermsAndConditionsTamil.js';
import English from './PageTermsAndConditionsEnglish.js';


export default class PageTermsAndConditions extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        language:'',
      }
    }

    async componentDidMount(){
      let language = await AsyncStorage.getItem('language');  
      this.setState({language:language});
    }

    renderSubComp(){
      if(this.state.language==1){
        return <Hindi/>
      }else if(this.state.language==2){
        return <Tamil/>
      }else if(this.state.language==3){
        return <English/>
      }
    }


  render() {
    return (
      <View>
       {this.renderSubComp()}
      </View>
    ); 
  }
}   