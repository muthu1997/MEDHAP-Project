import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, Picker, TextInput, Platform, AlertIOS, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';

export default class ProfileEdit extends Component {

    constructor(props) {
      super(props)
      this.state = {
        full_name: '',
        email_id:'',
        country_code:'',
        mobile_number:'',
        gender:'',
        date_of_birth:'',
        address:'',
        city:'',
        state:'',
        country:'',
        serviceCheck:false,
        countryserviceCheck:false,
        date:"2016-05-15",
        countryList:'',
        stateList:'',
        cityList:'',
        languageData:'',
        language:'',
      }
    }

    async componentDidMount(){

      const params = new URLSearchParams();
      let baseURL = await AsyncStorage.getItem('baseURL'); 
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      let language = await AsyncStorage.getItem('language');  

      params.append('auth_id', AuthoKey);
      axios.post(baseURL+'api/getAuthDetails',params)
      .then(response => {
        let resVal=response.data;
        if(resVal.status=='success'){
          this.setState({
            full_name:resVal.data[0].first_name,
            email_id:resVal.data[0].email,
            country_code:resVal.data[0].mobile_code,
            mobile_number:resVal.data[0].mobile_number,
            gender:resVal.data[0].gender,
            date_of_birth:resVal.data[0].date_of_birth,
            address:resVal.data[0].address,
            country:resVal.data[0].country,
            state:resVal.data[0].state,
            city:resVal.data[0].city,
          });

          /* Pre load country, state, city start */
          if(resVal.data[0].country!=''){
            this.getStateList(resVal.data[0].country);
          }

          if(resVal.data[0].state!=''){
            this.getCityList(resVal.data[0].state);
          }
           /* Pre load country, state, city end */

           this.setState({language:language});

        }
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })


      /* Get counry list */
      params.append('language', language);
      axios.post(baseURL+'api/getCountryList',params)
      .then(response => {
        let resVal=response.data;
        if(resVal.status=='success'){
          this.setState({countryList:resVal.data});
          this.setState({countryserviceCheck:true});
        }
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })


      /* Get language variables start */
      params.append('language', language);
      params.append('page_title', 'EditProfile');
      axios.post(baseURL+'api/getLanguageVariable',params)
      .then(response => {
        this.setState({languageData: response.data.data});
        this.setState({serviceCheck: true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
      /* Get language variables end */


  }

  updateProfile = async () =>{
    const { full_name,email_id, gender, date_of_birth, address, city, state, country}  = this.state ;


    if(full_name!='' && email_id!='' && gender!='' && date_of_birth!=''){
          const params = new URLSearchParams();
          let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
          let baseURL = await AsyncStorage.getItem('baseURL');  

          
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          // console.log(reg.test(email_id));
          if (reg.test(email_id)) {
                params.append('auth_id', AuthoKey);
                params.append('full_name', full_name);
                params.append('email_id', email_id);
                params.append('gender', gender);
                params.append('date_of_birth', date_of_birth);
                params.append('address', address);
                params.append('city', city);
                params.append('state', state);
                params.append('country', country);
      
                axios.post(baseURL+'api/updateProfile',params)
                .then(response => {
                  // console.log(response.data);
                  if (Platform.OS === 'android') {
                    var Toast = require("react-native-simple-toast");
                    Toast.showWithGravity('Profile completed successfully', Toast.LONG, Toast.TOP);
                  } else {
                    AlertIOS.alert('Profile completed successfully');
                  }
                  Actions.profile();
                })
                .catch(errorMsg => {
                    console.log(errorMsg);
                })
          }else{
            if (Platform.OS === 'android') {
              var Toast = require("react-native-simple-toast");
              Toast.showWithGravity('Invalid email id', Toast.LONG, Toast.TOP);
            } else {
              AlertIOS.alert('Invalid email id');
            }
          }
        }else{
          if (Platform.OS === 'android') {
            var Toast = require("react-native-simple-toast");
            Toast.showWithGravity('Please enter required details', Toast.LONG, Toast.TOP);
          } else {
            AlertIOS.alert('Please enter required details');
          }
        }
  }


getCountryListItem(){
  // console.log(this.state.countryList);
  if(this.state.countryList.length>0){
    return this.state.countryList.map((data,index) => {
      let indexVal=index+1;
      if(this.state.language==1){
        return(<Picker.Item key={indexVal} label={data.name_hindi} value={data.master_id} />)
      }else if(this.state.language==2){
        return(<Picker.Item key={indexVal} label={data.name_tamil} value={data.master_id} />)
      }else if(this.state.language==3){
        return(<Picker.Item key={indexVal} label={data.name} value={data.master_id} />)
      }
      
    })
  }
}


getStateList= async (itemValue, itemIndex) =>{

  this.setState({country: itemValue});

  const params = new URLSearchParams();
  params.append('country', itemValue);
  let baseURL = await AsyncStorage.getItem('baseURL');  
  axios.post(baseURL+'api/getStateList',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
        this.setState({stateList:resVal.data});
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
}

getStateListItem(){
    /* Get state list */
    if(this.state.country!='' && this.state.stateList.length>0 ){
        return this.state.stateList.map((data,index) => {

          if(this.state.language==1){
            return(<Picker.Item key={index} label={data.state_name_hindi} value={data.state_id} />)
          }else if(this.state.language==2){
            return(<Picker.Item key={index} label={data.state_name_tamil} value={data.state_id} />)
          }else if(this.state.language==3){
            return(<Picker.Item key={index} label={data.state_name} value={data.state_id} />)
          }

        })
    }else{
      return(
        <Picker.Item key={0} label={this.state.languageData['State']} value="0"/>
      );
    }
}


getCityList= async (itemValue, itemIndex) =>{

  this.setState({state: itemValue});
  const params = new URLSearchParams();
  params.append('state', itemValue);
  let baseURL = await AsyncStorage.getItem('baseURL');  
  axios.post(baseURL+'api/getCityList',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
        this.setState({cityList:resVal.data});
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
}

getCityListItem(){
    /* Get state list */
    if(this.state.state!='' && this.state.cityList.length>0 ){
        return this.state.cityList.map((data,index) => {

          if(this.state.language==1){
            return(<Picker.Item key={index} label={data.city_name_hindi} value={data.city_id} />)
          }else if(this.state.language==2){
            return(<Picker.Item key={index} label={data.city_name_tamil} value={data.city_id} />)
          }else if(this.state.language==3){
            return(<Picker.Item key={index} label={data.city_name} value={data.city_id} />)
          }

        })
    }else{
      return(
        <Picker.Item key={0} label={this.state.languageData['City']} value="0"/>
      );
    }
}

  render() {
    if(this.state.serviceCheck==false || this.state.countryserviceCheck==false)
            return null;

    const { country_code, full_name,email_id,mobile_number, gender, date_of_birth, address, city, state, country }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={this.state.languageData['Edit_Profile']}/>

            <View style={styles.containerBox}>
                      <View style={styles.containerBoxInner}>

                <ScrollView  style={styles.containerBoxTop}>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Full_Name']} <Text style={styles.requiredIcon}>*</Text></Text>
                    <TextInput style={styles.inputBox} maxLength={50} onChangeText={full_name => this.setState({full_name})}>{full_name}</TextInput>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Email_Address']} <Text style={styles.requiredIcon}>*</Text></Text>
                    <TextInput style={styles.inputBox}  maxLength={100} onChangeText={email_id => this.setState({email_id})}>{email_id}</TextInput>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Mobile_Number']} <Text style={styles.requiredIcon}>*</Text></Text>
                    <Text style={styles.inputBox}>+{country_code} {mobile_number}</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Gender']} <Text style={styles.requiredIcon}>*</Text></Text>
                    <View style={styles.selectBox}>
                      <Picker
                      selectedValue={this.state.gender}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                      }>
                      <Picker.Item key={0} label={this.state.languageData['Gender']} value=""/>
                      <Picker.Item key={1} label={this.state.languageData['Male']} value="M"/>
                      <Picker.Item key={2} label={this.state.languageData['Female']} value="F"/>
                      <Picker.Item key={3} label={this.state.languageData['Others']} value="O"/>
                      </Picker>
                    </View>

                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Date_of_Birth']} <Text style={styles.requiredIcon}>*</Text></Text>

                    <DatePicker
                    style={styles.inputBoxDate}
                    date={this.state.date_of_birth}
                    mode="date"
                    placeholder="DD/MM/YYYY"
                    format="DD-MM-YYYY"
                    minDate="01-01-1940"
                    maxDate="01-01-2018"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        // position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                        display:'none',
                      },
                      dateText: {
                        fontSize: 17,
                        color: "#333",
                        textAlign:'left',
                      },
                      dateInput: { 
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: '#333', 
                        alignItems: "flex-start"
                      },
                      placeholderText: {
                        fontSize: 17,
                        color: "#333",
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date_of_birth) => {this.setState({date_of_birth})}}
                  />

                    {/* <TextInput style={styles.inputBox} maxLength={50} onChangeText={date_of_birth => this.setState({date_of_birth})}>{date_of_birth}</TextInput> */}
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Address']}</Text>
                    <TextInput style={styles.inputBox} maxLength={200} onChangeText={address => this.setState({address})}>{address}</TextInput>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['Country']}</Text>
                    <View style={styles.selectBox}>
                      <Picker
                      selectedValue={this.state.country}
                      onValueChange={this.getStateList
                      }>
                      <Picker.Item key={0} label={this.state.languageData['Country']} value="0"/>
                      {this.getCountryListItem()}
                      </Picker>
                    </View>
                </View>


                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['State']}</Text>
                    <View style={styles.selectBox}>
                        <Picker
                        selectedValue={this.state.state}
                        onValueChange={this.getCityList}>
                        {this.getStateListItem()}
                        </Picker>
                    </View>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>{this.state.languageData['City']}</Text>
                    <View style={styles.selectBox}>
                        <Picker
                        selectedValue={this.state.city}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({city: itemValue})
                        }>
                        {this.getCityListItem()}
                        </Picker>
                    </View>
                </View>
                

              </ScrollView> 
              <View style={styles.containerBoxBottom}>
                      <TouchableHighlight style={styles.footerButton} onPress={this.updateProfile}>
                        <Text  style={styles.footerButtonText}>{this.state.languageData['Update_Details']} </Text>
                      </TouchableHighlight>
                </View>
          </View>
           </View>
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
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  containerBox:{
    height:'100%',
    // backgroundColor:'#FFF',
    opacity:1,
  },
  containerBoxInner:{
    flex:2,
    flexDirection: 'column',
  },
  containerBoxTop:{
    padding:20,
    marginBottom:20,
  },
  profileItem:{
    marginBottom:20,
  },
  labelText:{
    color:'#000',
    fontSize:RFValue(16),
    marginBottom:5,
  },
  inputBox:{
    height: 40,
    fontSize:24,
    padding:5,
    borderBottomWidth: 1,
    borderBottomColor: '#333', 
    width:'100%',
    color:'#333',
    fontSize:RFValue(18),
  },
  selectBox:{
    borderBottomWidth: 1,
    borderBottomColor: '#333', 
  },
  inputBoxDate:{
    height: 40,
    padding:5,
    borderWidth:0,
    // borderBottomColor: '#333', 
    // borderBottomWidth: 1,
    width:'100%',
    // color:'#333',
    // fontSize:RFValue(18),
  },
  profileButton:{
    borderColor:'#3895D3',
    borderWidth:1,
    backgroundColor:'#3895D3',
    width:'60%',
    height:50,
    alignSelf:'center',
    marginBottom:50,
  },
  buttonText:{
    fontSize:RFValue(22),
    padding:10,
    color:'#333',
    textAlign:'center',
  },
  containerBoxBottom:{
    height:125,
  },
  footerButton:{
    borderColor:'#40408B',
    borderWidth:0.5,
    padding:10,
    alignSelf:'center',
    backgroundColor:'#40408B',
    bottom:5,
    width:'100%',
  },
  footerButtonText:{
    padding:5,
    width:'100%',
    fontSize:RFValue(18),
    textAlign:'center',
    color:'#FFF',
  },
  requiredIcon:{
    color:'red',
  }
});
