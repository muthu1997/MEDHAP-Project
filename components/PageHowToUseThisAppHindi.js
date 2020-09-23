import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageHowToUseThisAppHindi extends Component {

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
            <BackButton backtext={"इस ऐप का उपयोग कैसे करें?"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1. मेड-एचएपी ऐप के उपयोगकर्ता, ऐप डाउनलोड करने और इंस्टॉल करने के बाद, भाषा चयन स्क्रीन पर ले जाएंगे, जहां वे ऐप का उपयोग करने के लिए अपनी पसंदीदा भाषा का चयन करेंगे। उपयोगकर्ता द्वारा किसी भी समय भाषा की प्राथमिकता को बदला जा सकता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2. अगले चरण में, उपयोगकर्ता अपना मोबाइल नंबर दर्ज करेंगे। और लॉगिन प्रक्रिया शुरू करें। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3. लॉगिन प्रक्रिया के हिस्से के रूप में, उपयोगकर्ता संख्या के लिए भेजे गए 4 अंकों के ओटीपी के माध्यम से उपयोगकर्ता सत्यापन, जिसे उपयोगकर्ता द्वारा दर्ज करने की आवश्यकता होती है। बाद के उपयोग के लिए, ओटीपी आवश्यक नहीं है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4. अगले चरण में, एक अद्वितीय उपयोगकर्ता के माध्यम से लॉगिन प्रमाणीकरण जेनरेट किया गया 6 अंकों का सुरक्षा पिन नंबर। पिन नंबर की पीढ़ी एक बार की प्रक्रिया है। यह अनिवार्य उपयोगकर्ता पंजीकरण प्रक्रिया को पूरा करता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5. पंजीकरण के बाद, उपयोगकर्ता का एक व्यक्तिगत प्रोफ़ाइल फ़ॉर्म स्क्रीन पर दिखाई देगा, जिसे उपयोगकर्ता द्वारा पूरा करने की आवश्यकता है। (व्यक्तिगत प्रोफ़ाइल को किसी भी समय उपयोगकर्ता द्वारा अपडेट या संपादित किया जा सकता है) {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6. उपयोगकर्ता प्रोफ़ाइल निर्माण के बाद, उपयोगकर्ताओं को होम बटन दबाने की जरूरत है। यह उन्हें 10 प्रश्नों के सेट पर ले जाएगा जो उपयोगकर्ता को हर दिन जवाब देने के लिए दिखाई देंगे। प्रत्येक दिन स्वच्छता अभ्यास का आकलन करने के लिए उपयोगकर्ता प्रश्न 10 के माध्यम से प्रश्न 1 के लिए 'हां' या 'नहीं' का चयन करता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}(प्रश्न / मापदंडों की बेहतर समझ के लिए, उपयोगकर्ता को होम पेज के नीचे "सूचना" अनुभाग आइकन के लिए निर्देशित किया गया है)। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} 7. उपयोगकर्ताओं को प्रश्न संख्या 1 और 2 में विस्तृत कार्यों को करते हुए एक फोटो / सेल्फी लेने के लिए प्रोत्साहित किया जाता है। प्रत्येक प्रश्न का उत्तर देने पर 1 अंक मिलता है और एक फोटो / सेल्फी 2 अंक अपलोड करता है।  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8. 10 प्रश्नों के सेट को पूरा करने के बाद, उपयोगकर्ताओं को स्कोरिंग सिस्टम पर अपना जवाब प्रस्तुत करना होगा। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9. इसके बाद, उन्हें स्कोर बोर्ड का दौरा करने की आवश्यकता है, जो उपयोगकर्ताओं द्वारा दैनिक, साप्ताहिक, मासिक और वार्षिक आधार पर सुरक्षित किए गए बिंदुओं को प्रदर्शित करेगा। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10. स्वस्थ स्वच्छता के अनुरूप न्यूनतम स्कोर 8 है और अधिकतम स्कोर 16 है। जब उपयोगकर्ता न्यूनतम 8 अंक प्राप्त करता है, तो उपयोगकर्ता एक आभासी इनाम के लिए पात्र होंगे। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11. ये बिंदु अच्छी स्वच्छता प्रथाओं के लिए पुरस्कार हैं। एक आभासी इनाम दैनिक, साप्ताहिक, मासिक और वार्षिक आधार पर पॉप के रूप में दिखाई देगा, यदि निर्धारित न्यूनतम स्कोर लगातार हासिल किया जाता है। {'\n'}</Text>
                    </View>
                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11. ये बिंदु अच्छी स्वच्छता प्रथाओं के लिए पुरस्कार हैं। एक आभासी इनाम दैनिक, साप्ताहिक, मासिक और वार्षिक आधार पर पॉप के रूप में दिखाई देगा, यदि निर्धारित न्यूनतम स्कोर लगातार हासिल किया जाता है। {'\n'}{'\n'}</Text>
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
