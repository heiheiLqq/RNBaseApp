import React, {Component} from 'react';
import { Navigator } from 'react-native';
import MainTabsView from './MainTabsView';
import BroswerView from './BroswerView';
import LoginView from './LoginView';
import CarDetailView from './CarDetailView'
import FindCarView from './FindCarView'
import FreePriceView from './FreePriceView'
import CarLifeView from './CarLifeView'
import SpecialCarView from './SpecialCarView'



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
      renderScene={this.renderScene}
      configureScene={this.configureScene}/>
  }
}

export default App;
