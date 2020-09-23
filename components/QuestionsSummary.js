import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

import Header from './Header.js';
import Footer from './Footer.js';
import axios from 'axios';

export default class QuestionsSummary extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        bronzeCoin:'',
        languageData:'',
      }
    }

    async componentDidMount(){
      let bronzeCoin = await AsyncStorage.getItem('bronzeCoin'); 
      // let bronzeCoin='N';
      this.setState({bronzeCoin:bronzeCoin});

        /* Get language variables start */
        let baseURL = await AsyncStorage.getItem('baseURL');  
        let language = await AsyncStorage.getItem('language');  
        const params = new URLSearchParams();
        params.append('language', language);
        params.append('page_title', 'QuestionSummary');
        axios.post(baseURL+'api/getLanguageVariable',params)
        .then(response => {
          this.setState({languageData: response.data.data});
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
        /* Get language variables end */
    }

    loadmodelData = () =>{
      if(this.state.bronzeCoin=='Y'){
      return(
        <View>
          <Image source={require('../assets/congrats-01.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
            <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.dashboardBox}> 
                  <View style={styles.topContent}> 
                      <Text style = {styles.modalTopMessage1}>{this.state.languageData['Congratulations']}</Text>  
                      <Text style = {styles.modalTopMessage2}>{this.state.languageData['You_won_the_chocolate_today']}</Text>


                      <TouchableHighlight style={styles.submitButton} onPress={()=>Actions.scoreBoard()}>
                        <View style={styles.nextButtonInner}>
                            <View style={styles.nextButtonLeft}>
                                <Text style={styles.nextButtonText}>{this.state.languageData['Please_check_score']}</Text>
                            </View>
                       </View>
                    </TouchableHighlight>

                  </View>
            </View>
            <Footer/>
        </View> 
      </View>
      )
      }else if(this.state.bronzeCoin=='N'){
        return(
          <View>
          <Image source={require('../assets/congrats-02.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
            <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.dashboardBox}> 
                  <View style={styles.topContent}> 
                      <Text style = {styles.modalTopMessage1}>{this.state.languageData['Good_Job']}</Text>  
                      {/* <Text style = {styles.modalTopMessage2}>Your today activity has been recorded</Text> */}
                  </View>
            </View>
            <Footer/>
        </View> 
      </View>
        )
      }
    }

  render() {
    
    return (
      <View>
          {this.loadmodelData()}
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    height: '100%',
    position:'absolute', 
    textAlign:'center',
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  dashboardBox:{
    flex:2,
    flexDirection: 'column',
  },
  topContent: {  
    paddingTop:'30%',
    alignItems: 'center',   
    height:'80%',
    width:'80%',
    alignSelf:'center',
    // backgroundColor : "#ededef",   
  },  
 
  modalTopMessage1:{
    fontSize:RFValue(28),
    textAlign:'center',
  },
  modalTopMessage2:{
    fontSize:RFValue(22),
    textAlign:'center',
  },
  modalTopImage:{
    width:'100%',
    height:200,
    alignSelf:'center',
  },
  modalBottomButton:{
    marginTop:20,
    width:100,
    alignSelf:'center',
  },
  loadinfomodelDataClose:{
    borderColor:'#40408B',
    borderWidth:0.5,
    // padding:10,
    alignSelf:'center',
    backgroundColor:'#40408B',
    // bottom:5,
    width:'100%',
    height:125,
   },
   loadinfomodelDataCloseText:{
    color:'#FFF',
    padding:10,
    textAlign:'center',
   },
   nextButton:{
    backgroundColor:'#40408B',
    borderWidth:0.5,
    borderColor:'#40408B',
    borderRadius:25,
    padding:5,
    margin:10,
    width:250,
    height:50,
    alignSelf:'center',
  },
  nextButtonInner:{
    flex:2,
    flexDirection: 'row',
  },
  nextButtonLeft:{
    width:'100%',
    // padding:5,
    paddingLeft:15,
  },
  nextButtonRight:{
    width:'20%',
    backgroundColor:'#FFF',
    borderRadius:50,
    padding:10,
    paddingLeft:15,
  },
  nextButtonImage:{
    width:25,
    height:25,
  },
  nextButtonText:{
    color:'#FFF',
    fontSize:RFValue(18),
    textAlign:'center',
    marginTop:5,
  },
   submitButton:{
    backgroundColor:'#40408B',
    borderWidth:0.5,
    borderColor:'#40408B',
    borderRadius:25,
    padding:5,
    margin:10,
    width:250,
    height:50,
    alignSelf:'center',
  },
});
