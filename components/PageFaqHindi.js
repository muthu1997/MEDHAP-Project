import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: "1. मुझे ऐप कब इस्तेमाल करना चाहिए? इस ऐप का उपयोग करने का क्या फायदा है?\n",
    content: "आपको हर दिन ऐप का इस्तेमाल करना चाहिए। यह न केवल आपको अंक और आभासी पुरस्कार अर्जित करेगा, बल्कि आपको एक स्वच्छता दिनचर्या स्थापित करने में भी मदद करेगा, जिससे आपके स्वास्थ्य और कल्याण में योगदान होगा\n",
  },
  {
    title: " 2. क्या होगा यदि मैं केवल प्रश्नों को भर दूं लेकिन ऐप इंटरफेस के माध्यम से एक सेल्फी / फोटो न भेजें?\n",
    content: "जैसा कि आप जानते हैं, एक सेल्फी / फोटो जमा करके, आप 1 अतिरिक्त अंक अर्जित कर सकते हैं जो आपके समग्र बिंदु की स्थिति में योगदान देगा और इस तरह एक आभासी इनाम की संभावना को बढ़ाएगा\n",
  },
  {
    title: "3. अगर मुझे एक साल में लगातार इस ऐप का उपयोग करने पर क्या लाभ मिलेगा?\n",
    content: "आपको एक “स्वच्छता मास्टर” के रूप में नामित किया जाएगा और इसके परिणामस्वरूप आपको एक आभासी लॉरेल / आभासी उपहार प्रमाणपत्र मिलेगा जिसे आप अपने सोशल मीडिया खातों में साझा कर सकते हैं। इसके अलावा, आप महान स्वास्थ्य का आनंद लेंगे और आप संचारी रोगों से मुक्त होने की संभावना है\n",
  },
  {
    title: "4. क्या कोई संभावना है कि आप सरकारी अधिकारियों के साथ मेरा डेटा साझा करेंगे?\n",
    content: "नहीं। हम इस ऐप से किसी भी सरकारी अधिकारियों या निजी संस्थानों के साथ कोई व्यक्तिगत जानकारी साझा नहीं करते हैं। आपकी व्यक्तिगत जानकारी हमारे सर्वर में पर्याप्त सुरक्षा उपायों के साथ सुरक्षित रूप से संग्रहीत की जाएगी\n",
  },
  {
    title: "5. क्या आप मुझे ऐप इस्तेमाल करने के लिए चार्ज (उपयोग शुल्क) कर रहे हैं?\n",
    content: "नहीं। यह ऐप एंड्रॉइड और आईओएस दोनों प्लेटफार्मों में डाउनलोड करने के लिए स्वतंत्र है। कोई उपयोग शुल्क नहीं हैं\n",
  },
  {
    title: "6. ऐप का उपयोग करके मुझे क्या वित्तीय पुरस्कार मिलेगा?\n",
    content: "आपको ऐप का उपयोग करने के लिए केवल अंक और आभासी पुरस्कार मिलेंगे। आपको हमारे ऐप के उपयोग के लिए कोई भौतिक नकद या उत्पाद नहीं मिलेगा\n",
  },
  {
    title: "7. आप मुझे एक अधिसूचना क्यों भेजना चाहते हैं?\n",
    content: "हम आपको ऐप के विंडो के माध्यम से एक अधिसूचना भेजना चाहते हैं और एसएमएस के माध्यम से आपको ऐप के सवालों को पूरा करने और उन्हें ऐप पर अपलोड करने के लिए दैनिक याद दिलाने के लिए भी भेजते हैं। यह आपको एक अच्छी स्वच्छता दिनचर्या का अभ्यास करने और आपको स्वस्थ रहने में सक्षम करेगा\n",
  },
];

export default class PageFaqHindi extends Component {

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
            <BackButton backtext={"(बा. पू. प्र)   बार बार पूछे जाने वाले प्रश्न"}/>

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
