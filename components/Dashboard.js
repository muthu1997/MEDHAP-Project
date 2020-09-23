import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, AsyncStorage, StyleSheet, Text, View, Image, StatusBar, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import AndroidBack from './AndroidBack';
import Header from './Header.js';
import Footer from './Footer.js';
import Questions from './Questions.js';
import Summary from './Summary.js';
import moment from 'moment';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = ((Dimensions.get('window').height / 100) * 35);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function Dashboard() {

  const [getserviceCheck, setserviceCheck] = useState(false);
  const [getbannerList, setbannerList] = useState('');
  const [getquestionList, setquestionList] = useState('');
  const [getquestionListItems, setquestionListItems] = useState('');
  const [getbdy, setbdy] = useState(null);
  const [getrender, setrender] = useState(2);
  const [getlanguageData, setlanguageData] = useState('');

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {

    //alert(Number(moment().format("D"))+1)
    //Notifications.cancelAllScheduledNotificationsAsync()
    //AsyncStorage.removeItem("notificationMain")
    notificationListenerFunction();
    getinifitaldataFunction();
    requestNotificationPermissionsAsync();
    AsyncStorage.getItem("language_Id")
      .then(data => {
        global.language = data === "ONE" ? "Some" : data === "TWO" ? "தாங்கள் Med-hap கேள்விகளுக்கு இன்று  பதிலளித்துவிட்டீர்களா ?" : "Have you completed answering Med-Hap questions?";
      })
    /* Get language variablec end */
  }, [])

  const getinifitaldataFunction = async () => {
    
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (getrender == 2) {
      await sendPushNotification();
    }
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL');
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');
    params.append('auth_id', AuthoKey);
    axios.post(baseURL + 'api/getAuthDetails', params)
      .then(response => {
        let resVal = response.data;
        // console.log(resVal);
        if (resVal.status == 'success') {
          if (resVal.data[0].profile_completed != 'Y') {
            // console.log("Dashboard");
            Actions.profileedit();
          }
        }
        if (resVal.task_status == 1) {
          setrender(1)
          global.getrender = 1;
        }else {
          global.getrender = 2;
        }
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

    /* Get language variables start */
    let language = await AsyncStorage.getItem('language');
    params.append('language', language);
    params.append('page_title', 'Dashboard');
    axios.post(baseURL + 'api/getLanguageVariable', params)
      .then(response => {
        setlanguageData(response.data.data);
        setserviceCheck(true);
        console.log(response.data.data)
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })
  }

  const notificationListenerFunction = () => {
    registerForPushNotificationsAsync().then(token => { setExpoPushToken(token); });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      var notdata = notification.request.content.data;

      AsyncStorage.setItem("notificationMain", JSON.stringify(notdata))
      // AsyncStorage.getItem('notificationMain')
      //   .then(data => {
      //     console.log(data)
      //     if (data) {
      //       var result = JSON.parse(data);
      //       //console.log(result)
      //       result.push(notdata);
      //       console.log(data)
      //       AsyncStorage.setItem("notificationMain", JSON.stringify(result))
      //     } else {
      //       var dummy = [];
      //       dummy.push(notdata);
      //       AsyncStorage.setItem("notificationMain", JSON.stringify(dummy))
      //     }
      //   })
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }



  const renderSubComp = () => {

    if (getrender == 1) {
      return <Summary />
      //return <Questions />
    } else if (getrender == 2) {
      return <Questions />
    }
  }

  if (getserviceCheck == false)
    return null;
  return (
    <View>
      <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position: 'relative' }} />
      <View style={styles.logoBox}>
        <View style={styles.topSpace}></View>
        <Header />
        <View style={styles.dashboardBox}>
          {renderSubComp()}
        </View>
        <Footer />
      </View>
      <AndroidBack />
    </View>
  );


}

async function requestNotificationPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


async function sendPushNotification() {

  var sendtoday = {
    hour: 21,
    minute: 0,
    repeats: true
  };
  var sendtomorrow = {
    hour: 21,
    minute: 0,
    //day:Number(moment().format("D"))+1,
    repeats: true
  };
  const trigerdata = global.getrender == 2 ? sendtoday : sendtomorrow;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Med Hap",
      body: global.language,
      ios: {
        sound: true
      },
      data: { message: global.language, title: "Med Hap" }
    },
    trigger: trigerdata,
  });
  

}

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    // paddingHorizontal:70,
    // backgroundColor:'#FFF',
    textAlign: 'center',
    flex: 5,
    flexDirection: 'column',
  },
  topSpace: {
    width: '100%',
    height: 20,
    backgroundColor: '#40408B',
  },
  topHeaderBox: {
    width: '100%',
    height: 50,
  },
  topHeader: {
    width: '100%',
    height: '100%',
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  topHeaderSec1: {
    width: '20%',
    alignItems: 'center',
    padding: 10,
  },
  topHeaderSec2: {
    width: '60%',
    alignItems: 'center',
    padding: 10,
  },
  topHeaderSec3: {
    width: '20%',
    alignItems: 'center',
    padding: 10,
  },
  topLogo: {
    width: 140,
    height: 35,
  },
  mapicon: {
    width: 30,
    height: 30,
  },
  carticon: {
    width: 30,
    height: 30,
  },
  dashboardBox: {
    // backgroundColor:'#FFF',
    height: '100%',
    // opacity:0.8,
  },
  carousel: {
    width: '100%',
  },
  centerMenuBox: {
    height: '50%',
  },
  centerMenuRow1: {
    width: '100%',
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#000',
    opacity: 0.8,
  },
  centerMenuRow2: {
    width: '100%',
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#000',
    opacity: 0.8,
  },
  centerMenuItem: {
    padding: '3%',
    paddingTop: '8%',
    width: '33.3%',
  },
  centerMenuIcons: {
    width: 40,
    height: 40,
    marginTop: '12%',
  },
  borderTop: {
    borderTopColor: '#6f6c5e',
    borderTopWidth: 0.3,
  },
  borderRight: {
    borderRightColor: '#6f6c5e',
    borderRightWidth: 0.3,
  },
  centerMenuText: {
    color: '#eee',
    fontSize: RFPercentage(2),
    marginTop: 3,
    textAlign: 'center',
  },
  questionBoxTitle: {
    fontSize: RFValue(18),
    color: '#333',
    padding: 5,
  },
});
