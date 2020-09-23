import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, Platform, AlertIOS, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Actions } from 'react-native-router-flux';
import BackButton from './BackButton.js';
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import AwesomeButton from "react-native-really-awesome-button";
import Toast from 'react-native-simple-toast';
import OtpInputs from 'react-native-otp-inputs';

console.disableYellowBox = true;

export default class LoginPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      country_code: '',
      otpCode: '',
      isButtonDisabled: true,
      serviceCheck: false,
      languageData: '',
      invalidotpcount: 0,
      btntxt: '',

      password: null
    }

    AsyncStorage.getItem("language_Id")
      .then(data => {
        //alert(data)
        if (data) {
          this.setState({
            btntxt: data === "ONE" ? "सत्यापित करें" : data === "TWO" ? "சரிபார்க்கவும்" : "Verify"
          }, async function () {
            Notifications.cancelAllScheduledNotificationsAsync();
            await this.sendPushNotification();

          })
        }
      })

  }

  async componentDidMount() {
    /* Get language variables start */
    let baseURL = await AsyncStorage.getItem('baseURL');
    let language = await AsyncStorage.getItem('language');
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('page_title', 'PIN_Verification');
    axios.post(baseURL + 'api/getLanguageVariable', params)
      .then(response => {
        this.setState({ languageData: response.data.data });
        this.setState({ serviceCheck: true });
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })
    /* Get language variables end */
  }

  async componentWillMount() {
    let mobile_number = await AsyncStorage.getItem('mobile_number');
    let country_code = await AsyncStorage.getItem('country_code');
    this.setState({ TextInputValue: mobile_number, country_code: country_code });
    // Toast.show(this.state.languageData['otp_send_successfully'], Toast.LONG, Toast.TOP);
  }

  ennableResend = async () => {
    this.setState({ isButtonDisabled: false });
  }

  resendOTP = async () => {

    let mobile_number = await AsyncStorage.getItem('mobile_number');
    let country_code = await AsyncStorage.getItem('country_code');

    console.log(mobile_number + '#' + country_code);
    const params = new URLSearchParams();
    params.append('mobile_number', mobile_number);
    params.append('country_code', country_code);
    let baseURL = await AsyncStorage.getItem('baseURL');
    axios.post(baseURL + 'api/forgotPIN', params)
      .then(response => {
        let resVal = response.data;
        console.log(resVal);
        // Toast.show(this.state.languageData['otp_re_send_successfully'], Toast.LONG, Toast.TOP);
        Actions.loginotp();
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

  }

  verifyPin = async () => {
    let otpCode = this.state.password;
    if (Platform.OS === 'android') {
      Toast.show(this.state.languageData['Verifying_Security_PIN'], Toast.LONG, Toast.TOP);
    } else {
      AlertIOS.alert(this.state.languageData['Verifying_Security_PIN']);
    }
    // console.log(otpCode);
    let mobile_number = await AsyncStorage.getItem('mobile_number');
    let country_code = await AsyncStorage.getItem('country_code');
    let DeviceId = await AsyncStorage.getItem('DeviceId');
    const params = new URLSearchParams();
    params.append('mobile_number', mobile_number);
    params.append('country_code', country_code);
    params.append('device_id', DeviceId);
    params.append('otp', otpCode);
    let baseURL = await AsyncStorage.getItem('baseURL');
    axios.post(baseURL + 'api/verifyPIN', params)
      .then(response => {
        let resVal = response.data;
        if (resVal.status == 'success') {
          if (Platform.OS === 'android') {
            Toast.show(this.state.languageData['PIN_Verified_Successfully'], Toast.LONG, Toast.TOP);
          } else {
            AlertIOS.alert(this.state.languageData['PIN_Verified_Successfully']);
          }
          AsyncStorage.setItem('AuthoKey', resVal.user_id);
          Actions.dashboard();
        } else {
          let invalCount = this.state.invalidotpcount + 1;
          if (invalCount == 3) {
            if (Platform.OS === 'android') {

              Toast.show(this.state.languageData['Max_limit_reached'], Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert(this.state.languageData['Max_limit_reached']);
            }

            setTimeout(
              function () {
                Actions.language();
              }
                .bind(this),
              3000
            );
          } else {
            this.setState({ invalidotpcount: invalCount });
            if (Platform.OS === 'android') {

              Toast.show(this.state.languageData['Invalid_Security_PIN'], Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert(this.state.languageData['Invalid_Security_PIN']);
            }
            Actions.loginpassword();
          }
        }

      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

  }

  render() {
    const { TextInputValue, country_code } = this.state;
    if (this.state.serviceCheck == false)
      return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position: 'relative' }} />

        <View style={styles.logoBoxMain}>

          <View style={styles.topSpace}></View>
          <BackButton backtext={this.state.languageData['Authentication']} />


          <View style={styles.logoBox}>

            <View style={styles.containerBox}>
              <Text style={[styles.loginText, styles.loginTextParent, styles.marginBottom20]}>{this.state.languageData['Login_Authentication']}</Text>

              <Image source={require('../assets/icons/password.png')} style={styles.telephoneIcon} />

              <Text style={[styles.loginTextSmall, styles.marginBottom20]}>{this.state.languageData['Please_pin']},{this.state.password}</Text>
              <Text style={styles.loginText}>{country_code} {TextInputValue}</Text>

              <View>


                <OtpInputs
                  handleChange={(code) => this.setState({ password: code })}
                  numberOfInputs={6}
                  focusedBorderColor="#000"
                  secureTextEntry={true}
                  style={{ width: '100%', height: 50, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around', marginVertical: 15 }}
                  inputContainerStyles={{ borderRadius: 5, borderWidth: 2, width: 40, height: '90%', borderColor: '#FFFF', alignItems: 'center', justifyContent: 'center', paddingLeft: 5, fontSize: 18 }}
                />

                <AwesomeButton
                  style={styles.resendOTP}
                  backgroundColor="#40408B"
                  activityColor="#FFF"
                  backgroundDarker="#7979B9"
                  backgroundPlaceholder="orange"
                  backgroundProgress="#7979B9"
                  activeOpacity={0.5}
                  borderRadius={10}
                  width={200}
                  height={50}
                  textColor="#FFFFFF"
                  activeOpacity={1}
                  progress
                  raiseLevel={4}
                  onPress={() => {
                    this.verifyPin()
                  }}>
                  <Text style={styles.resendOTPText}> {this.state.btntxt} </Text>
                </AwesomeButton>

                <View style={{ width: 50, height: 40 }} />

                <View style={styles.otpActionBox}>

                  <AwesomeButton
                    style={styles.resendOTP}
                    backgroundColor="#40408B"
                    activityColor="#FFF"
                    backgroundDarker="#7979B9"
                    backgroundPlaceholder="orange"
                    backgroundProgress="#7979B9"
                    activeOpacity={0.5}
                    borderRadius={10}
                    width={200}
                    height={50}
                    textColor="#FFFFFF"
                    activeOpacity={1}
                    progress
                    raiseLevel={4}
                    onPress={next => {
                      this.resendOTP();
                      next();
                    }}
                  >
                    <Text style={styles.resendOTPText}> {this.state.languageData['Forgot_Security_Pin']} </Text>
                  </AwesomeButton>

                </View>


              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resendOTP: {
    // borderColor:'#40408B',
    // borderWidth:1,
    // backgroundColor:'#40408B',
    // width:'50%',
    // height:40,
    // borderRadius:10,
    alignSelf: 'center',
  },
  topSpace: {
    width: '100%',
    height: 25,
    backgroundColor: '#40408B',
  },
  telephoneIcon: {
    width: 50,
    height: 60,
    alignSelf: "center",
    margin: 10,
  },
  resendOTPText: {
    fontSize: 16,
    padding: 5,
    color: '#FFF',
    textAlign: 'center',
  },
  resendOTPBox: {
    width: '100%',
    flex: 2,
    flexDirection: 'row',
  },
  resendOTPBoxLeft: {
    width: '70%',
  },
  resendOTPBoxRight: {
    width: '30%',
  },
  resendOTPText1: {
    fontSize: 18,
    padding: 5,
    color: '#FFF',
    textAlign: 'right'
  },
  resendOTPText2: {
    fontSize: 18,
    padding: 5,
    color: '#FFF',
    textAlign: 'left',
  },
  otpActionBox: {
    height: 50,
    width: '100%',
  },
  logoBoxMain: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    flex: 2,
    flexDirection: 'column',
  },
  logoBox: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    flex: 1,
    // backgroundColor:'#FFF',
  },
  containerBox: {
    // marginTop:'1%',
    paddingHorizontal: 20,
  },
  loginTextParent: {
    marginTop: 20,
  },
  topLogo: {
    width: 250,
    height: 60,
    alignSelf: 'center',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  loginText: {
    color: '#333',
    fontSize: 24,
    textAlign: 'center',
  },
  loginTextSmall: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  mobileBox: {
    marginTop: 50,
    height: 50,
    fontSize: 24,
    padding: 5,
    textAlign: 'center',
    borderColor: '#333',
    backgroundColor: '#333',
    borderWidth: 1,
    width: '100%',
  },
  loginButton: {
    height: 'auto',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#333',
    borderWidth: 1,
  },
  loginButtonImage: {
    width: '100%',
  },
  borderStyleBase: {
    width: '20%',
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    color: '#333',
    padding: 10,
    fontSize: 20,
    backgroundColor: '#FFF',
  },

  underlineStyleHighLighted: {
    borderColor: "#333",
  },
});
