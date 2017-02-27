import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';
import HomeView from './../CarService/CarServiceHomeView';
import UserCenterView from './../UserCenter/UserCenterView';
import GouCheHuiView from './../GouCheHui/GouCheHuiView';
import CarLifeView from './../CarLife/CarLifeView';

import Actions from '../../actions';
import TabNavigator from 'react-native-tab-navigator';
let {height, width} = Dimensions.get('window');

class MainTabsView extends Component {
  handleSwitchTab = (idx)=>{
    this.props.actions.switchMainTab(idx);
  }
  render() {
    const { navigator, tab } = this.props;

    return (
      <TabNavigator
        tintColor="#fb192b"
        unselectedTintColor="#b2b2b2"
        style={styles.container}>
        <TabNavigator.Item
          style={styles.item}
          title="汽车服务"
          selected={tab === 0}
          onPress={()=> this.handleSwitchTab(0)}
          renderIcon={() => <Image source={require('../../components/main-tabs-view/img/home.png') }/>}
          renderSelectedIcon={() => <Image source={require('../../components/main-tabs-view/img/home_filled.png') }/>}
          >
          <HomeView navigator={navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item
            style={styles.item}
            title="购车惠"
            selected={tab === 1}
            onPress={()=> this.handleSwitchTab(1)}
            renderIcon={() => <Image source={require('../../components/main-tabs-view/img/home.png') }/>}
            renderSelectedIcon={() => <Image source={require('../../components/main-tabs-view/img/home_filled.png') }/>}
        >
          <GouCheHuiView navigator={navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item
            title="车生活"
            selected={tab ===2}
            onPress={()=> this.handleSwitchTab(2)}
            renderIcon={() => <Image source={require('../../components/main-tabs-view/img/home.png') }/>}
            renderSelectedIcon={() => <Image source={require('../../components/main-tabs-view/img/home_filled.png') }/>}
        >
          <CarLifeView navigator={navigator}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="个人中心"
          selected={tab ===3}
          onPress={()=> this.handleSwitchTab(3)}
          renderIcon={() => <Image source={require('../../components/main-tabs-view/img/home.png') }/>}
          renderSelectedIcon={() => <Image source={require('../../components/main-tabs-view/img/home_filled.png') }/>}
          >
          <UserCenterView navigator={navigator} url="http://www.gouchehui.com" title="React Native Training"/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: height-49
  },
  itemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    tab: state.navigation.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabsView);
