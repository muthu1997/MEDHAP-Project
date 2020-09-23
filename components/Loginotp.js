import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, Platform, AlertIOS, SafeAreaView, TouchableOpacity, TouchableHighlight } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Actions } from 'react-native-router-flux';
import BackButton from './LoginBackButton.js';
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import AwesomeButton from "react-native-really-awesome-button";
import Toast from 'react-native-simple-toast';
import OtpInputs from 'react-native-otp-inputs';

console.disableYellowBox = true;

export default class Loginotp extends Component {

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
      otpData: null
    }
  }

  async componentDidMount() {
    /* Get language variables start */
    let baseURL = await AsyncStorage.getItem('baseURL');
    let language = await AsyncStorage.getItem('language');
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('page_title', 'OTP_Verification');
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

  ennableResend = async () => {
    this.setState({ isButtonDisabled: false });
  }

  resendOTP = async () => {

    const { isButtonDisabled } = this.state;
    this.setState({
      isButtonDisabled: true
    });

    let mobile_number = await AsyncStorage.getItem('mobile_number');
    let country_code = await AsyncStorage.getItem('country_code');
    const params = new URLSearchParams();
    params.append('mobile_number', mobile_number);
    params.append('country_code', country_code);
    let baseURL = await AsyncStorage.getItem('baseURL');
    axios.post(baseURL + 'api/resendOTP', params)
      .then(response => {
        let resVal = response.data;
        // console.log(resVal);
        if (Platform.OS === 'android') {

          Toast.showWithGravity(this.state.languageData['otp_re_send_successfully'], Toast.LONG, Toast.TOP);
        } else {
          AlertIOS.alert(this.state.languageData['otp_re_send_successfully']);
        }
        // Actions.loginotp();
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

  }

  verifyOTP = async () => {
    //let otpCode=otptext['otpCode'];
    let otpCode = this.state.otpData;
    if (Platform.OS === 'android') {

      Toast.showWithGravity('Verifying OTP', Toast.LONG, Toast.TOP);
    } else {
      AlertIOS.alert('Verifying OTP');
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
    axios.post(baseURL + 'api/verifyOTP', params)
      .then(response => {
        let resVal = response.data;
        console.log(response);
        if (resVal.status == 'success') {

          Toast.showWithGravity(this.state.languageData['otp_verified_successfully'], Toast.LONG, Toast.TOP);

          AsyncStorage.setItem('AuthoKey', resVal.user_id);
          Actions.loginsetpassword();
        } else {
          let invalCount = this.state.invalidotpcount + 1;
          if (invalCount == 3) {
            if (Platform.OS === 'android') {

              Toast.showWithGravity('Max limit reached for this otp verification', Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert('Max limit reached for this otp verification');
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

              Toast.showWithGravity(this.state.languageData['invalid_otp'], Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert(this.state.languageData['invalid_otp']);
            }
          }
        }

      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

  }

  counterBox() {
    const { isButtonDisabled } = this.state;
    if (isButtonDisabled == true) {
      return (


        <AwesomeButton
          style={styles.resendOTP}
          backgroundColor="#40408B"
          activityColor="#FFF"
          backgroundDarker="#7979B9"
          backgroundPlaceholder="orange"
          backgroundProgress="#7979B9"
          activeOpacity={0.5}
          borderRadius={10}
          width={'100%'}
          height={50}
          textColor="#FFFFFF"
          activeOpacity={1}
          raiseLevel={4}
        >
          <View style={styles.resendOTPBox}>
            <View style={styles.resendOTPBoxLeft}>
              <Text style={styles.resendOTPText1}> {this.state.languageData['resend_otp_in']} </Text>
            </View>
            <View style={styles.resendOTPBoxRight}>
              <CountDown style={styles.resendOTPText2}
                until={30}
                size={10}
                onFinish={() => this.ennableResend()}
                digitStyle={{ backgroundColor: '#40408B' }}
                digitTxtStyle={{ color: '#FFF' }}
                timeToShow={['S']}
                timeLabels=''
              // timeLabels={{s: 'SS'}}
              />
            </View>
          </View>
        </AwesomeButton>
      )
    } else {
      return (
        <AwesomeButton
          style={styles.resendOTP}
          backgroundColor="#40408B"
          activityColor="#FFF"
          backgroundDarker="#7979B9"
          backgroundPlaceholder="orange"
          backgroundProgress="#7979B9"
          activeOpacity={0.5}
          borderRadius={10}
          width={'100%'}
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
          <Text style={styles.resendOTPText}> {this.state.languageData['resend_otp']} </Text>
        </AwesomeButton>

        // <TouchableHighlight style={styles.resendOTP}  onPress={this.resendOTP} disabled={this.state.isButtonDisabled} >
        //   <Text style={styles.resendOTPText}> Resend OTP</Text> 
        // </TouchableHighlight>
      )
    }
  }

  render() {
    const { TextInputValue, country_code } = this.state;
    if (this.state.serviceCheck == false)
      return null;
    return (
      <SafeAreaView>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position: 'relative' }} />

        <View style={styles.logoBoxMain}>

          <View style={styles.topSpace}></View>
          <BackButton backtext={this.state.languageData['otp_verification']} />


          <View style={styles.logoBox}>

            <View style={styles.containerBox}>
              <Text style={[styles.loginText, styles.loginTextParent, styles.marginBottom20]}>{this.state.languageData['enter_verification_code']}{'\n'}</Text>

              <Image source={require('../assets/icons/telephone.png')} style={styles.telephoneIcon} />

              <Text style={[styles.loginTextSmall, styles.marginBottom20]}>{this.state.languageData['that_verification_code_text']}{'\n'}</Text>
              <Text style={styles.loginText}>{country_code} {TextInputValue}</Text>

              <View style={{ alignItems: 'center' }}>

                {/* <OTPInputView
                  style={{ width: '50%', height: 100 }}
                  pinCount={4}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  //onCodeFilled = {otpCode => this.verifyOTP({otpCode})}
                  onCodeFilled={otpCode => this.setState({ otpData: otpCode })}

                /> */}

                <OtpInputs
                  handleChange={(code) => this.setState({ otpData: code })}
                  numberOfInputs={4}
                  focusedBorderColor="#000"
                  secureTextEntry={true}
                  style={{ width: '100%', height: 50, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around', marginVertical: 15 }}
                  inputContainerStyles={{ borderRadius: 5, borderWidth: 2, width: 40, height: '90%', borderColor: '#FFFF', alignItems: 'center', justifyContent: 'center', paddingLeft: 5, fontSize: 18 }}
                />

                <View style={styles.otpActionBox}>

                  <AwesomeButton
                    onPress={() => this.verifyOTP()}
                    style={{ alignSelf: 'center' }}
                    backgroundColor="#40408B"
                    activityColor="#FFF"
                    backgroundDarker="#7979B9"
                    backgroundPlaceholder="orange"
                    backgroundProgress="#7979B9"
                    activeOpacity={0.5}
                    borderRadius={10}
                    width={'100%'}
                    height={50}
                    textColor="#FFFFFF"
                    activeOpacity={1}
                    raiseLevel={4}
                  >
                    <View style={styles.resendOTPBox}>
                      <View style={styles.resendOTPBoxLeft}>
                        <Text style={styles.resendOTPText1}> Verify OTP </Text>
                      </View>
                    </View>
                  </AwesomeButton>

                  <View style={{ width: 20, height: 30 }} />

                  {this.counterBox()}

                </View>


              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  resendOTP: {
    // borderColor:'#40408B',
    // borderWidth:1,
    // backgroundColor:'#40408B',
    //width:'50%',
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
    fontSize: 16,
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
    alignItems: 'center',
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
