import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class PageHowToUseThisAppEnglish extends Component {

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
            <BackButton backtext={"How to use this app?"}/>
               <ScrollView  style={styles.containerBox}>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\n'}{'\t'}1.	The users of the MED-HAP app, upon downloading and installing the app, will be led to the language selection screen, where they will select their preferred language for using the app. The language preference can be changed by the user at any time.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}2.	In the next step, the users will enter their mobile no. and start the login process.{'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}3.	As part of the login process, user verification via a 4 digit OTP sent to the users number, which needs to be entered by the user. For subsequent use, OTP is not necessary. {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}4.	In the next step, Login Authentication through a unique user generated 6 digit security PIN Number is carried out. The generation of the PIN number is a one-time process. This completes the mandatory user registration process.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}5.	After registration, a personal profile form of the user will appear on the screen, which needs to be completed by the user. (Personal profile can be updated or edited by the user at any time) {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}6.	After user profile creation, users need to press the home button. This will take them to the set of 10 questions which will appear for the user to answer every day. The user selects ‘Yes’ or ‘No’ as applicable, for Question Nos. 1 through 10 for assessing every day hygiene practice. {'\n'}</Text>
                    </View>
                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}(For better understanding of the question / parameters, the user is directed to the “Information” section icon at the bottom of the home page) {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}7.	Users are encouraged to take a photo / selfie while performing the tasks detailed in question numbers 1 and 2. Answering each question fetches 1 point each and uploading a photo / selfie fetches 2 points.  {'\n'}</Text>
                    </View>
                    
                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}8.	After completing the set of 10 questions, users need to submit their answers to the scoring system.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}9.	Subsequently, they need to visit the Score Board, which will display the points secured by the users on a daily, weekly, monthly and yearly basis.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}10.	The minimum score conforming to a healthy hygiene is 8 and the maximum score is 16.  When the user scores a minimum of 8 points, the users will be eligible for a virtual reward.  {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'}11.	These points are rewards for good hygiene practices. A virtual reward will appear as a pop up daily, weekly, monthly and on yearly basis, if the prescribed minimum score is consistently achieved.   {'\n'}</Text>
                    </View>

                    <View style={styles.aboutTextParent}>
                    <Text style={styles.aboutText}>{'\t'} 12.	The App sends a notification reminder to the user every day at 9 PM to complete the task of answering the app questions. {'\n'}{'\n'}{'\n'}</Text>
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
