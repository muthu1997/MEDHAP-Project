import React, { Component }  from 'react';
import {StyleSheet, AsyncStorage, View, Image, TouchableHighlight, TouchableOpacity, Text, Modal, Button, Linking} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

// import { SegmentedControls } from 'react-native-radio-buttons'
import SwitchSelector from "react-native-switch-selector";

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// import cameraUpload from './CameraUpload.js';

  const optionsH = [{label: 'हाँ',value: 'Y' },{label: 'नहीं',value: 'N'}]
  const optionsT = [{label: 'ஆம்',value: 'Y' },{label: 'இல்லை',value: 'N'}]
  const optionsE = [{label: 'Yes',value: 'Y' },{label: 'No',value: 'N'}]

export default class QuestionsParticular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      currentItem:this.props.currentItem,
      questionListItems:'',
      questioninfo:'',
      hasPermission: null,
      type: Camera.Constants.Type.back,
      cameraType:'',
      totalQuestions:[],
      selfiFor4:true,
      selfiFor6:true,
      selfiFor4uploaded:false,
      selfiFor6uploaded:false,
      baseurl:'',
      baseURLImage:'',
      language:'',
    }
  }

  async componentDidMount(){

    AsyncStorage.setItem('selfiUploaded4','0'); 
    AsyncStorage.setItem('selfiUploaded6','0'); 

    let baseURL = await AsyncStorage.getItem('baseURL');  
    let baseURLImage = await AsyncStorage.getItem('baseURLImage');  
    let language = await AsyncStorage.getItem('language');  
    this.setState({baseurl:baseURL,language:language,baseURLImage:baseURLImage});

    const params = new URLSearchParams();
    params.append('question_id', this.state.currentItem['question_id']); 
    axios.post(baseURL+'api/getQuestionsItems',params)
    .then(response => { 
      let resVal=response.data;
      if(resVal.status=='success'){
        this.setState({questionListItems:resVal.data});
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })

  }

  loadinfoIcon(index){
    if(index==0){
    return(
        <TouchableHighlight style={styles.infoIconBox} onPress={()=>Actions.questionshelp({current_item:this.state.currentItem})}>
            <Image style={styles.infoIcon} source={require('../assets/icons/why_this_app.png')}/>
        </TouchableHighlight>
    )
    }
  }

  loadselfiIcon(selfiStatus,index_value){
    if(selfiStatus=='Y'){
      if((index_value==4 && this.state.selfiFor4==false) || (index_value==6 && this.state.selfiFor6==false)){

          // let selfiUoloaded4 = await AsyncStorage.getItem('selfiUploaded4');  
          // let selfiUoloaded6 = await AsyncStorage.getItem('selfiUploaded6');  

          // console.log(selfiUoloaded4+'#'+selfiUoloaded6);

          let baseURLImage = this.state.baseURLImage;
          let matchId = baseURLImage+"themes/assets/img/upload.png";
          // if((index_value==4 && selfiUoloaded4==1) || (index_value==6 && selfiUoloaded6==1)){
          //   matchId = baseURL+"themes/assets/img/uploaded.png";
          // }

          // console.log(matchId);

        return(
          <TouchableHighlight style={styles.cameraIconBox} onPress={() => Actions.cameraUpload({index_value: index_value})}>
              <Image style={styles.cameraIcon} source={{ uri:matchId}}/>
          </TouchableHighlight>
        )
      }
    }
  }



  storeAnswers = async (index_value,question,answer,selfiRequired) =>{

    let questionAnsweredCount = await AsyncStorage.getItem('questionAnsweredCount'); 
    AsyncStorage.setItem('questionAnsweredCount',questionAnsweredCount+question+',');

    const params = new URLSearchParams();
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    params.append('auth_id', AuthoKey);
    params.append('index_value', index_value); 
    params.append('question_item_id', question); 
    params.append('answer', answer);
    axios.post(baseURL+'api/updateAnswers',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
          /* Selfi Camera enable & disable */
          if(index_value==4){
            if(answer=='Y'){
              this.setState({selfiFor4:false});
            }else if(answer=='N'){
              this.setState({selfiFor4:true});
            }
          }else if(index_value==6){
            if(answer=='Y'){
              this.setState({selfiFor6:false});
            }else if(answer=='N'){
              this.setState({selfiFor6:true});
            }
          }
      }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
  }

  loadSwitch(index_value,question_item_id,selfi_required){
    if(this.state.language==1){
      return(
        <SwitchSelector backgroundColor={'transparant'} textColor={'#40408B'} selectedColor={'#FFF'} buttonColor={'#40408B'} borderColor={'#40408B'} borderRadius={5} height={40} hasPadding options={optionsH}
        onPress={(value) => {this.storeAnswers(index_value,question_item_id,value,selfi_required)}}
        />
      )
     }else if(this.state.language==2){
      return(
        <SwitchSelector backgroundColor={'transparant'}  textColor={'#40408B'} selectedColor={'#FFF'} buttonColor={'#40408B'} borderColor={'#40408B'} borderRadius={5} height={40} hasPadding options={optionsT}
        onPress={(value) => {this.storeAnswers(index_value,question_item_id,value,selfi_required)}}
        />
      )
     }else if(this.state.language==3){
      return(
        <SwitchSelector backgroundColor={'transparant'}  textColor={'#40408B'} selectedColor={'#FFF'} buttonColor={'#40408B'} borderColor={'#40408B'} borderRadius={5} height={40} hasPadding options={optionsE}
        onPress={(value) => {this.storeAnswers(index_value,question_item_id,value,selfi_required)}}
        />
      )
     }     
  }

  lapsList(){
    if(this.state.questionListItems.length>0){
      return this.state.questionListItems.map((data,index) => {
        return(
              <View key={index} style={styles.questionBoxMain}>
                    <View style={styles.questionBoxInner}>
                        <View style={styles.questionLeft}>
                            <Text style={[styles.questiontitle,styles.questiontitleChild]}>{data.question_title}</Text>
                        </View>
                        <View style={styles.questionRight}>

                          <View style={styles.questionRightIcon2}>
                          {this.loadinfoIcon(index,data)}
                          {this.loadselfiIcon(data.selfi_required,data.index_value)}
                          </View>
                         
                          <View style={styles.questionRightIcon1}>
                          {this.loadSwitch(data.index_value,data.question_item_id,data.selfi_required)}
                          </View>
                          
                        </View>
                    </View>
              </View>
        )
      })
    }
  }

  loadTitle(){
    if(this.props.currentItem['question_title']!=''){
    return(
              <View style={styles.questionBoxTitle}>
                  <Text style={styles.questiontitle}>{this.props.currentItem['question_title']}</Text>
              </View>
    )
    }
  }



  render() {

    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    return (
      <View style={styles.questionMainTopBX}>
        <View style={[styles.questionBoxTop]}>
              {this.loadTitle()}
              {this.lapsList()}
         </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  questionBoxMain:{
    width:'98%',
    flex:1,
    margin:15,
    // padding:10,
    marginBottom:0,
    marginTop:10,
    // backgroundColor:'pink',
  },
  questionBoxInner:{
    flex:2,
    flexDirection: 'column',
    borderLeftWidth:4,
    borderLeftColor:'#40408B',
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    marginTop:10,
  },
  questionLeft:{
    width:'100%',
    // backgroundColor:'green',

  },
  questionRight:{
    width:'100%',
    // backgroundColor:'green',
    // height:50,
    // padding:5,
    flex:2,
    flexDirection: 'row',
  },
  questionRightIcon1:{
    width:'50%',
    // backgroundColor:'orange',
  },
  questionRightIcon2:{
    width:'40%',
    marginRight:'5%',
    // backgroundColor:'orange',
  },
  
  infoIconBox:{
    width:40,
    alignSelf:'flex-end',
  },
  cameraIconBox:{
    width:40,
    alignSelf:'flex-end',
  },
  nextButton:{
    bottom:0,
    backgroundColor:'#333',
    padding:5,
    width:100,
    alignSelf:'center',
  },
  nextButtonText:{
    color:'#FFF',
  },
  radioButton:{
    marginLeft:10,
  },
  questionBoxTitle:{
    // backgroundColor:'orange',
    margin:15,
    // padding:10,
    marginBottom:-10,
   },
   questiontitle:{
     fontSize:RFValue(14),
     color:'#333',
     padding:5,
   },
   questiontitleChild:{
     paddingBottom:10,
   },
   questionBoxTop:{
    width:'95%',
    // margin:10,
    // padding:10,
    // backgroundColor:'#FFF',
    // borderRadius:5,
    // borderWidth:1,
    // borderColor:'#3895D3',
  },
  infoIcon:{
    width:40,
    height:40,
    alignSelf:'center',
  },
  cameraIcon:{
    width:40,
    height:40,
    alignSelf:'center',
  },
 
     borderShadow:{
      shadowColor: "#3895D3",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 10,
     },
     
     loadinfomodelDataClose:{
      backgroundColor:'#007EB0',
      borderRadius:5,  
      borderWidth: 0.5,  
      borderColor: '#007EB0',  
     },
     loadinfomodelDataCloseText:{
      color:'#FFF',
      padding:10,
     }
});
