import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.topHeaderBox}>
          <View style={styles.topHeader}>
              <TouchableHighlight style={styles.topHeaderSec1}>
                  <Image source={require('../assets/font-04.png')} style={styles.mapicon}/>
                  {/* <Text style={styles.logoTextTop}>MED-HAP</Text> */}
              </TouchableHighlight>
              {/* <View style={styles.topHeaderSec2}>
                  <Image source={require('../assets/logo.png')} style={styles.topLogo}/>
              </View> */}

          <View style={styles.topHeaderSec2}>

                {/* <TouchableHighlight style={styles.carticonBox}>
                    <Image source={require('../assets/coin_1.png')} style={styles.carticon}/>
                </TouchableHighlight>

                <TouchableHighlight style={styles.carticonBox}>
                    <Image source={require('../assets/coin_2.png')} style={styles.carticon}/>
                </TouchableHighlight>

                <TouchableHighlight style={styles.carticonBox}>
                    <Image source={require('../assets/coin_3.png')} style={styles.carticon}/>
                </TouchableHighlight> */}

                <TouchableHighlight style={styles.carticonBox} onPress={() => Actions.notification()}>
                    <Image source={require('../assets/icons/notification.png')} style={styles.carticon}/>
                </TouchableHighlight>
              </View>
            
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  topHeaderBox:{
    width:'100%',
    height:55,
  },
  logoTextTop:{
    color:'#FFF',
    fontSize:26,
  },
  topHeader:{
    width:'100%',
    height:'100%',
    flex:3,
    flexDirection: 'row',
    backgroundColor:'#40408B',
  },
  topHeaderSec1:{
    width:'80%',
    // alignItems: 'left',
    paddingLeft:10,
    // backgroundColor:'#fff',
  },
  topHeaderSec2:{
    width:'20%',
    textAlign: 'center',
    alignSelf: 'center',
    // flex:1,
    // flexDirection: 'row',
    // backgroundColor:'#ddd',
  },
  topLogo:{
    width:200,
    height:35,
  },
  mapicon:{
    width:190,
    height:50,
  },
  carticonBox:{
    width:'25%',
    alignSelf: 'center',
    // backgroundColor:'#ddd',
    // padding:5,
  },
  carticon:{
    width:30,
    height:30,
    borderRadius:25,
    marginTop:13,
    alignSelf: 'center',
  },
  bellicon:{
    width:30,
    height:30,
    borderRadius:25,
    marginTop:15,
    alignSelf: 'center',
  }
});
