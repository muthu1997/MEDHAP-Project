import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class Aboutus extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: ''
      }
    }

  render() {
    
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Why this app?"}/>

                {/* <WebView
                source={{
                  uri: 'http://www.wssdemozone.in/payment.php',
                }}
                // onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
              /> */}


               <ScrollView  style={styles.containerBox}>
                    <Text style={styles.aboutText}>This app aims to encourage the user to do a self-audit of the prescribed hygiene practices for preventing the infectious diseases like the. This app is different from other existing apps on hygiene.</Text>
                    <Text style={styles.aboutText}>Due to increased mobility and air and sea travel, pandemics and epidemicsoriginating anywhere in the world spreadthroughout the globe like a wildfire causing severe human and economic loss. Most infections spread either through respiratory tract,gastro intestinal route or physicalcontact. All the previous pandemics have taught the humanity a lot. By observing simple hygienic practices andsocial distancing, spread of a great majority of diseases can be prevented to lead a healthy life.</Text>
                    <Text style={styles.aboutText}>Unfortunately, such hygienic practices observed religiously during the epidemics tend to get diluted over the time and completely forgotten till another pandemic knocks at our door. Hence the need for creation of a new generation that continues to follow the practices unconsciously as a regular routine habit of life by regimentation.  </Text>
                    <Text style={styles.aboutText}>This app has been developed for self-reminding ,motivating and also self-auditing of hygienic measures practiced by the user.All age groups can use this app. If all the listed parameters are sincerely practiced, this apphelps to prevent or lessen the impact of the severity of not only the ongoing Corona pandemic but also the emergence of future pandemics.</Text>
               </ScrollView>

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
  containerBox:{
    padding:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  aboutText:{
    color:'#000',
    fontSize:RFValue(16),
    textAlign:'justify',
    marginTop:5,
    marginBottom:10,
  }
});
