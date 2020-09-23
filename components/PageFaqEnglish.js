import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: "1. When should I use app? What is the advantage of using this app?\n",
    content: "You should use the app each and every day. This will not only earn you points and virtual rewards, but also help you establish a hygiene routine, thereby contributing to your health and wellness.\n",
  },
  {
    title: " 2. What will happen if I only fill up the questions but do not send a selfie/photo through the app interface?\n",
    content: "As you are aware, by submitting a selfie/photo, you can earn 1 additional point which will contribute to your overall point status and thereby increase the possibility of a virtual reward.\n",
  },
  {
    title: "3. What benefit will I be getting if I continuously use this app throughout a year?\n",
    content: "You will be designated as a “Hygiene Master” and consequently you will be getting a virtual laurel/virtual Gift Certificate which you can share in your social media accounts. Apart from that, you will be enjoying great health and you are likely to be free from communicable diseases. \n",
  },
  {
    title: "4. Is there any possibility that you will be sharing my data with the government authorities?\n",
    content: "No. We do not share any personal information from this app with any Government authorities or private institutions. Your personal information will be securely stored in our server with sufficient safeguards.\n",
  },
  {
    title: "5. Will you be charging me for using the app?\n",
    content: "No. This app is free to download in both Android and iOS platforms. There are no usage charges.\n",
  },
  {
    title: "6. What financial rewards will I get by using the app?\n",
    content: "You will get only points and virtual rewards for using the app. You will not be getting any physical cash or products as rewards for the use of our app.\n",
  },
  {
    title: "7. Why do you want to send a notification to me?\n",
    content: "We want to send a notification to you through the app window and also through SMS to remind you daily to complete the app questions and upload them to the app. This will enable you to practice a Good Hygiene routine and enable you to be healthy.\n",
  },
];

export default class PageFaqEnglish extends Component {

    state = {
      activeSections: [],
    };
  
    _renderSectionTitle = section => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
  
    _renderHeader = section => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
  
    _renderContent = section => {
      return (
        <View style={styles.content}>
          <Text style={styles.contentText}>{section.content}</Text>
        </View>
      );
    };
  
    _updateSections = activeSections => {
      this.setState({ activeSections });
    };
  

  render() {
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"FAQ- Questions"}/>

                <ScrollView  style={styles.containerBox}>
                      <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        // renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                      />
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
  header:{
    padding:10,
    paddingBottom:0,
    marginBottom:10,
    borderLeftWidth:5,
    borderLeftColor:'#40408B',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  headerText:{
    color:'#000',
    fontSize:14,
    textAlign:'justify',
  },
  content:{
    // backgroundColor:'#555',
    padding:5,
    marginBottom:5,
  },
  contentText:{
    color:'#40408B',
    fontSize:14,
    textAlign:'justify',
  }
});
