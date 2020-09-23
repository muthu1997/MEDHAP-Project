import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageWhyThisAppTamil extends Component {

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
               <BackButton backtext={"இந்த செயலியை ஏன் பயன்படுத்த வேண்டும்?"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}அதிகரித்த வான் மற்றும்  கடல் பயணம் காரணமாக, உலகில் எந்த மூலையிலும் தோன்றும் நோய்த்தொற்றுகள் உலகிலுள்ள மற்ற பிற பகுதிகளுக்கு காட்டுத்தீ போல் பரவி கடுமையான மனித மற்றும் பொருளாதார இழப்பை ஏற்படுத்துகின்றன. பெரும்பாலான நோய்த்தொற்றுகள் சுவாசக்குழாய், இரைப்பை குடல் பாதை அல்லது உடல் தொடர்பு மூலம் பரவுகின்றன. எளிமையான சுகாதாரமான நடைமுறைகள் மற்றும் சமூக தொலைதூரங்களைக் கடைபிடிப்பதன்  மூலம், இதுபோன்ற நோய்கள் பெருமளவில் பரவுவதைத் தடுக்கலாம்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}துரதிர்ஷ்டவசமாக, தொற்றுநோய் பரவும்  நெருக்கடி காலத்தில் பொதுமக்களால் கடைபிடிக்கப்படும்  சுகாதாரமான நடைமுறைகள், காலப்போக்கில் மறந்து  போகும், மற்றொரு கடுமையான தொற்று நம் வீட்டு வாசல் கதவை  தட்டும் வரை முற்றிலும் மறந்து விடுவோம். எனவே, ஒரு புதிய தலைமுறை மக்களை உருவாக்க வேண்டிய அவசியம் உள்ளது. இது பேரிடர் காலத்தில் மட்டும் கையாளும் ஒரு  ஒழுக்கமான பழக்க வழக்கமாக மாறி எல்லோரும் சுகாதார நடைமுறைகளை தொடர்ந்து பின்பற்ற எங்கள் செயலி அதாவது, MED-HAP இந்த தேவையை பூர்த்தி செய்கிறது.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}பயனாளர்களால்  நடைமுறைப்படுத்தப்படும் சுகாதாரமான நடவடிக்கைகளை ஊக்குவித்தல், சுய நினைவூட்டல் மற்றும் சுய தணிக்கை செய்வதற்காக இந்த செயலி  உருவாக்கப்பட்டுள்ளது. உலகெங்கிலும் உள்ளவர்கள், 13 வயதுக்கு மேற்பட்டவர்கள் இந்த செயலியைப் பயன்படுத்தலாம். எங்கள் செயலியில் பட்டியலிடப்பட்ட அனைத்து சுகாதார  நடைமுறைகளை பின்பற்றினாலே,  சுவாச மற்றும் இரைப்பை குடல் பாதை வழியாக பரவும் நோய்த்தொற்றுகளின் தீவிரத்தின் தாக்கத்தை தடுக்க அல்லது குறைக்க வாய்ப்புள்ளது.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}இந்த செயலியானது நினைவூட்டல் அறிவிப்பு, மதிப்பெண் அமைப்பு, மெய்நிகர் வெகுமதிகள் மற்றும் புகைப்படம் / செல்ஃபி பதிவேற்றம் ஆகியவற்றின் அடிப்படையில் மற்ற   சுகாதார செயலிகளிலிருந்து வேறுபடுகிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}இந்த செயலியின்  பயன்கள் என்னன்ன ? {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}•	பொதுமக்களுக்கு வழக்கமான சுகாதார நடைமுறை பற்றிய அறிவு கிடைக்கிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}•	வழக்கமாக சுகாதாரத்தை கடைப்பிடிக்க பொதுமக்களை ஊக்குவிக்கிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}•	சுகாதார நடைமுறைகள் குறித்து பொதுமக்களுக்கு சுய தணிக்கை செயலியாக  செயல்படுகிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}•	ஒவ்வொரு நாளும் சுகாதார நடைமுறைகளைக்  கடைபிடிக்க  நினைவூட்டல் அறிவிப்பு செயலியில் SMS ஆக வருகிறது.{'\n'}{'\n'}{'\n'}</Text>
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
