import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import Calendar from 'react-native-calendar-select';

export default class RangeSelecter extends Component {

  constructor (props) {
    super(props);
    this.state = {
      // startDate: new Date(2017, 6, 12),  
      // endDate: new Date(2017, 8, 2)
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }
  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate({startDate, endDate, startMoment, endMoment}) {
    console.log(startDate+'##'+endDate);
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    this.calendar && this.calendar.open();
  }

  render() {
    let customI18n = {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Check in',
        'end': 'Check out',
        'date': 'Date',
        'save': 'Confirm',
        'clear': 'Reset'
      },
      'date': 'DD / MM'  // date format
    };
    // optional property, too.
    let color = {
      subColor: '#f0f0f0'
    };
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Score Board - Date Filter"}/>
            <Button title="Open Calendar" onPress={this.openCalendar}/>
            <Calendar
              i18n="en"
              ref={(calendar) => {this.calendar = calendar;}}
              customI18n={customI18n}
              color={color}
              format="d-m-YYYY"
              minDate="24-06-2020"
              maxDate="26-06-2020"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onConfirm={this.confirmDate}
            />
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
    padding:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
});
