import React, { Component } from 'react';
import { Dimensions, Animated, AsyncStorage, StatusBar, BackHandler, Alert, View, Text, TouchableOpacity } from 'react-native';
import { Router, Scene, ActionConst, Actions } from 'react-native-router-flux';
import MyDevice from 'expo-constants';
import axios from 'axios';

import Language from './Language.js';
import Login from './Login.js';
import LoginPassword from './LoginPassword';
import LoginSetPassword from './LoginSetPassword';
import Loginotp from './Loginotp.js';
import LoginBackButton from './LoginBackButton.js';
import Dashboard from './Dashboard.js';
import ScoreBoard from './ScoreBoard.js';
import RangeSelecter from './RangeSelecter.js';
import CameraUpload from './CameraUpload.js';
// import MyAppointment from './MyAppointment.js';
import QuestionsSummary from './QuestionsSummary.js';
import Questions from './Questions.js';
import QuestionsHelp from './QuestionsHelp.js';
import Profile from './Profile.js';
import WhyThisApp from './WhyThisApp.js';
import Notification from './Notification.js';
import ProfileEdit from './ProfileEdit.js';


import PageWhyThisApp from './PageWhyThisApp.js';
import PageHowToUseThisApp from './PageHowToUseThisApp.js';
import PageDisclaimer from './PageDisclaimer.js';
import PageTermsAndConditions from './PageTermsAndConditions.js';
import PageFaq from './PageFaq.js';

import Aboutus from './Aboutus.js';
import LanguageChange from './LanguageChange.js';
import Logout from './Logout.js';
import AndroidBack from './AndroidBack';

console.disableYellowBox = true;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deviceCheck: false,
      loggenIn: false
    }

  }

  async componentDidMount() {
    // await AsyncStorage.removeItem('AuthoKey');
    // await AsyncStorage.removeItem('DeviceId');
    /* Set common Base URL */
    const baseURL = "https://doctor.a-bits.com/index.php/";
    AsyncStorage.setItem('baseURL', baseURL);

    const baseURLImage = "https://doctor.a-bits.com/";
    AsyncStorage.setItem('baseURLImage', baseURLImage);

    this.setState({ DeviceId: MyDevice.deviceId });
    AsyncStorage.setItem('DeviceId', MyDevice.deviceId);

    // console.log(MyDevice.deviceId);
    const params = new URLSearchParams();
    params.append('device_id', MyDevice.deviceId);
    //console.log(baseURL+'api/checkDeviceStatus',params)
    axios.post(baseURL + 'api/checkDeviceStatus', params)
      .then(response => {
        let resVal = response.data;
        console.log(JSON.stringify(resVal))
        // console.log(resVal);
        if (resVal.status == 'success' && resVal.login_status == 'Yes') {
          AsyncStorage.setItem('AuthoKey', resVal.user_id);

          if (!resVal.language_id) {
            AsyncStorage.setItem('language', JSON.stringify(3));
          } else {
            AsyncStorage.setItem('language', resVal.language_id);
          }
          this.setState({ loggenIn: true });
        }

        this.setState({ deviceCheck: true });
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      })

  }


  render() {

    if (this.state.deviceCheck == false)
      return null;
    return (
      <View style={{ flex: 1 }}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key={'language'} component={Language} title="Language" initial={!this.state.loggenIn} />
            <Scene key={'login'} component={Login} title="Login" />
            <Scene key={'loginpassword'} component={LoginPassword} title="LoginPassword" />
            <Scene key={'loginsetpassword'} component={LoginSetPassword} title="LoginSetPassword" />
            <Scene key={'loginotp'} component={Loginotp} title="Loginotp" />
            <Scene key={'loginbackbutton'} component={LoginBackButton} title="LoginBackButton" />
            <Scene key={'dashboard'} component={Dashboard} title="Dashboard" type={ActionConst.RESET} initial={this.state.loggenIn} />
            <Scene key={'scoreBoard'} component={ScoreBoard} title="ScoreBoard" />
            <Scene key={'rangeselecter'} component={RangeSelecter} title="RangeSelecter" />

            <Scene key={'cameraUpload'} component={CameraUpload} title="CameraUpload" />
            <Scene key={'questionsSummary'} component={QuestionsSummary} title="QuestionsSummary" />
            <Scene key={'questions'} component={Questions} title="Questions" />
            <Scene key={'questionshelp'} component={QuestionsHelp} title="QuestionsHelp" />
            <Scene key={'profile'} component={Profile} title="Profile" />
            <Scene key={'whythisapp'} component={WhyThisApp} title="WhyThisApp" />
            <Scene key={'notification'} component={Notification} title="Notification" />



            <Scene key={'profileedit'} component={ProfileEdit} title="ProfileEdit" />

            <Scene key={'pagewhythisapp'} component={PageWhyThisApp} title="PageWhyThisApp" />
            <Scene key={'pagehowtousethisapp'} component={PageHowToUseThisApp} title="PageHowToUseThisApp" />
            <Scene key={'pagedisclaimer'} component={PageDisclaimer} title="PageDisclaimer" />
            <Scene key={'pagetermsandconditions'} component={PageTermsAndConditions} title="PageTermsAndConditions" />
            <Scene key={'pagefaq'} component={PageFaq} title="PageFaq" />

            <Scene key={'aboutus'} component={Aboutus} title="Aboutus" />
            <Scene key={'languageChange'} component={LanguageChange} title="LanguageChange" />

            <Scene key={'logout'} component={Logout} title="Logout" type={ActionConst.RESET} />
            {/* <Scene key={'category'} component={Category} title = "Category" /> */}
            {/* <Scene key={'myappointment'} component={MyAppointment} title = "MyAppointment" /> */}
            {/* <Scene key={'offers'} component={Offers} title = "Offers"/> */}
            {/* <Scene key={'testimonial'} component={Testimonial} title = "Testimonial"/> */}
            {/* <Scene key={'branch'} component={Branch} title = "Branch" /> */}
            {/* <Scene key={'branchselect'} component={BranchSelect} title = "BranchSelect" /> */}
            {/* <Scene key={'wallet'} component={Wallet} title = "Wallet"/> */}
            {/* <Scene key={'walletcashadd'} component={WalletCashAdd} title = "WalletCashAdd"/> */}
            {/* <Scene key={'payment'} component={Payment} title = "Payment"/> */}
            {/* <Scene key={'paymentcart'} component={PaymentCart} title = "PaymentCart"/> */}
            {/* <Scene key={'cart'} component={Cart} title = "Cart" /> */}
            {/* <Scene key={'orderselectbranch'} component={OrderSelectBranch} title = "OrderSelectBranch" /> */}
            {/* <Scene key={'orderselectdate'} component={OrderSelectDate} title = "OrderSelectDate" /> */}
            {/* <Scene key={'preview'} component={Preview} title = "Preview" /> */}
            {/* <Scene key={'history'} component={History} title = "History"/> */}
            {/* <Scene key={'appdetails'} component={AppDetails} title = "AppDetails"/> */}
            {/* <Scene key={'gallery'} component={Gallery} title = "Gallery"/> */}
            {/* <Scene key={'androidBack'} component={AndroidBack} /> */}
          </Scene>
        </Router>
      </View>
    )
  }
}

export default App;