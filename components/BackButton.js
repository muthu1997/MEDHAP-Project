import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class BackButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackButtonText : '',
      language:'',
    }
  }

  async componentDidMount(){
     let language = await AsyncStorage.getItem('language');  
     this.setState({language:language});
  }

  loadText(){
    if(this.state.language==2){
      return(
        <View style={styles.backtoLogin}>
          <TouchableOpacity style={styles.backArrowTamil}  onPress={() => Actions.pop()}>
                    <Image source={require('../assets/icons/left-arrow.png')} style={styles.backArrowImageTamil}/> 
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.backTextTamil}> {this.props.backtext}</Text> 
        </View>
      )
    }else{
      return(
        <View style={styles.backtoLogin}>
          <TouchableOpacity style={styles.backArrow}  onPress={() => Actions.pop()}>
                    <Image source={require('../assets/icons/left-arrow.png')} style={styles.backArrowImage}/> 
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.backText}> {this.props.backtext}</Text> 
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.backtoBox} >
              {this.loadText()}
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  backtoBox:{
    width: '100%',
    height: 50,
    backgroundColor:'#40408B',
  },
  backtoLogin:{
    textAlign:'center',
    padding:5,
    flex:2,
    flexDirection: 'row',
  },
  backArrowImage:{
    height:40,
    width:40,
  },
  backArrowImageTamil:{
    height:30,
    width:30,
  },
  backText:{
    color:'#FFF',
    width:'80%',
    fontSize:24,
    textAlign:'center',
    marginLeft:'-10%',
  },
  backTextTamil:{
    color:'#FFF',
    width:'90%',
    fontSize:14,
    textAlign:'center',
    marginLeft:-10,
    margin:7,
  },
  backArrow:{
    height:'100%',
    width:'20%',
  },
  backArrowTamil:{
    height:'100%',
    width:'10%',
  },
});
