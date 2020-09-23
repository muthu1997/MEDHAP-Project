import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageTermsAndConditionsHindi extends Component {

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
            <BackButton backtext={"नियम एवं शर्तें"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1. यह नि: शुल्क ऐप जागरूकता सृजन, स्वच्छता सूचकांकों के निरंतर अभ्यास और एक स्वच्छता प्रथाओं के आत्म-परीक्षण के लिए लॉन्च किया गया है।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2. यह ऐप बिना किसी लाभ के इरादे से तैयार किया गया है और इसका किसी भी रूप में कोई व्यावसायिक परिप्रेक्ष्य नहीं है।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3. ऐप 13 वर्ष से अधिक आयु के सभी व्यक्तिगत उपयोगकर्ताओं के लिए है। 13 वर्ष से कम उम्र के बच्चे माता-पिता के मार्गदर्शन और अनुमोदन के साथ इस ऐप का उपयोग कर सकते हैं।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4. ऐप का उपयोग एक अनिवार्य पंजीकरण और उपयोगकर्ता सत्यापन के माध्यम से ओटीपी के माध्यम से एक पंजीकृत मोबाइल नंबर पर करना है। बाद के उपयोग के लिए, अकेले पासवर्ड पर्याप्त है और ओटीपी आवश्यक नहीं है।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5. ऐप उपयोगकर्ता के नाम, लिंग, आयु, मोबाइल नंबर, शहर, राज्य और अधिवास के देश जैसी न्यूनतम अनिवार्य व्यक्तिगत जानकारी एकत्र करेगा।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6. सभी उपयोगकर्ता डेटा को सुरक्षित रूप से अनिवार्य फ़ायरवॉल सिस्टम के साथ एक समर्पित सर्वर में संग्रहीत किया जाता है।{'\n'} </Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}7. यह ऐप एंड्रॉइड और आईओएस दोनों प्लेटफार्मों में बहुभाषी प्रारूप में उपलब्ध है, वर्तमान में अंग्रेजी, तमिल और हिंदी में। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8. ऐप केवल हाथ धोने और फेस मास्क मापदंडों के लिए फोटो / सेल्फी लेना पसंद करता है और स्कैड सिस्टम में अतिरिक्त बिंदुओं के लिए दैनिक आधार पर उन्हें अपलोड करता है।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9. एप्लिकेशन को ऐप में 10 हाइजीन सूचकांकों से संबंधित सवालों का जवाब देने के लिए प्रतिदिन सुबह 9.00 बजे एसएमएस के माध्यम से उपयोगकर्ता को एक अनुस्मारक के साथ सूचित किया जाएगा। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10. ऐप उपयोगकर्ताओं को दैनिक, साप्ताहिक, मासिक और वार्षिक आधार पर न्यूनतम 50% (8 अंक) स्कोर करने के लिए वस्तुतः चॉकलेट, फूलों के गुलदस्ते, सिक्के आदि से सम्मानित किया जाएगा। पुरस्कारों में कंपनी के व्यक्तिगत ऐप उपयोगकर्ता के लिए धन या भौतिक उपहारों का कोई हस्तांतरण शामिल नहीं है। उपयोगकर्ता के नाम के साथ "HYGIENE MASTER" का उल्लेख करने वाला एक आभासी प्रमाणपत्र स्क्रीन पर दिखाई देगा जिसे सहेजा जा सकता है और गर्व से प्रदर्शित किया जा सकता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11. इस ऐप की अवधारणा डॉ। टी.एस. चंद्रशेखर, अध्यक्ष और मुख्य गैस्ट्रोएंटेरोलॉजिस्ट, मेडइंडिया अस्पताल, चेन्नई और संस्थापक और प्रबंध ट्रस्टी, मेडइंडिया चैरिटेबल ट्रस्ट, एक बहन संस्था है और अपने इनपुट के साथ बनाया गया है।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}12. कृपया अस्वीकरण, नियमों और शर्तों को अच्छी तरह से पढ़ें और 'ऐप को पंजीकृत करने से पहले इस ऐप का उपयोग कैसे करें।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}13. ऐप के उपयोग से उत्पन्न सभी विवादों के लिए, क्षेत्राधिकार चेन्नई, तमिलनाडु, भारत की अदालतें होंगी।{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}14. सभी जांच और स्पष्टीकरण medindiatrust@gmail.com पर संबोधित किए जा सकते हैं{'\n'}{'\n'}{'\n'}</Text>
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
