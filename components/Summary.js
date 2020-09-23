import React, { Component }  from 'react';
import {Dimensions, StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = ((Dimensions.get('window').height/100)*30);


export default class Summary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      TextInputValue: '',
      value: 0,
      lastElement:false,
      bannerList: '',
      serviceCheck:false,
      languageData:'',
    }
  }


  async componentDidMount(){
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    const params = new URLSearchParams();
     /* Get language variables start */
     let language = await AsyncStorage.getItem('language');  
     params.append('language', language);
     params.append('page_title', 'Dashboard');
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

  
  renderPage(image, index) {
    return (
        <View key={index}>
            <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image.image_url }} />
        </View>
    );
  }

  render() {
    if(this.state.serviceCheck==false)
    return null;
    const { bannerList }   = this.state;
    return (
          <View style={styles.summaryBox}>

              <View style={styles.topLogo}>
                  <Image source={require('../assets/icons/summary-logo2.png')} style={{ width:'100%', height:'100%', borderRadius:18}}/>
                </View>

              <Text style={[styles.headFont,styles.fontBold, styles.marginTop10]}>{this.state.languageData['MED_HAP']}</Text>
              <Text style={[styles.headFont,styles.fontBold,styles.marginBottom20]}>{this.state.languageData['Medindia_Hygiene_App']}</Text>

              <Text style={styles.smallFont}>{this.state.languageData['Motivational_Cum_Self']}</Text>

              <Text style={styles.smallFont}><Image source={require('../assets/icons/check.png')} style={styles.itemListCheck}/> {this.state.languageData['Practice_Daily']}</Text>
              <Text style={styles.smallFont}><Image source={require('../assets/icons/check.png')} style={styles.itemListCheck}/> {this.state.languageData['Stay_Hygiene']}</Text>
              <Text style={[styles.smallFont,styles.marginBottom20]}><Image source={require('../assets/icons/check.png')} style={styles.itemListCheck}/> {this.state.languageData['Stay_Healthy']}</Text>

              <Text style={styles.headFont}>{this.state.languageData['By']}</Text>

              <Text style={styles.headFont}>{this.state.languageData['MEDINDIA_CHARITABLE_TRUST']}</Text>

              <View style={styles.bottomLogo}>
                  <View style={styles.bottomLogoBox}>
                      <Image source={require('../assets/icons/circle-logo.png')} style={styles.bottomLogoImage}/>
                  </View>
                  <View style={styles.bottomLogoBox}>
                      <Image source={require('../assets/icons/summary-logo1.jpg')} style={styles.bottomLogoImage}/>
                  </View>
              </View>

          </View> 
    ); 
  }
}   

const styles = StyleSheet.create({
  summaryBox:{
    // backgroundColor:'#FFF',
    width:'90%',
    // height:'90%',
    margin:'5%',
    padding:10,
  },
  headFont:{
    fontSize:22,
    textAlign:'center',
    marginBottom:10,
    color:'#40408B',
  },
  smallFont:{
    fontSize:16,
    textAlign:'center',
    marginBottom:10,
    color:'#40408B',
  },
  fontBold:{
    fontWeight:'700',
  },
  topLogo:{
    width: 85,
    height: 100,
    alignSelf:'center',
    // backgroundColor:'red',
  },
  loginText:{
    color:'#FFF',
    fontSize:24,
    textAlign:'center',
  },
  marginTop10:{
    marginTop:10,
  },
  marginBottom20:{
    marginBottom:20,
  },
  bottomLogo:{
    width:'100%',
    flex:2,
    flexDirection:'row',
  },
  bottomLogoBox:{
    width:'50%',
  },
  bottomLogoImage:{
    width: 100,
    height: 100,
    alignSelf:'center',
    borderWidth:0.5,
    borderColor:'#40408B',
    borderRadius:50,
    backgroundColor:'#FFF',
  },
  itemListCheck:{
    width: 20,
    height: 20,
  }
});
