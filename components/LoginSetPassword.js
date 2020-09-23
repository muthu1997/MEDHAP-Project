import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, Platform, AlertIOS, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Actions } from 'react-native-router-flux';
import BackButton from './LoginBackButton.js';
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import AwesomeButton from "react-native-really-awesome-button";
import Toast from 'react-native-simple-toast';
import OtpInputs from 'react-native-otp-inputs';

console.disableYellowBox = true;

export default class LoginSetPassword extends Component {

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
      securityPin: '',
      confirmsecurityPin: '',
    }
  }

  async componentDidMount() {
    /* Get language variables start */
    let baseURL = await AsyncStorage.getItem('baseURL');
    let language = await AsyncStorage.getItem('language');
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('page_title', 'Set_PIN_Verification');
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
    // Toast.showWithGravity(this.state.languageData['otp_send_successfully'], Toast.LONG, Toast.TOP);
  }

  setSecurityPin = async () => {
    const { securityPin, confirmsecurityPin } = this.state;

    if (securityPin != '') {

      let mobile_number = await AsyncStorage.getItem('mobile_number');
      let country_code = await AsyncStorage.getItem('country_code');
      const params = new URLSearchParams();
      params.append('mobile_number', mobile_number);
      params.append('country_code', country_code);
      params.append('otp', securityPin);
      let baseURL = await AsyncStorage.getItem('baseURL');
      axios.post(baseURL + 'api/setSecurityPin', params)
        .then(response => {
          let resVal = response.data;
          // console.log(resVal);
          if (resVal.status == 'success') {
            if (Platform.OS === 'android') {

              Toast.showWithGravity(this.state.languageData['Security_PIN_Success'], Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert(this.state.languageData['Security_PIN_Success']);
            }
            AsyncStorage.setItem('AuthoKey', resVal.user_id);
            Actions.dashboard();
          } else {
            this.setState({ invalidotpcount: invalCount });
            if (Platform.OS === 'android') {

              Toast.showWithGravity(this.state.languageData['Invalid_Inputs'], Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert(this.state.languageData['Invalid_Inputs']);
            }
          }

        })
        .catch(errorMsg => {
          console.log(errorMsg);
        })

    } else {
      if (Platform.OS === 'android') {

        Toast.showWithGravity(this.state.languageData['Invalid_Inputs'], Toast.LONG, Toast.TOP);
      } else {
        AlertIOS.alert(this.state.languageData['Invalid_Inputs']);
      }
    }
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
              <Text style={[styles.loginText, styles.loginTextParent, styles.marginBottom20]}>{this.state.languageData['Set_Authentication_PIN']}{'\n'}</Text>

              <Image source={require('../assets/icons/password.png')} style={styles.telephoneIcon} />

              <Text style={[styles.loginTextSmall, styles.marginBottom20]}>{this.state.languageData['Set_your_pin']}{'\n'}</Text>
              {/* <Text style={styles.loginText}>{country_code} {TextInputValue}</Text> */}

              <View>
                {/* <Text style={styles.securityPINText}>{this.state.languageData['Security_PIN']}</Text> */}
                {/* <OTPInputView
                  style={{ width: '100%', height: 100 }}
                  pinCount={6}
                  autoFocusOnLoad
                  secureTextEntry
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={otpCode => this.setState({ securityPin: otpCode })}
                /> */}

                <OtpInputs
                  handleChange={(code) => this.setState({ securityPin: code })}
                  numberOfInputs={6}
                  focusedBorderColor="#000"
                  secureTextEntry={true}
                  style={{ width: '100%', height: 50, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around', marginVertical: 15 }}
                  inputContainerStyles={{ borderRadius: 5, borderWidth: 2, width: 40, height: '90%', borderColor: '#FFFF', alignItems: 'center', justifyContent: 'center', paddingLeft: 5, fontSize: 18 }}
                />

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
                    width={250}
                    height={50}
                    textColor="#FFFFFF"
                    activeOpacity={1}
                    progress
                    raiseLevel={4}
                    onPress={next => {
                      this.setSecurityPin();
                      next();
                    }}
                  >
                    <Text style={styles.resendOTPText}> {this.state.languageData['Set_Security_PIN']} </Text>
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
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  loginTextSmall: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
  },
  securityPINText: {
    color: '#333',
    fontSize: 16,
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
