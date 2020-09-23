import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageTermsAndConditionsEnglish extends Component {

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
            <BackButton backtext={"Terms & Conditions"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1.	This free app has been launched for awareness creation, continuing practice of hygiene indices and self auditing of one’s hygiene practices. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2.	This app has been prepared and exercised with no profit intention and has no commercial perspective in any form.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3.	The app is intended for all individual users above the age of 13 years. Children below the age of 13 years may use this app with parental guidance and approval. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4.	Usage of the app is through a mandatory registration and user verification via OTP to a registered mobile number. For subsequent use, password alone is enough and OTP is not necessary.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5.	The app shall collect minimum mandatory personal information such as user name, gender, age, mobile no, city, state and country of domicile.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6.	All user data is securely stored in a dedicated server with mandatory firewall system.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}7.	This app is available in both Android and iOS platforms in multi- lingual format, currently in English, Tamil and Hindi.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8.	The app prefers photo / selfies for hand wash and face mask parameters only and to upload them on a daily basis for additional points in the scoring system. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9.	The app shall notify the user with a reminder through a SMS at 9.00 PM daily to answer questions related to 10 Hygiene indices in the app. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10.	The app users will be awarded virtually chocolates, flower bouquets, coins etc. for successfully scoring minimum 50% (8 points) on daily, weekly, monthly and yearly basis. The rewards do not involve any transfer of money or physical gifts from the company to the individual app user. A virtual certificate mentioning “HYGIENE MASTER” with the user’s name will appear on the screen which can be saved and displayed proudly.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11.	This app has been conceptualized by Dr. T.S. Chandrasekar, Chairman & Chief Gastroenterologist, MedIndia Hospitals, Chennai and Founder & Managing Trustee, MedIndia Charitable Trust, a sister institution and created with his inputs. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}12.	Please read thoroughly the disclaimer, terms and conditions and ’how to use this app before registering the app.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}13.	For all disputes arising out of the use of the app, jurisdiction shall be the courts of Chennai, Tamil Nadu, India.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}14.	All enquiries and clarifications may be addressed to medindiatrust@gmail.com {'\n'}{'\n'}{'\n'}</Text>
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
