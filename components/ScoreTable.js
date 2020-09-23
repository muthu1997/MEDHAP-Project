import React, { Component }  from 'react';
import {ScrollView, Dimensions, StyleSheet, AsyncStorage, View, Image, TouchableHighlight, Text, Button} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-banner-carousel';
import axios from 'axios';

import Calendar from 'react-native-calendar-select';

export default class ScoreTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      scoreList:'',
      serviceCheck:false,
      report_type:this.props.report_type,
      languageData:'',
      coin1:'0',
      coin2:'0',
      coin3:'0',
      startDate:'',  
      endDate:'',
      currentDate:'',
    }
  }


  async componentDidMount(){
    this.getDatDetails();

     /* Get language variables start */
     let baseURL = await AsyncStorage.getItem('baseURL');  
     let language = await AsyncStorage.getItem('language');  
     const params = new URLSearchParams();
     params.append('language', language);
     params.append('page_title', 'Scoreboard');
     axios.post(baseURL+'api/getLanguageVariable',params)
     .then(response => {
      //  console.log(response.data.data);
       this.setState({languageData: response.data.data});
     })
     .catch(errorMsg => {
         console.log(errorMsg);
     })
     /* Get language variables end */

  }

  async getDatDetails(){
    const params = new URLSearchParams();
    let baseURL = await AsyncStorage.getItem('baseURL'); 
    let AuthoKey = await AsyncStorage.getItem('AuthoKey');  
    params.append('auth_id', AuthoKey);
    params.append('report_type', this.state.report_type);
    params.append('start_date', this.state.startDate);
    params.append('end_date', this.state.endDate);
    axios.post(baseURL+'api/getScoreboard',params)
      .then(response => {
        let resVal=response.data;
        // console.log(resVal);
        this.setState({scoreList:resVal.data});
        this.setState({currentDate:resVal.currentDate});
        this.setState({coin1:resVal.coin1});
        this.setState({coin2:resVal.coin2});
        this.setState({coin3:resVal.coin3});
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }
    
  filterData(filterType){
    this.setState({report_type:filterType});
    this.getDatDetails();
  }

  scoreList() {
    if(this.state.scoreList.length>0){
      return this.state.scoreList.map((data,index) => {
        let sNo=index+1;
        return (
          <View key={index} style={styles.tableBoddyTyp1}>
              <View style={styles.tableBoddyTyp1Item}>
                  <Text style={styles.tableItemText}>{sNo}</Text>
              </View>
              <View style={styles.tableBoddyTyp1Item}>
                  <Text style={styles.tableItemText}>{data.answer_date}</Text>
              </View>
              <View style={styles.tableBoddyTyp1Item}>
                  <Text style={styles.tableItemText}>{data.score}</Text>
              </View>
          </View>
        )
      })
    }else{
      return (
        <View style={styles.tableBoddyTyp2}>
              <View style={styles.tableBoddyTyp2Item}>
                  <Text style={styles.tableBoddyTyp2ItemText}>{this.state.languageData['No_record_found']}</Text>
              </View>
        </View>
      )
    }
  }

  confirmDate(startDate, endDate) {
    let startDateNew='';
    let endDateNew='';
    if(startDate!=''){
      var date = new Date(startDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      startDateNew=[date.getFullYear(), mnth, day].join("-");
    }
    if(endDate!=''){
      var date = new Date(endDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      endDateNew=[date.getFullYear(), mnth, day].join("-");
    }
    
    this.setState({report_type:'CU'});
    this.setState({startDate:startDateNew});
    this.setState({endDate:endDateNew});
    this.getDatDetails();
  }

  openCalendar() {
    this.calendar && this.calendar.open();
  }

  render() {
    if(this.state.serviceCheck==false)
    return null;

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
      'date': 'DD / MM / YYYY'  // date format
    };
    // optional property, too.
    let color = {
      mainColor: '#5dbcd2',
      subColor: '#40408B',
      borderColor: '#40408B'
    };


    return (
      <View style={styles.scoreBox}>
          <View style={styles.scoreBoxInner}>

              <View style={styles.scoreBoxFilter}>
                    <View style={styles.scoreBoxFilterInner}>
                        <View style={styles.scoreBoardIconBox}>
                            <View style={styles.scoreBoardIconBoxInner}>
                                  <View style={styles.scoreBoardIconBoxInnerLeft}>
                                      <Image source={require('../assets/coin_1.png')} style={styles.scoreBoardIconBoxIcon}/>
                                  </View>
                                  <Text style={styles.scoreBoardIconBoxInnerRight}>
                                      {this.state.coin1}
                                  </Text>
                            </View>
                        </View>
                        <View style={styles.scoreBoardIconBox}>
                            <View style={styles.scoreBoardIconBoxInner}>
                                  <View style={styles.scoreBoardIconBoxInnerLeft}>
                                      <Image source={require('../assets/coin_2.png')} style={styles.scoreBoardIconBoxIcon}/>
                                  </View>
                                  <Text style={styles.scoreBoardIconBoxInnerRight}>
                                      {this.state.coin2}
                                  </Text>
                            </View>
                        </View>
                        <View style={styles.scoreBoardIconBox}>
                            <View style={styles.scoreBoardIconBoxInner}>
                                  <View style={styles.scoreBoardIconBoxInnerLeft}>
                                      <Image source={require('../assets/coin_3.png')} style={styles.scoreBoardIconBoxIcon}/>
                                  </View>
                                  <Text style={styles.scoreBoardIconBoxInnerRight}>
                                      {this.state.coin3}
                                  </Text>
                            </View>
                        </View>
                      </View>
                  </View>

                <View style={styles.scoreBoxFilter}>
                    <View style={styles.scoreBoxFilterInner}>
                        <TouchableHighlight style={(this.state.report_type== '')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.filterData('')}>
                                <Text style={(this.state.report_type== '')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['All']}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={(this.state.report_type== 'CD')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.filterData('CD')}>
                            <Text style={(this.state.report_type== 'CD')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['Today']}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={(this.state.report_type== 'CW')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.filterData('CW')}>
                            <Text style={(this.state.report_type== 'CW')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['Week']}</Text>
                        </TouchableHighlight>
                      </View>
                  </View>

                  <View style={styles.scoreBoxFilter}>
                    <View style={styles.scoreBoxFilterInner}>
                        <TouchableHighlight style={(this.state.report_type== 'CM')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.filterData('CM')}>
                            <Text style={(this.state.report_type== 'CM')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['Month']}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={(this.state.report_type== 'CY')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.filterData('CY')}>
                            <Text style={(this.state.report_type== 'CY')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['Year']}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={(this.state.report_type== 'CU')?styles.scoreBoxFilterItemSelected:styles.scoreBoxFilterItem} onPress={()=>this.openCalendar()}>
                            <Text style={(this.state.report_type== 'CU')?styles.scoreBoxFilterItemTextSelected:styles.scoreBoxFilterItemText}>{this.state.languageData['Custome_Date']}</Text>
                        </TouchableHighlight>
                    </View>
                  </View>
                  
                  <ScrollView  style={styles.scoreBoxTable}>
                      <View style={styles.tableHeader}>
                          <View style={styles.tableHeaderItem}>
                              <Text style={styles.tableHeaderItemText}>{this.state.languageData['serial_number']}</Text>
                          </View>
                          <View style={styles.tableHeaderItem}>
                              <Text style={styles.tableHeaderItemText}>{this.state.languageData['Date']}</Text>
                          </View>
                          <View style={styles.tableHeaderItem}>
                              <Text style={styles.tableHeaderItemText}>{this.state.languageData['Score']}</Text>
                          </View>
                      </View>
                      {this.scoreList()}

                      <Calendar
                      i18n="en"
                      ref={(calendar) => {this.calendar = calendar;}}
                      customI18n={customI18n}
                      color={color}
                      format="dd-mm-YYYY"
                      minDate="01-01-2020"
                      maxDate="31-12-2030"
                      // startDate="24-06-2020"
                      // endDate={this.state.currentDate}
                      onConfirm={({startDate, endDate})=>this.confirmDate(startDate, endDate)}
                    />
                  </ScrollView>
        </View>
     </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  scoreBox:{
    height:'100%',
  },
  scoreBoxInner:{
    flex:3,
    flexDirection: 'column',
  },
  tableHeader:{
    width:'100%',
    flex:3,
    flexDirection:'row',
  },
  tableHeaderItem:{
    width:'33.3%',
    backgroundColor:'#40408B',
    padding:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#40408B',
  },
  tableHeaderItemText:{
    color:'#FFF',
    textAlign:'center',
  },
  tableItemText:{
    color:'#333',
    textAlign:'center',
  },
  tableBoddyTyp1:{
    width:'100%',
    flex:3,
    flexDirection:'row',
  },
  tableBoddyTyp1Item:{
    width:'33.3%',
    // backgroundColor:'#FFF',
    padding:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#333',
  },
  tableBoddyTyp2:{
    flex:1,
  },
  tableBoddyTyp2Item:{
    width:'100%',
    borderBottomWidth:0.5,
    borderBottomColor:'#333',
  },
  tableBoddyTyp2ItemText:{
    color:'#333',
    textAlign:'center',
    padding:10,
  },
  scoreBoxFilter:{
    height:50,
  },
  scoreBoxFilterInner:{
    flex:3,
    flexDirection:'row',
  },
  scoreBoxTable:{
    height:'70%',
    // backgroundColor:'green',
  },
  scoreBoxFilterItemSelected:{
    width:'29%',
    height:'80%',
    margin:8,
    backgroundColor:'#40408B',
    borderWidth:0.5,
    borderColor:'#40408B',
    borderRadius:5,
    alignSelf:'center',
  },
  scoreBoxFilterItemTextSelected:{
    color:'#FFF',
    fontSize:14,
    padding:8,
    textAlign:'center',
    justifyContent: 'center',
    flex: 1,
  },
  scoreBoxFilterItem:{
    width:'29%',
    height:'80%',
    margin:8,
    backgroundColor:'#FFF',
    borderWidth:0.5,
    borderColor:'#40408B',
    borderRadius:5,
    alignSelf:'center',
  },
  scoreBoxFilterItemText:{
    color:'#40408B',
    fontSize:14,
    padding:8,
    textAlign:'center',
    justifyContent: 'center',
    flex: 1,
  },
  scoreBoardIconBox:{
    width:'28%',
    height:'80%',
    margin:10,
    alignSelf:'center',
  },
  scoreBoardIconBoxInner:{
    flex:2,
    flexDirection:'row',
  },
  scoreBoardIconBoxInnerLeft:{
    width:'50%',
    // backgroundColor:'orange',
  },
  scoreBoardIconBoxInnerRight:{
    width:'50%',
    alignSelf:'flex-start',
    fontSize:20,
    color:'#333',
    padding:5,
    // backgroundColor:'green',
  },
  scoreBoardIconBoxIcon:{
    height:45,
    width:50,
    borderRadius:25,
    alignSelf:'flex-end',
  }
});
