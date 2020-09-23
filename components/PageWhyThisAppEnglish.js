import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageWhyThisAppEnglish extends Component {

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
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}Due to increased mobility and air and sea travel, infections originating anywhere in the world spread throughout the globe like a wildfire causing severe human and economic loss. Most infections spread either through respiratory tract, gastrointestinal route or physical contact. By observing simple hygienic practices and social distancing, spread of a great majority of such diseases can be prevented.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}Unfortunately, hygienic practices, observed by the public during crisis period of spreading infection, tend to get diluted over the time and completely forgotten till another grave infection knocks at our door. Hence, there is a need for creation of a new generation of people that continues to follow the hygiene practices unconsciously as a routine habit by regimentation.  Our app, namely, MED-HAP satisfies this need. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}This app has been developed for motivating, self-reminding, and also self-auditing of hygienic measures practiced by the user. People all over the world, above the age of 13 years can use this app. If all the listed hygiene parameters in our app are sincerely practiced every day, this app is likely to prevent or lessen the impact of the severity of infections spread through the respiratory and gastrointestinal route. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} This app is different from other available apps on hygiene in terms of reminder notification, scoring system, virtual rewards and selfie uploading. {'\n'}{'\n'}</Text>
                    </View>

                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} What are the uses of this app {'\n'}</Text>
                    </View>
                   
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} •	Knowledge of regular hygiene practice for the public is made available.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} •	Motivates the public for regular practice of hygiene.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} •	Serves as a self-auditing tool for the public on hygiene practices.  {'\n'}</Text>
                    </View>
                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} •	In built reminder notification tool to carry on hygiene practices every day.{'\n'}{'\n'}{'\n'}</Text>
                    </View>
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
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  containerBox:{
    padding:20,
    paddingBottom:20,
    paddingTop:10,
    opacity:0.9,
  },
  aboutTextParent:{
    marginBottom:5,
    paddingBottom:10,
  },
  aboutText:{
    color:'#000',
    fontSize:14,
    textAlign:'justify',
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  }
});
