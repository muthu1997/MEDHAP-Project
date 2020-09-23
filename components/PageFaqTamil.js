import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: "1. நான் எப்போது இந்த செயலியைப்  பயன்படுத்த வேண்டும்? இந்த செயலியைப் பயன்படுத்துவதன் நன்மை என்ன? \n",
    content: "நீங்கள்தினமும் இந்த செயலியைப் பயன்படுத்த வேண்டும். இது உங்களுக்கு புள்ளிகள் மற்றும் மெய்நிகர் வெகுமதிகளை பெற்று தருவது  மட்டுமல்லாமல், ஒரு சுகாதார பழக்க வழக்கத்தை கடைப் பிடிக்கவும், உங்கள் உடல்நலம் மற்றும் ஆரோக்கிய பாதுகாப்பிற்கு முக்கியப்  பங்களிக்கும்.\n",
  },
  {
    title: " 2. நான் கேட்கப்பட்டக் கேள்விக்கு பதிலை மட்டுமே பூர்த்தி செய்துவிட்டு , செல்ஃபி / புகைப்படத்தை அனுப்பாவிட்டால் என்னவாகும்?\n",
    content: "நீங்கள்  ஒரு செல்ஃபி / புகைப்படத்தை சமர்ப்பிப்பதன் மூலம்,  கூடுதலாக மேலும் ஒரு  புள்ளியைப் பெறலாம், இது உங்கள் ஒட்டுமொத்த புள்ளிக்கு கூடுதல் பங்களிக்கும், மேலும் இதன் மூலம் மெய்நிகர் சான்றிதழ் பெறுவதற்கான  வாய்ப்பை அதிகரிக்கும்.\n",
  },
  {
    title: "3. ஒரு வருடம் முழுவதும் இந்த செயலியைத் தொடர்ந்து பயன்படுத்தினால் எனக்கு என்ன நன்மை கிடைக்கும்?\n",
    content: "நீங்கள் ஒரு HYGIENE MASTER ஆக இருப்பதோடு, அதற்கான சான்றிதழ் வழங்கப்படும்.  இதனை  உங்கள் சமூக ஊடக கணக்குகளில் நீங்கள் பகிரக்கூடிய மெய்நிகர் லாரல் / மெய்நிகர் சான்றிதழைப் பெறுவீர்கள். தவிர, நீங்கள் மிகுந்த ஆரோக்கியமாகவும் ஆரோக்கியத்தையும் மற்றும்  தொற்று நோய்களிலிருந்து விடுபடவும் வாய்ப்புள்ளது.\n ",
  },
  {
    title: "4. எனது தரவைகளை  நீங்கள் மற்றவர்களுடன் பகிர்ந்து கொள்வதற்கான சாத்தியங்கள் ஏதேனும் உள்ளதா?\n",
    content: "இல்லை. இந்த பயன்பாட்டிலிருந்து எந்தவொருத்  தனிப்பட்ட தகவலையும் நாங்கள் எந்த அரசு அதிகாரிகள் அல்லது தனியார் நிறுவனங்களுடன் பகிர்ந்து கொள்ள மாட்டோம். உங்கள் தனிப்பட்ட தகவல்கள் போதுமான பாதுகாப்புகளுடன் எங்கள் சேவையகத்தில் சேமிக்கப்படும்.\n",
  },
  {
    title: "5. இந்த செயலியைப்  பயன்படுத்துவதற்கு நீங்கள் என்னிடம் கட்டணம் வசூலிப்பீர்களா?\n",
    content: "இல்லை. இந்த செயலியானது  Android மற்றும் iOS இயங்குதளங்களில் பதிவிறக்கம் செய்து இலவசமாக பயன்படுத்திக் கொள்ளலாம். இந்த செயலிக்கு  பயன்பாட்டு கட்டணங்கள் எதுவும் இல்லை.\n",
  },
  {
    title: "6. இந்த செயலியைப் பயன்படுத்துவதன் மூலம் எனக்கு என்ன நிதியுதவி கிடைக்கும்?\n",
    content: "இந்த செயலியைப்  பயன்படுத்தி  புள்ளிகள் மற்றும் மெய்நிகர் வெகுமதிகளை மட்டுமே பெறுவீர்கள். மேலும் எந்தவொரு பணமோ அல்லது பொருளோ  பெற மாட்டீர்கள்.\n",
  },
  {
    title: "7. எனக்கு ஏன் தினமும் ஒரு அறிவிப்பு (ஞாபகமூட்டல்) SMS  அனுப்ப விரும்புகிறீர்கள்?\n",
    content: "இந்த செயலியின்  மூலமாகவும், எஸ்எம்எஸ் மூலமாகவும் உங்களுக்கு ஒரு அறிவிப்பை அனுப்ப விரும்புகிறோம், இந்த செயலியின் கேள்விகளை நிறைவுசெய்து அவற்றை பதிவேற்ற தினசரி உங்களுக்கு நினைவூட்டுகிறோம். இது ஒரு நல்ல சுகாதார பழக்க வழக்கத்தைக்  கடைபிடிக்கவும் ஆரோக்கியமாக இருக்கவும் உதவும்.\n\n\n",
  },
];

export default class PageFaqTamil extends Component {

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
            <BackButton backtext={"அடிக்கடி கேட்கப்படும் கேள்விகள்"}/>

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
