import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TouchableHighlight, Share  } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';

import Header from './Header.js';
import Footer from './Footer.js';

import { Actions } from 'react-native-router-flux';


export default class Profile extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        full_name: '',
        email_id:'',
        mobile_number:'',
        country_code:'',
        serviceCheck:false,
        languageData:'',

        share: 'Share'
      }
      AsyncStorage.getItem("language_Id")
      .then(data => {
        //alert(data)
        if (data) {
          this.setState({
            notdata: data === "ONE" ? "दोस्तों को शेयर करें" : data === "TWO" ? "நண்பர்களுக்கு பகிரவும்" : "Share to friends"
          }, async function () {
            Notifications.cancelAllScheduledNotificationsAsync();
            await this.sendPushNotification();
          })
        }
      })
    }

  async componentDidMount(){
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');  
    params.append('auth_id', AuthoKey);
    axios.post(baseURL+'api/getAuthDetails',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
        this.setState({
          full_name:resVal.data[0].first_name,
          email_id:resVal.data[0].email,
          mobile_number:resVal.data[0].mobile_number,
          country_code:resVal.data[0].mobile_code,
        });
        this.setState({serviceCheck:true});
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })

      /* Get language variables start */
      let language = await AsyncStorage.getItem('language');  
      params.append('language', language);
      params.append('page_title', 'Profile');
      axios.post(baseURL+'api/getLanguageVariable',params)
      .then(response => {
        this.setState({languageData: response.data.data});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
      /* Get language variables end */

  }


  shareFunction = async() => {
    try {
      const result = await Share.share({
        message:
          'I recommend MEDHAP app to know about infections originating anywhere in the world spread through the globe like a wildfire. Please download and share it using this link https://play.google.com/store/apps/details?id=com.medhaphygenic.userPortalApplication',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { full_name,email_id,mobile_number, country_code }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.detailsBox}>
                <View style={styles.detailsBoxInner}>
                    <View style={styles.detailsBoxDetails}>
                        <Text style={styles.detailsBoxDetailsItem}>{full_name}</Text> 
                        <Text style={styles.detailsBoxDetailsItem}>{email_id}</Text>
                        <Text style={styles.detailsBoxDetailsItem}>+{country_code} {mobile_number}</Text>
                    </View>
                    <TouchableHighlight style={styles.detailsBoxIcons} onPress={() => Actions.profileedit()}>
                            <Image source={require('../assets/icons/edit.png')} style={styles.editIcon}/> 
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.profileMenu}>
              
                <TouchableHighlight style={styles.profileMenuItem}  onPress={() => Actions.profileedit()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/edit_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['edit_profile']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem}  onPress={() => Actions.languageChange()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/language_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['change_language']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => this.shareFunction()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/question.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.share}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.logout()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/logout.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['logout']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
            </View>
            <Footer/>
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
    textAlign:'center',
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  detailsBox:{
    width:'100%',
    height:'20%',
  },
  detailsBoxInner:{
    flex:2,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  detailsBoxDetails:{
    width:'80%',
    padding:10,
  },
  detailsBoxIcons:{
    width:'20%',
    alignItems:'center',
  },
  editIcon:{
    width:40,
    height:40,
    marginTop:'50%',
  },
  detailsBoxDetailsItem:{
    color:'#000',
    fontSize:RFPercentage(2.3),
    marginTop:'5%',
    paddingLeft:5,
  },
  profileMenu:{
    width:'100%',
    height:'50%',
    marginTop:10,
  },
  profileMenuItem:{
    width:'100%',
    height:70,
    padding:10,
    backgroundColor:'#FFF',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    opacity:0.9,
    marginBottom:2,
  },
  profileMenuItemInner:{
    flex:2,
    flexDirection: 'row',
  },
  profileMenuItemIcon:{
    width:'15%',
  },
  profileMenuItemText:{
    width:'85%',
  },
  profileMenuItemTextItem:{
    color:'#333',
    fontSize:RFPercentage(2.3),
    padding:10,
  },
  profileItemIcon:{
    width:40,
    height:40,
    alignSelf:'center',
  }
});
