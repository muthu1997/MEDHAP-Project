import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageHowToUseThisAppTamil extends Component {

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
            <BackButton backtext={"இந்த செயலியை எவ்வாறு பயன்படுத்துவது?"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1.	MED-HAP செயலியின் பயனாளர்கள், செயலியைப் பதிவிறக்கி நிறுவிய பின், மொழி தேர்வுத் திரைக்கு அழைத்துச் செல்லப்படுவார்கள், அங்கு அவர்கள் செயலியைப் பயன்படுத்துவதற்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கலாம். பின் எப்போது வேண்டுமானாலும் மொழி விருப்பத்தை பயனாளர்களால் எந்த நேரத்திலும் மாற்றிக் கொள்ளலாம். {'\n'} </Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2.	அடுத்த கட்டத்தில், பயனாளர்கள் தங்கள் மொபைல் எண். மற்றும் உள்நுழைவு செயல்முறையைத் தொடங்கும்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3.	உள்நுழைவு செயல்முறையின் ஒரு பகுதியாக, பயனாளர்கள் கைபேசி எண்ணுக்கு அனுப்பப்பட்ட 4 இலக்க OTP வழியாக பயனாளர்கள் கணக்கு சரிபார்க்கப்படும். அடுத்தடுத்த பயன்பாட்டிற்கு, OTP தேவையில்லை.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4.	அடுத்த கட்டத்தில், ஒரு தனிப்பட்ட பயனாளர் உருவாக்கிய உள்நுழைவு  6 இலக்க பாதுகாப்பு  எண் உருவாக்கி, பின்பு இந்த செயலியை பயன்படுத்த உதவும். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5.	பதிவுசெய்த பிறகு, பயனாளரின் தனிப்பட்ட சுயவிவர வடிவம் திரையில் தோன்றும், இது பயனாளரால் பூர்த்தி செய்யப்பட்டு சேமிக்கப்பட வேண்டும். (தனிப்பட்ட சுயவிவரத்தை எந்த நேரத்திலும் பயனாளரால் புதுப்பிக்கலாம் அல்லது திருத்தலாம்).{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6.	பயனாளர் சுயவிவரத்தை உருவாக்கிய பிறகு, பயனாளர் முகப்பு பொத்தானை அழுத்த வேண்டும். இது 10 கேள்விகளின் தொகுப்பிற்கு அழைத்துச் செல்லும். ஒவ்வொரு நாளும் சுகாதார நடைமுறையை மதிப்பிடுவதற்கு கேள்வி எண் 1 முதல் 10 வரை பயனாளர் பொருந்தக்கூடிய வகையில் ‘ஆம்’ அல்லது ‘இல்லை’ என்பதைத் தேர்தெடுக்க வேண்டும்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}7.	கேள்வி எண்கள் 1 மற்றும் 2 இல் விவரிக்கப்பட்டுள்ள பணிகளைச் செய்யும்போது புகைப்படம் / செல்ஃபி எடுக்க பயனாளர் ஊக்குவிக்கப்படுகிறார்கள். ஒவ்வொரு கேள்விக்கும் பதிலளிப்பது தலா 1 புள்ளியைப் பெறுகிறது மற்றும் ஒரு  செல்ஃபி / புகைப்படத்தைப் பதிவேற்றுவது   2 புள்ளிகளைப் பெறுகிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8.	10 கேள்விகளின் தொகுப்பை முடித்த பிறகு, பயனாளர்கள் தங்கள் பதில்களை மதிப்பெண் முறைக்கு சமர்ப்பிக்க வேண்டும்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9.	அதைத் தொடர்ந்து, அவர்கள் பெற்ற மதிப்பெண்களை பார்வையிடலாம். இது பயனாளர்களால் பெறப்பட்ட  புள்ளிகளை தினசரி, வாராந்திர, மாதாந்திர மற்றும் ஆண்டு அடிப்படையில் காணலாம்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10.	ஆரோக்கியமான சுகாதாரத்திற்கு  குறைந்தபட்ச மதிப்பெண் 8 மற்றும் அதிகபட்ச மதிப்பெண் 16 ஆகும். பயனாளர் குறைந்தபட்சம் 8 புள்ளிகளைப் பெறும்போது, பயனாளர் மெய்நிகர் வெகுமதிக்கு தகுதியுடையவர்கள் ஆவார்கள்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11.	இந்த புள்ளிகள் நல்ல சுகாதார நடைமுறைகளுக்கான வெகுமதிகள். பரிந்துரைக்கப்பட்ட குறைந்தபட்ச மதிப்பெண் தொடர்ந்து அடையப்பட்டால், ஒரு மெய்நிகர் வெகுமதி தினசரி, வாராந்திர, மாதாந்திர மற்றும் ஆண்டு அடிப்படையில் திரையில் தோன்றும். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}12.	செயலியின்  கேள்விகளுக்கு பதிலளிக்கும் பணியை முடிக்க செயலி ஒவ்வொரு நாளும் இரவு 9 மணிக்கு பயனாளருக்கு அறிவிப்பு நினைவூட்டலை அனுப்புகிறது.{'\n'}</Text>
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
