import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class QuestionsHelp extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        languageData:'',
      }
    }

    async componentDidMount(){
      /* Get language variables start */
      let baseURL = await AsyncStorage.getItem('baseURL');  
      let language = await AsyncStorage.getItem('language');  
      const params = new URLSearchParams();
      params.append('language', language);
      params.append('page_title', 'Help');
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
    
  loadHelpLink(link){
    if(link['help_text_link']!=''){
      return(
        <TouchableOpacity style={styles.helpLink} onPress={()=>this.openHelpLink(link['help_text_link'])}>
           <Text style={styles.helpLinkText} >{link['help_text_link']}{'\n'}</Text>
        </TouchableOpacity>
      )
    }
  }

  openHelpLink(link){
    Linking.openURL(link);
  }

  
  loadImage(link){ 
    if(link['help_text_image']!=''){
       let matchIdIcon = link['help_text_image'];
      return(
        <View>
            <Image source={{ uri:matchIdIcon}} style={styles.helpImage}/>
        </View>
      )
    }
  }


  render() {
    
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={this.state.languageData['Help']}/>
               <ScrollView  style={styles.containerBox}>
                    <Text style = {styles.infomodalTextQuestion}>{this.props.current_item['question_title']}{'\n'}{'\n'}</Text>  
                    
                    <Text style = {styles.infomodalText}>{this.props.current_item['help_text']}{'\n'}</Text>  

                    {this.loadImage(this.props.current_item)}

                    {this.loadHelpLink(this.props.current_item)}
                 
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
    padding:15,
    // backgroundColor:'#FFF',
  },
  infomodalText:{
    color:'#000',
    fontSize:14,
    textAlign:'justify', 
   },
   infomodalTextQuestion:{
    color:'#000',
    fontSize:14,
    textAlign:'justify',
    // marginTop:10,
    marginBottom:10,
   },
   helpLinkText:{
    color:'#000',
  },
  helpLink:{
    marginBottom:20,
  },
  helpImage:{
    width:350,
    height:350,
    alignSelf:'center',
  }
});
