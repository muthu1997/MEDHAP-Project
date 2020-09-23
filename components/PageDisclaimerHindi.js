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
            <BackButton backtext={"अस्वीकरण:/ तरदीद"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1. मेड-एचएपी ऐप या इस ऐप के किसी भी पृष्ठ को डाउनलोड, एक्सेस या उपयोग करके, आप इस अस्वीकरण के लिए अपनी सहमति व्यक्त करते हैं। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2. इस ऐप की सामग्री जिसमें बिना किसी सीमा के सभी डेटा, सूचना, पाठ, ग्राफिक्स, लिंक और अन्य सामग्रियां शामिल हैं, जो हमारे ऐप उपयोगकर्ताओं को एक सुविधा के रूप में प्रदान की जाती हैं और केवल सूचना के उद्देश्यों के लिए उपयोग की जाती हैं {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3. हम केवल इस ऐप में दी गई जानकारी के आधार पर उपयोगकर्ता द्वारा लिए गए निर्णयों की जिम्मेदारी नहीं लेते हैं। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4. यह विशुद्ध रूप से एक सेल्फ-हेल्प ऐप है जिसका उद्देश्य उपयोगकर्ता को कुछ बुनियादी हाइजीनिक प्रथाओं का पालन करके संक्रमणों को रोकने में मदद करना है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5. यह विशुद्ध रूप से एक सेल्फ-हेल्प ऐप है जिसका उद्देश्य उपयोगकर्ता को कुछ बुनियादी हाइजीनिक प्रथाओं का पालन करके संक्रमणों को रोकने में मदद करना है। {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6. इस ऐप के उपयोगकर्ता अपनी चिकित्सा आवश्यकताओं के लिए अपने चिकित्सक से संपर्क करें। {'\n'}{'\n'}{'\n'}</Text>
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
