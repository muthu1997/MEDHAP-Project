import React, { Component }  from 'react';
import {StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      languageData:'',
      serviceCheck:false,
    }
  }


  async componentDidMount(){
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL'); 
     /* Get language variables start */
    let language = await AsyncStorage.getItem('language');  
    params.append('language', language);
    params.append('page_title', 'Footer');
    //https://doctor.a-bits.com/index.php/api/getLanguageVariable
    console.log(params)
    axios.post(baseURL+'api/getLanguageVariable',params)
    .then(response => {
      this.setState({languageData: response.data.data});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
    /* Get language variables end */
  }
  

  render() {

    return (
      <View style={styles.footerMenuBox}>
          <View style={styles.footerMenu}>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.dashboard()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/home.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>{this.state.languageData['home']}</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.scoreBoard({report_type:''})}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/checklist.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>{this.state.languageData['score_board']}</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.whythisapp()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/testimonial.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>{this.state.languageData['notification']} </Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.profile()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/user.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>{this.state.languageData['profile']}</Text>
                      </View>
                  </TouchableHighlight>
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  footerMenuBox:{
    height:'12%',
    position: 'absolute',
    bottom:0,
    borderTopColor:'#3895D3',
    borderTopWidth:1,
  },
  footerMenu:{
    flex:4,
    flexDirection: 'row',
    backgroundColor:'#40408B',
  },
  footerMenuSec:{
    width:'25%',
    alignItems: 'center',
    padding:2,
    paddingTop:5,
  },
  footerMenuIcons:{
    width:50,
    height:50,
  },
  footerMenuText:{
    color:'#FFF',
    fontSize:10,
    marginTop:3,
    textAlign:'center',
  }
});
