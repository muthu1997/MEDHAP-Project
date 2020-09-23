import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageTermsAndConditionsTamil extends Component {

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
            <BackButton backtext={"விதிமுறைகளும் நிபந்தனைகளும்"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1.	ஒரு தனிநபரின்  சுகாதார நடைமுறைகளின் சுய தணிக்கை,விழிப்புணர்வு உருவாக்கம், சுகாதாரக் குறியீடுகளின் தொடர்ச்சியான பயிற்சி ஆகியவற்றிற்காக இந்த இலவச செயலி  தொடங்கப்பட்டிருக்கிறது.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2.	இந்த செயலி  எந்தவொரு இலாப நோக்கமும் இல்லாமல் செயல்படுத்தப்படுகிறது மற்றும் இதில் எந்த வடிவத்திலும் வணிக நோக்கம் இல்லை.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3.	இந்த செயலி 13 வயதுக்கு மேற்பட்ட அனைத்து தனிப்பட்ட பயனர்களுக்கும் வடிவமைக்கப்பட்டுள்ளது. 13 வயதிற்குட்பட்ட குழந்தைகள் பெற்றோரின் வழிகாட்டுதல் மற்றும் ஒப்புதலுடன் இந்த செயலியைப் பயன்படுத்தலாம். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4.	இந்த செயலியைப் பயன்படுத்த கட்டாய பதிவு மற்றும் பயனாளர் கைபேசி எண்ணுக்கு OTP மூலம் வழியாக பதிவுசெய்யப்பட்ட மொபைல் எண்ணை சரிபார்க்கப்படும். அடுத்தடுத்த பயன்பாட்டிற்கு, கடவுச்சொல் மட்டும் போதுமானது மற்றும் OTP தேவையில்லை.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5.	இந்த செயலியின் பயனாளர்   பெயர், பாலினம், வயது, மொபைல் எண், நகரம், மாநிலம் மற்றும் வசிக்கும்  நாடு போன்ற குறைந்தபட்ச கட்டாய தனிப்பட்ட தகவல்களை சேகரிக்கப்படும். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6.	அனைத்து பயனாளர்களின்   தரவும் கட்டாய ஃபயர்வால் அமைப்புடன் பிரத்யேக சேவையகத்தில் பாதுகாப்பாக சேமிக்கப்படுகிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}7.	இந்த செயலியானது  android மற்றும் iOS இயங்குதளங்களில்  தற்போது ஆங்கிலம், தமிழ் மற்றும் இந்தி ஆகிய மொழிகளில் இருக்கிறது. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8.	கை கழுவுதல் மற்றும் முகக்கவசம் அணிந்து  புகைப்படம் / செல்ஃபிக்களை அனுப்புவது, மதிப்பெண் அமைப்பில் கூடுதல் புள்ளிகள் பெற வழிவகுக்கும்.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9.	இந்த செயலியில்  உள்ள 10 சுகாதார குறியீடுகள் தொடர்பான கேள்விகளுக்கு பதிலளிக்க, தினமும் இரவு 9.00 மணிக்கு SMS  மூலம் நினைவூட்டல் செய்தி பயனாளிகளின் கைபேசி எண்ணுக்கு அனுப்பப்படும்.  {'\n'}{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10.	இந்த செயலியின்  பயனாளர்களுக்கு  தினசரி, வாராந்திர, மாதாந்திர மற்றும் வருடாந்திர அடிப்படையில் குறைந்தபட்சம் 50% (8 புள்ளிகள்) வெற்றிகரமாக பெற்றவர்களுக்கு  சாக்லேட்டுகள், மலர் பூங்கொத்துகள், நாணயங்கள்(மெய்நிகரி)  போன்றவை வழங்கப்படும். நிறுவனத்திலிருந்து வெகுமதிகள் தனிப்பட்ட செயலி பயனாளருக்கு  பணம் அல்லது  பரிசுப் பொருள்களை தருவதில்லை. பயனாளர்களின்  பெயருடன் “ஹைஜீன் மாஸ்டர்” என்று குறிப்பிடும் மெய்நிகர் சான்றிதழ் திரையில் தோன்றும், அவை சேமிக்கப்பட்டு, சமூக வலைத்தளங்களின் பெருமையுடன் பகிர்ந்து கொள்ளலாம். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11.	இந்த செயலியை  உருவாக்கியவர், டாக்டர் டி.எஸ். சந்திரசேகர், தலைமை ஜீரண நலத்துறை நிபுணர் மற்றும் தலைவர், மெடிந்தியா மருத்துவமனை  மற்றும் நிர்வாக அறங்காவலர், மெடிந்தியா அறக்கட்டளை, சென்னை. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}12.	இந்த செயலியை பயன்படுத்துவற்கு  விதிமுறைகள் மற்றும் நிபந்தனைகளையும்  மேலும்  இந்த செயலியை  எவ்வாறு பயன்படுத்துவது என்பதை முழுமையாகப் படிக்கவும். {'\n'}</Text>
                    </View>
                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}13.	இந்த செயலியின்  பயன்பாட்டிலிருந்து எழும் அனைத்து புகார் மற்றும் பிரச்சனைகள் அனைத்தும்,  சென்னை வரம்புக்கு உட்பட்ட , தமிழ்நாடு, இந்தியாவின் நீதிமன்றங்களை சார்ந்து இருக்கும். {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}14.	அனைத்து கேள்விகள் மற்றும் சந்தேகங்களுக்கு  medindiatrust@gmail.com என்ற மின்னஞ்சல் முகவரியை  தொடர்பு கொள்ளவும். {'\n'}{'\n'}{'\n'}{'\n'}</Text>
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
