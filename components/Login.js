import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TextInput, Platform,AlertIOS, SafeAreaView, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AndroidBack from './AndroidBack';
import BackButton from './BackButton.js';
import AwesomeButton from "react-native-really-awesome-button";
import Toast from 'react-native-simple-toast';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      countryCode:'',
      countryCodeList:'',
      serviceCheck:false,
      languageData:'',
      mobileErrorMessage:'',
    }
  }

  async componentDidMount(){
    const { TextInputValue,countryCodeList }  = this.state ;
    let baseURL = await AsyncStorage.getItem('baseURL');  
    axios.post(baseURL+'api/getCountryCodeList')
    .then(response => {
      this.setState({countryCodeList: response.data.data,countryCode:response.data.country_code});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })

    /* Get language variables start */
    let language = await AsyncStorage.getItem('language');  
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('page_title', 'Register');
    axios.post(baseURL+'api/getLanguageVariable',params)
    .then(response => {
      this.setState({languageData: response.data.data});
      this.setState({serviceCheck:true});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
    /* Get language variables end */
    
  }

  loginProcess = async () =>{
        const { TextInputValue,countryCode }  = this.state ;
        
        if(TextInputValue.length < 5) {
          let errorMessage=this.state.languageData['enter_valid_mobile_number'];
          if (Platform.OS === 'android') {
            
            Toast.showWithGravity(errorMessage, Toast.LONG, Toast.TOP);
          } else {
            AlertIOS.alert(this.state.languageData['enter_valid_mobile_number']);
          }
        }else{
          AsyncStorage.setItem('mobile_number',TextInputValue);  
          AsyncStorage.setItem('country_code',countryCode);  
          let DeviceId = await AsyncStorage.getItem('DeviceId');  
          let language = await AsyncStorage.getItem('language');  
          const params = new URLSearchParams();
          params.append('mobile_number', TextInputValue);
          params.append('device_id', DeviceId);
          params.append('country_code', countryCode);
          params.append('language_id', language);
          let baseURL = await AsyncStorage.getItem('baseURL');  
          axios.post(baseURL+'api/register',params)
            .then(response => {
              let resVal=response.data;
              // console.log(resVal);
              if(resVal.status=='success' && resVal.user_type=='N'){
                Actions.loginotp();
              }else if(resVal.status=='success' && resVal.user_type=='O' && resVal.mobile_verification=='Y'){
                Actions.loginpassword();
              }else{
                Actions.loginotp();
              }

            })
            .catch(errorMsg => {
                console.log(errorMsg);
            })
        }
  }

  getCountryCodeList(){
    if(this.state.countryCodeList.length>0){
      return this.state.countryCodeList.map((data,index) => {
        return(
          <Picker.Item key={index} label={data.name} value={data.name} />
        )
      })
    }
  }

  render() {

    if(this.state.serviceCheck==false)
            return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>

        <View style={styles.logoBoxMain}>

        <View style={styles.topSpace}></View>
        <BackButton backtext={this.state.languageData['Login_back_button']}/>
            

          <View style={styles.logoBox}>

            <View style={styles.topLogo}>
              <Image source={require('../assets/logo.png')} style={{ width:'100%', height:'100%', borderRadius:25}}/>
            </View>

              <View style={styles.mainTopBox}>
                  <View style={styles.mainTopBoxChild}>
                      <Text style={styles.mobilenumberText}>{this.state.languageData['enter_your_mobile_number']}{'\n'}</Text>
                      <View style={styles.mobilenumberParentBox}>
                        <View style={styles.mobilenumberParentBoxInner}>
                        
                            <Picker style={styles.mobileBoxCountryCode}
                            selectedValue={this.state.countryCode}
                            onValueChange={countryCode => this.setState({countryCode})}>
                            {this.getCountryCodeList()}
                            </Picker>
                          

                          <TextInput  placeholder={this.state.languageData['mobile_number']} keyboardType='numeric' style={styles.mobileBox}  onChangeText={TextInputValue => this.setState({TextInputValue})}/>
                        
                        {/* <PhoneInput ref='phone'/> */}
                        
                        </View>
                      </View>
                    
                      {/* <TouchableHighlight style={styles.loginButton}  onPress={this.loginProcess}>
                        <Text style={styles.loginButtonText}>  </Text>
                      </TouchableHighlight> */}

                      <AwesomeButton 
                      style={styles.loginButton} 
                      backgroundColor="#40408B"
                      activityColor="#FFF"
                      backgroundDarker="#7979B9"
                      backgroundPlaceholder="orange"
                      backgroundProgress="#7979B9"
                      activeOpacity={0.5}
                      borderRadius={10}
                      width={150}
                      height={50}
                      textColor="#FFFFFF"
                      activeOpacity={1}
                      progress
                      raiseLevel={4}
                      onPress={next => {
                        this.loginProcess();
                        next();
                      }}
                      >
                      {/* <Image source="require('send-icon.png)" /> */}
                      <Text style={styles.loginButtonText}> {this.state.languageData['login']} </Text>
                     </AwesomeButton>

                </View>

                <View style={styles.loginIcons1} >
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/01_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/02_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/03_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                </View>

                <View style={styles.loginIcons2} >
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/04_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/05_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                    <View style={styles.loginIconsChild}>
                        <Image source={require('../assets/icons/06_login.png')} style={{ width:'100%', height:'100%'}}/>
                    </View>
                </View>

   
              </View>
          </View>
          <AndroidBack/>
          </View>    
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: 320,
    height: '80%',
    marginTop:'20%',
    position:'absolute', 
    alignSelf:'center',
    padding:'5%',
    flex:1,
    // backgroundColor:'red',
  },
  loginTextParent:{
    marginTop:10,
  },
  topLogo:{
    width: 120,
    height: 140,
    alignSelf:'center',
    // backgroundColor:'red',
  },
  loginText:{
    color:'#FFF',
    fontSize:24,
    textAlign:'center',
  },
  mobilenumberText:{
    color:'#333',
    fontSize:24,
    textAlign:'center',
    marginTop:20,
  },
  mobilenumberParentBox:{
    marginTop:10,
    width:'100%',
    height:50,
  },
  mobilenumberParentBoxInner:{
    flex:2,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
  },
  countryCodePicker:{
    color:'#333',
  },
  mobileBoxCountryCode:{
    height: 50,
    fontSize:28,
    padding:5,
    textAlign:'left',
    borderColor: '#FFF', 
    backgroundColor:'#FFF',
    borderWidth: 1,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    marginLeft:10,
    width:'20%',
  },
  mobileBox:{
    height: 50,
    fontSize:18,
    padding:5,
    textAlign:'left',
    borderColor: '#FFF', 
    backgroundColor:'#FFF',
    borderWidth: 1,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    width:'80%',
  },
  loginButton:{
    marginTop:20,
    alignSelf:'center',
  },
  loginButtonText:{
    color:'#FFF',
    padding:10,
    alignSelf:'center',
    fontSize:18,
  },
  loginButtonImage:{
    width:'100%',
    height:50,
  },
  loginIcons1:{
    width:'100%',
    height:'20%',
    flex:3,
    flexDirection: 'row',
    marginTop:40,
  },
  loginIcons2:{
    width:'100%',
    height:'20%',
    flex:3,
    flexDirection: 'row',
    marginTop:90,
  },
  loginIconsChild:{
    width:'33.3%',
    height:95,
    padding:10,
  },
  logoBoxMain: {
    width: '100%',
    height: '100%',
    position:'absolute', 
    textAlign:'center',
    flex:2,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
});
