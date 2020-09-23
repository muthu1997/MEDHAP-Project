import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LoginBackButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackButtonText : ''
    }
  }
  render() {
    return (
      <View style={styles.backtoBox} >
          <View style={styles.backtoLogin} >
              <TouchableOpacity style={styles.backArrow}  onPress={() => Actions.pop()}>
                  <Image source={require('../assets/icons/left-arrow.png')} style={styles.backArrowImage}/> 
              </TouchableOpacity>
              <Text style={styles.backText}> {this.props.backtext}</Text>  
          </View>
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
    width: '100%',
    textAlign:'center',
    padding:5,
    flex:2,
    flexDirection: 'row',
  },
  backArrowImage:{
    height:40,
    width:40,
  },
  backText:{
    color:'#FFF',
    width:'90%',
    fontSize:24,
    textAlign:'center',
    marginLeft:'-5%',
  },
  backArrow:{
    height:'100%',
    width:'10%',
  },
});
