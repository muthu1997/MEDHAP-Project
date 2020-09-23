import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageWhyThisAppHindi extends Component {

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
            <BackButton backtext={"यह ऐप क्यों?"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}बढ़ती गतिशीलता और हवाई और समुद्री यात्रा के कारण, दुनिया भर में कहीं भी उत्पन्न होने वाले संक्रमण जंगल की आग की तरह पूरे विश्व में फैल गए, जिससे गंभीर मानवीय और आर्थिक नुकसान हुआ। अधिकांश संक्रमण या तो श्वसन पथ, जठरांत्र मार्ग या शारीरिक संपर्क से फैलते हैं। सरल स्वच्छता प्रथाओं और सामाजिक गड़बड़ी को देखते हुए, इस तरह की बीमारियों का एक बड़ा हिस्सा फैलने से रोका जा सकता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}दुर्भाग्यवश, संक्रमण फैलाने की संकट की अवधि के दौरान जनता द्वारा देखी जाने वाली स्वच्छंद व्यवहार, समय के साथ पतला हो जाता है और पूरी तरह से भूल जाता है जब तक कि एक और गंभीर संक्रमण हमारे दरवाजे पर दस्तक नहीं देता। इसलिए, लोगों की एक नई पीढ़ी के निर्माण की आवश्यकता है, जो नियमित रूप से रेजिमेंटेशन द्वारा एक आदत के रूप में स्वच्छता प्रथाओं का पालन करना जारी रखता है। हमारा ऐप, अर्थात्, मेड-एचएपी इस आवश्यकता को पूरा करता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}इस ऐप को उपयोगकर्ता द्वारा अभ्यास करने के लिए प्रेरित करने, स्व-याद दिलाने और स्व-उपचार के स्व-ऑडिटिंग के लिए विकसित किया गया है। 13 साल से ऊपर के लोग पूरी दुनिया में इस ऐप का इस्तेमाल कर सकते हैं। यदि हमारे ऐप में सभी सूचीबद्ध स्वच्छता मापदंडों का हर दिन ईमानदारी से अभ्यास किया जाता है, तो यह ऐप श्वसन और जठरांत्र मार्ग के माध्यम से फैलने वाले संक्रमण की गंभीरता को रोकने या कम करने की संभावना है। {'\n'}</Text>
                    </View>

                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}यह ऐप रिमाइंडर नोटिफिकेशन, स्कोरिंग सिस्टम, वर्चुअल रिवार्ड्स और सेल्फी अपलोडिंग के मामले में स्वच्छता पर उपलब्ध अन्य ऐप से अलग है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}इस ऐप के उपयोग क्या हैं {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}• जनता के लिए नियमित स्वच्छता अभ्यास का ज्ञान उपलब्ध कराया जाता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}• स्वच्छता के नियमित अभ्यास के लिए जनता को प्रेरित करता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}• स्वच्छता प्रथाओं पर जनता के लिए एक स्व-लेखा परीक्षा उपकरण के रूप में कार्य करता है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}• प्रतिदिन स्वच्छता प्रथाओं को ले जाने के लिए अंतर्निहित अनुस्मारक अधिसूचना उपकरण। {'\n'}{'\n'}{'\n'}</Text>
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
