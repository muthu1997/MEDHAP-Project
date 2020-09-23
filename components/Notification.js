import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-banner-carousel';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import BackButton from './BackButton.js';

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      TextInputValue: '',
      serviceCheck: false,
      notificationCount: [],
      languageData: '',
    }
    AsyncStorage.getItem('notificationMain')
      .then(data => {
        if (data) {
          var notdata = JSON.parse(data);
          //alert(JSON.stringify(notdata[0].data))
          this.setState({
            notificationCount: notdata
          })
        }
      })
  }

  async componentDidMount() {
    /* Get language variables start */
    let baseURL = await AsyncStorage.getItem('baseURL');
    let language = await AsyncStorage.getItem('language');
    const params = new URLSearchParams();
    params.append('language', language);
    params.append('page_title', 'Notification');
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


  lapsList() {
    if (this.state.notificationCount.length > 0) {
      return this.state.notificationCount.map((data) => {
        return (
          <View>
            <View styles={{ backgroundColor: 'red', margin: 30 }}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.message}>{data.message}</Text>
            </View>
          </View>
        )
      })
    } else {
      return (
        <View>
          <Text style={styles.notificationText}>{this.state.languageData['Notification_empty']}</Text>
        </View>
      )
    }
  }

  render() {
    if (this.state.serviceCheck == false)
      return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position: 'relative' }} />
        <View style={styles.logoBox}>
          <View style={styles.topSpace}></View>
          <BackButton backtext={this.state.languageData['Notification']} />

          <ScrollView>
            {this.state.notificationCount.length > 0 ? (
              <View styles={styles.msgcontainer}>
                {this.state.notificationCount.map((data) =>
                  <View styles={styles.msgcontainer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.message}>{data.message}</Text>
                  </View>
                )} 
              </View>
            ) : (
                <View>
                  <Text style={styles.notificationText}>{this.state.languageData['Notification_empty']}</Text>
                </View>
              )}
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    position: 'absolute',
    // paddingHorizontal:70,
    // backgroundColor:'#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 5,
    flexDirection: 'column',
  },
  topSpace: {
    width: '100%',
    height: 20,
    backgroundColor: '#40408B',
  },
  scoreBox: {
    height: '100%',
    // backgroundColor:'red',
  },
  notificationText: {
    textAlign: 'center',
    color: '#40408B',
    fontSize: 14,
    padding: 10,
  },
  msgcontainer: {
    width: 300,
    height: 50,
    alignSelf: 'center',
    padding: 8,
    backgroundColor: '#FFFF',
    borderRadius: 5
  },
  title: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 18,
    backgroundColor: '#FFFF',
    paddingVertical: 8,
    paddingLeft:8
  },
  message: {
    fontWeight: '400',
    color: 'black',
    fontSize: 16,
    backgroundColor: '#FFFF',
    paddingVertical: 8,
    paddingLeft:8,
    borderBottomWidth:0.5,
    borderBottomColor:'lightgray'
  }
});
