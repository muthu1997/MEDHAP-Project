import React, { Component }  from 'react';
import {Dimensions, StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text, ScrollView} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-banner-carousel';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

import BackButton from './BackButton.js';
import ScoreTable from './ScoreTable.js';

export default class ScoreBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      TextInputValue: '',
      value: 0,
      lastElement:false,
      scoreList: '',
      serviceCheck:true,
      report_type:'',
      languageData:'',
    }
  }

  async componentDidMount(){
     /* Get language variables start */
     let baseURL = await AsyncStorage.getItem('baseURL');  
     let language = await AsyncStorage.getItem('language');  
     const params = new URLSearchParams();
     params.append('language', language);
     params.append('page_title', 'Scoreboard');
     axios.post(baseURL+'api/getLanguageVariable',params)
     .then(response => {
       this.setState({languageData: response.data.data});
     })
     .catch(errorMsg => {
         console.log(errorMsg);
     })
     /* Get language variables end */

  }


  loadScoreTable(){
        return (
          <ScoreTable report_type={this.state.report_type} />
        )
  }


  render() {
    if(this.state.serviceCheck==false)
    return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
          <View style={styles.logoBox}>
              <View style={styles.topSpace}></View>
              <BackButton backtext={this.state.languageData['Score_Board']}/>
                <View >
                    {this.loadScoreTable()}
                </View>
          </View>
    </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    height: '100%',
    position:'absolute', 
    // paddingHorizontal:70,
    // backgroundColor:'#FFF',
    textAlign:'center',
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:20,
    backgroundColor:'#000',
  },
});
