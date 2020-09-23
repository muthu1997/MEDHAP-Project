import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TouchableHighlight  } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';

import Header from './Header.js';
import Footer from './Footer.js';

import { Actions } from 'react-native-router-flux';


export default class WhyThisApp extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        serviceCheck:false,
        languageData:'',
      }
    }

  async componentDidMount(){
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    const params = new URLSearchParams();
     /* Get language variables start */
     let language = await AsyncStorage.getItem('language');  
     params.append('language', language);
     params.append('page_title', 'WHYTHISAPP');
     axios.post(baseURL+'api/getLanguageVariable',params)
     .then(response => {
       this.setState({languageData: response.data.data});
       this.setState({serviceCheck: true});
     })
     .catch(errorMsg => {
         console.log(errorMsg);
     })
     /* Get language variables end */
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
  
            <View style={styles.profileMenu}>
              <TouchableHighlight style={styles.profileMenuItem}  onPress={() => Actions.pagewhythisapp()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/why_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['Why_this_App']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem}  onPress={() => Actions.pagehowtousethisapp()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/how_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['How_to_use_this_App']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.pagedisclaimer()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/why_this_app.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['Disclaimer']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.pagetermsandconditions()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/terms_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['Term_Conditions']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.pagefaq()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/faq_icon.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>{this.state.languageData['faq']}</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                {/* <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.aboutus()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/logout.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>Explanations</Text>
                      </View>
                    </View>
                </TouchableHighlight> */}
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
    fontSize:16,
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
    fontSize:16,
    padding:10,
  },
  profileItemIcon:{
    width:40,
    height:40,
    alignSelf:'center',
  }
});
