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
            <BackButton backtext={"மறுப்பு"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1.	‘MED-HAP செயலி அல்லது இந்த செயலியின் எந்தப் பக்கத்தையும் பதிவிறக்குவதோ அல்லது பயன்படுத்துவதோ முற்றிலும் தவறானது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2.	எங்கள் செயலியின் பயனாளர்களுக்கு வசதியாக வழங்கப்பட்ட அனைத்து தரவு, தகவல், உரை, கிராபிக்ஸ், இணைப்புகள் மற்றும் பிற பொருட்கள் உள்ளிட்ட இந்த செயலியின் உள்ளடக்கங்கள் தகவல் நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3.	இந்த செயலியில் வழங்கப்பட்ட தகவல்களின் அடிப்படையில் மட்டுமே பயனாளர்கள் தாமாக எடுக்கும் சிகிச்சை முடிவுகளுக்கு நாங்கள் பொறுப்பேற்க மாட்டோம். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4.	இது முற்றிலும் ஒரு சுய உதவி செயலியாகும், இது சில அடிப்படை சுகாதார நடைமுறைகளை கடைபிடிப்பதன் மூலம் தொற்றுநோய்களைத் தடுக்க பயனாளர்களுக்கு உதவுவதை நோக்கமாகக் கொண்டுள்ளது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5.	இந்த செயலியானது  நோய் அல்லது பிற நிலைமைகளைக் கண்டறியவோ அல்லது நோய்களைத் தடுப்பதையோ, சிகிச்சை அழிப்பதற்கோ  அல்லது குணப்படுத்துவதற்கோ  பயன்படுத்தப்படுவதல்ல. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6. இந்த செயலியின்  பயனாளர்கள் தங்கள் மருத்துவ தேவைகளுக்காக தங்கள் மருத்துவரை தொடர்பு கொள்ள வேண்டும். {'\n'}{'\n'}</Text>
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
