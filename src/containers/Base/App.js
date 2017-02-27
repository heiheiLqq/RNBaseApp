import React, {Component} from 'react';
import {
  Navigator,
  Platform,
  BackAndroid,
  ToastAndroid,
} from 'react-native';
import MainTabsView from './MainTabsView';
import BroswerView from './../UserCenter/UserCenterView';
import LoginView from './../LoginAndRegister/LoginView';
import CarDetailView from './../GouCheHui/CarDetailView'
import FindCarView from './../GouCheHui/FindCarView'
import FreePriceView from './../GouCheHui/FreePriceView'
import CarLifeView from './../CarLife/CarLifeView'
import SpecialCarView from './../GouCheHui/SpecialCarView'



const ROUTES = {

  main_tabs_view: MainTabsView,
  login_view:LoginView,
  broswer_view: BroswerView,
  car_detail_view:CarDetailView,
  find_car_view:FindCarView,
  free_price_view:FreePriceView,
  car_life_view:CarLifeView,
  special_car_view:SpecialCarView,
}

class App extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
      // BackAndroid.addEventListener('sss',this.onBackAndroid,true);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const navigator = this.refs.navigator;
    const routers = navigator.getCurrentRoutes();
    console.log('当前路由长度：' + routers.length);
    if (routers.length > 2) {
      navigator.pop();
      return true;//接管默认行为
    } else {

      //到了主页了
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    // return false;//默认行为

  };

  renderScene = (route, navigator) => {
    let Scene = ROUTES[route.name];

    console.log("app renderscene");
    switch (route.name){
      case 'main_tabs_view':
        return <Scene navigator={navigator} tab={2}/>;
      case 'login_view':
        return <Scene navigator={navigator}/>;
      case 'broswer_view':
        return <Scene
          url={route.url}
          navigator={navigator}/>;
      case 'car_detail_view':
        return <Scene {...route.params} navigator={navigator}/>;
      case 'find_car_view':
        return <Scene navigator={navigator}/>;
      case 'free_price_view':
      return <Scene navigator={navigator}/>;
      case 'car_life_view':
        return <Scene navigator={navigator}/>;
      case 'special_car_view':
        return <Scene navigator={navigator}/>;
    }
  }
  configureScene = (route, routeStack) => {
    switch (route.name){
      default:
            return Navigator.SceneConfigs.PushFromRight;
    }
  }
  render() {
    return <Navigator
      initialRoute={{name: 'login_view'}}
      ref="navigator"
      renderScene={this.renderScene}
      configureScene={this.configureScene}/>
  }
}

export default App;
