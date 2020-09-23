import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, Platform, TouchableOpacity, AlertIOS, Picker, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AndroidBack from './AndroidBack';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import AwesomeButton from "react-native-really-awesome-button";
import Toast from 'react-native-simple-toast';

export default class Language extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageList:'',
      baseurl:'',
      baseURLImage:'',
      selectedLanguage:'',
      serviceCheck:false,
    }
  }

  async componentDidMount(){
    this.getLanguageList();
    let baseURL = await AsyncStorage.getItem('baseURL');  
    let baseURLImage = await AsyncStorage.getItem('baseURLImage');  
    this.setState({baseurl:baseURL,baseURLImage:baseURLImage});
  }

  async getLanguageList() {
      let baseURL = await AsyncStorage.getItem('baseURL');  
      axios.post(baseURL+'api/getLanguageList')
      .then(response => {
          this.setState({languageList:response.data.data});
          this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }

  makeStar = async (data) =>{
    var result = data === 1 ? "ONE" : data === 2 ? "TWO" : "THREE";
    AsyncStorage.setItem("language_Id",result);
    this.setState({selectedLanguage:data});
  }

  lapsList(){
    if(this.state.languageList.length>0){
        return this.state.languageList.map((data,index) => {
          let baseURLImage = this.state.baseURLImage;  
          let matchId = baseURLImage+"themes/assets/img/star.png";
          if(this.state.selectedLanguage == data.language_id){
            matchId = baseURLImage+"themes/assets/img/tick_mark_new.png";
            AsyncStorage.setItem('language',data.language_id);  
          }

          let matchIdIcon = baseURLImage+"themes/assets/img/language_2.png";
          if(data.language_id==2){
            matchIdIcon = baseURLImage+"themes/assets/img/language_1.png";
          }
          return (
                <TouchableOpacity key={index} style={styles.header}  onPress={()=>this.makeStar(data.language_id)}>
                  <View style={styles.headerInner}>
                    <View style={styles.headerLeftIcon}>
                      <Image source={{ uri:matchIdIcon}} style={styles.headerLeftIconCustom}/>
                    </View>
                    <View style={styles.headerLeft}>
                        <Text style={styles.branchName}>{data.language_name}</Text>
                        <Text style={styles.branchLocation}>[{data.language_text}]</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Image source={{ uri:matchId}} style={styles.starBox}/>
                    </View>
                  </View>
                </TouchableOpacity>
          )
        })
      }
  }

  languageProcess = async () =>{
        if(this.state.selectedLanguage!=''){
          Actions.login();
        }else{
          if (Platform.OS === 'android') {
            Toast.showWithGravity('Please select your language', Toast.LONG, Toast.CENTER);
          } else {
            AlertIOS.alert('Please select your language');
          }
      }
    }


  render() {
    if(this.state.serviceCheck==false)
            return null;
    return (
      <View>
        {/* <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/> */}
          <View style={styles.logoBox}>

              <View style={styles.topLogo}>
                <Image source={require('../assets/logo.png')} style={{ width:'100%', height:'100%'}}/>
              </View>

                  <ScrollView  style={styles.containerBox}>
                    <Text style={styles.languageTitle}>कृपया अपना चयन करें</Text>
                    <Text style={styles.languageTitleTamil}>உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</Text>
                    <Text style={[styles.languageTitle,styles.marginBottom]}>Please select your language</Text>
                            {this.lapsList()}

                      {/* <TouchableOpacity style={styles.loginButton}  onPress={this.languageProcess}>
                        <Text style={styles.loginButtonText}> Next </Text>
                      </TouchableOpacity> */}
                      <AwesomeButton 
                      style={styles.loginButton} 
                      backgroundColor="#40408B"
                      activityColor="#FFF"
                      backgroundDarker="#7979B9"
                      backgroundPlaceholder="orange"
                      backgroundProgress="#7979B9"
                      activeOpacity={0.5}
                      borderRadius={10}
                      width={150}
                      height={50}
                      textColor="#FFFFFF"
                      activeOpacity={1}
                      progress
                      raiseLevel={4}
                      onPress={next => {
                        this.languageProcess();
                        next();
                      }}
                      >
                      {/* <Image source="require('send-icon.png)" /> */}
                      <Text style={styles.loginButtonText}> Next </Text>
                     </AwesomeButton>


                  </ScrollView> 

   
          </View>
          <AndroidBack/>
              
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    height: '100%',
    paddingTop:'10%',
    alignSelf:'center',
    backgroundColor:'#FFF',

  },
  loginTextParent:{
    marginTop:10,
  },
  topLogo:{
    width: 100,
    height: 120,
    alignSelf:'center',
    // backgroundColor:'red',
    marginBottom:20,
  },
  marginBottom:{
    marginBottom:20,
  },
  header:{
    backgroundColor:'#FEF7FF',
    paddingLeft:20,
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:10,
    padding:10,
    borderLeftColor:'#40408B',
    borderLeftWidth:4,
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5,
    // borderBottomColor:'#40408B',
    // borderBottomWidth:0.8,
  },
  headerInner:{
    flex:3,
    flexDirection: 'row',
  },
  headerLeftIcon:{
    width:'20%',
    height:'100%',
  },
  headerLeft:{
    width:'60%',
    height:'100%',
    // backgroundColor:'#FFF',
  },
  headerRight:{
    width:'20%',
    height:'100%',
    // padding:'5%',
    // backgroundColor:'green',
  },
  branchName:{
    color:'#333',
    fontSize:RFValue(20),
  },
  branchLocation:{
    color:'#333',
    fontSize:RFValue(16),
  },
  starBox:{
    width:50,
    height:50,
  },
  headerLeftIconCustom:{
    width:50,
    height:50,
  },
  languageTitle:{
    color:'#333',
    fontSize:RFValue(16),
    alignSelf:'center',
    marginBottom:10,
  },
  languageTitleTamil:{
    color:'#333',
    fontSize:RFValue(14),
    alignSelf:'center',
    marginBottom:10,
  },
  loginButton:{
    marginTop:20,
    alignSelf:'center',
  },
  loginButtonText:{
    color:'#FFF',
    padding:8,
    alignSelf:'center',
    fontSize:18,
  },
 
});
