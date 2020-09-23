import React, { Component }  from 'react';
import {StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Questionslist from './Questionslist.js';

export default class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      questionList:'',
      currentPos:0,
    }
  }

  async componentDidMount(){
   
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');  
    let Language = await AsyncStorage.getItem('language');  
    params.append('auth_id', AuthoKey);
    params.append('language_id', Language);
    axios.post(baseURL+'api/getQuestions',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
        this.setState({questionList:resVal.data});
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
  }


  lapsList() {
    if(this.state.questionList.length>0){
        const { currentPos}   = this.state;
        // console.log(currentPos);
          return (
            <Questionslist currentPos={currentPos}/>
          )
    }
  } 

  render() {
    return (
      <View style={styles.questionBox}>
              {this.lapsList()}
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  questionBox:{
    width:'100%',
    height:'80%',
    // backgroundColor:'blue',
  },
});
