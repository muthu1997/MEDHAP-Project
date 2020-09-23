import React, { Component }  from 'react';
import {StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Platform, AlertIOS, Text, Modal, Button, ScrollView} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import QuestionsParticular from './QuestionsParticular.js';

var dispArray1=[0];
var dispArray2=[1,2,3];
var dispArray3=[4,5,6];
var dispArray4=[7,8,9];

export default class Questionslist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      TextInputValue: '',
      currentItem:'',
      questionList:'',
      questionListItems:'',
      currentPos:this.props.currentPos,
      selectedValue:'',
      dispArray:'',
      showPopup: true,
      buttonDisableNext:false,
      languageData:'',
    }
  }

  async componentDidMount(){
    const { currentPos}   = this.state;

    AsyncStorage.setItem('questionAnsweredCount','0,');  
    
    if(currentPos==0){
      this.setState({dispArray:dispArray1});
    }
   
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

    /* Get language variables start */ 
    params.append('language', Language);
    params.append('page_title', 'Questions');
    axios.post(baseURL+'api/getLanguageVariable',params)
    .then(response => {
      this.setState({languageData: response.data.data});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
    /* Get language variables end */

  }

  async loadNextQuestions(){
    const { currentPos}   = this.state;
    let questionAnsweredCount = await AsyncStorage.getItem('questionAnsweredCount'); 
    
    var questionAnsweredCountArray = questionAnsweredCount.split(',');
    var questionAnsweredCountArray = questionAnsweredCountArray.filter(Boolean);
    var questionAnsweredCountArray = Array.from(new Set(questionAnsweredCountArray));

    if(currentPos==0){
      if(questionAnsweredCountArray.length>=5){
          AsyncStorage.setItem('questionAnsweredCount','0,');  
          this.setState({buttonDisableNext:false});
          this.loadNextQuestionsAction();
      }else{
        if (Platform.OS === 'android') {
          var Toast = require("react-native-simple-toast");
          Toast.showWithGravity(this.state.languageData['Answer_all_the_questions'], Toast.LONG, Toast.TOP);
        } else {
          AlertIOS.alert(this.state.languageData['Answer_all_the_questions']);
        }
      }
    }else if(currentPos==1){
      if(questionAnsweredCountArray.length>=5){
        AsyncStorage.setItem('questionAnsweredCount','0,');  
        this.setState({buttonDisableNext:false});
        this.loadNextQuestionsAction();
      }else{
        if (Platform.OS === 'android') {
          var Toast = require("react-native-simple-toast");
          Toast.showWithGravity(this.state.languageData['Answer_all_the_questions'], Toast.LONG, Toast.TOP);
        } else {
          AlertIOS.alert(this.state.languageData['Answer_all_the_questions']);
        }
      }
    }else if(currentPos==2){
      if(questionAnsweredCountArray.length>=4){
        AsyncStorage.setItem('questionAnsweredCount','0,');  
        this.setState({buttonDisableNext:false});
        this.loadNextQuestionsAction();
      }else{
        if (Platform.OS === 'android') {
          var Toast = require("react-native-simple-toast");
          Toast.showWithGravity(this.state.languageData['Answer_all_the_questions'], Toast.LONG, Toast.TOP);
        } else {
          AlertIOS.alert(this.state.languageData['Answer_all_the_questions']);
        }
      }
    }else if(currentPos==3){
      if(questionAnsweredCountArray.length>=4){
        AsyncStorage.setItem('questionAnsweredCount','0,');  
        this.submitQuestions();
      }else{
        if (Platform.OS === 'android') {
          var Toast = require("react-native-simple-toast");
          Toast.showWithGravity(this.state.languageData['Answer_all_the_questions'], Toast.LONG, Toast.TOP);
        } else {
          AlertIOS.alert(this.state.languageData['Answer_all_the_questions']);
        }
      }
    }

  }

  async loadNextQuestionsAction(){
    const { currentPos}   = this.state;
    let updatePosition=currentPos+1;
    if(updatePosition==1){
      this.setState({dispArray:dispArray2});
      this.setState({currentPos:updatePosition});
    }else if(updatePosition==2){
      this.setState({dispArray:dispArray3});
      this.setState({currentPos:updatePosition});
    }else if(updatePosition==3){
      this.setState({dispArray:dispArray4});
      this.setState({currentPos:updatePosition});
    }
  }

  loadNextButton(){
    const { currentPos}   = this.state;
    let currentPosAlt=currentPos+1;
    if(currentPosAlt!=4){
    return(
      <TouchableHighlight style={styles.nextButton} disabled={this.state.buttonDisableNext} onPress={()=>this.loadNextQuestions()}>
          <View style={styles.nextButtonInner}>
              <View style={styles.nextButtonLeft}>
                  <Text style={styles.nextButtonText}>{this.state.languageData['Next']}</Text>
              </View>
              <View style={styles.nextButtonRight}>
                  <Image style={styles.nextButtonImage} source={require('../assets/icons/next.png')}/>
              </View>
        </View>
      </TouchableHighlight>
    )
    }else{
      return(
        <TouchableHighlight style={styles.submitButton} onPress={()=>this.loadNextQuestions()}>
            <View style={styles.nextButtonInner}>
                <View style={styles.nextButtonLeft}>
                    <Text style={styles.nextButtonText}>{this.state.languageData['Submit']}</Text>
                </View>
                <View style={styles.nextButtonRight}>
                    <Image style={styles.nextButtonImage} source={require('../assets/icons/enter.png')}/>
                </View>
          </View>
        </TouchableHighlight>
      )
    }
  }
 
  lapsList(){
    if(this.state.questionList.length>0){
        return this.state.questionList.map((data,index) => {
          return this.state.dispArray.map((datasub,indexsub) => {
            if(datasub==index){
              return(
                <View key={index} style={styles.individualQuestion}>
                      <QuestionsParticular currentItem={data} />
                </View>
              )
            }
        })
    })
    }
  }
  
  submitQuestions = async () =>{
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');  
    params.append('auth_id', AuthoKey);
    axios.post(baseURL+'api/submitQuestions',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
        
        if(resVal.bronze_coin=='Y'){
          AsyncStorage.setItem('bronzeCoin','Y'); 
        }else{
          AsyncStorage.setItem('bronzeCoin','N'); 
        }
       
        Actions.questionsSummary();
        // this.setState({ showPopup: true });
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
    
  }

  handleClose = () => {
    this.setState({ showPopup: false })
  }



  render() {

    return (
      <View style={styles.questionArea}>
          <ScrollView style={styles.questionAreaTop}>
            {this.lapsList()}
         </ScrollView>
         <View style={styles.questionButtonBox}>
              <View style={styles.questionButtonBoxRight}>
                  {this.loadNextButton()}
              </View>
         </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  questionArea:{
    height:'100%',
    // backgroundColor:'red',
    flex:2,
    flexDirection: 'column',
  },
  questionAreaTop:{
    height:'50%',
    // backgroundColor:'blue',
  },
  questionButtonBox:{
    height:'17%',
    // backgroundColor:'yellow',
  },
  questionButtonBoxRight:{
    width:'100%',
    alignSelf:'center',
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
    width:'80%',
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
  individualQuestion:{
    // backgroundColor : "orange", 
    // flex:1,
  },
  
});
