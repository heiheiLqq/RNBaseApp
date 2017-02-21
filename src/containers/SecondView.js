import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TitleBar from '../components/common/TitleBar';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions

} from 'react-native';
import {
    Header,
    Main,
    Banner,
    HotCarList,
    FreePriceList,
    CarShowBanner,
    SpecialCar,
    ToolBar
} from '../components/second-view';
import Actions from '../actions';


class SecondView extends Component {

  constructor(props) {
    super(props);

  }


  componentDidMount() {

    this.props.actions.getBannerSource({});

    this.props.actions.getHotCarSource({});

    this.props.actions.getFreePriceListSource({});

    this.props.actions.getCarShowBannerSource({});

    this.props.actions.getSpecialCarSource({});



  }

  render() {

    const {  banner ,hotCarList,freePriceList,carShowBanner,specialCar,navigator} = this.props;


    //console.log("render-----",banner);
    //console.log("render-----",hotCarList);

    return (

        <View style={{ flex: 1, backgroundColor:'#EBEBEB'}}>
            <TitleBar title="react-native-mobile"></TitleBar>
            <ScrollView >
                <Banner banner={banner}></Banner>
                <ToolBar navigator={navigator}></ToolBar>
                <Text style={styles.title}>免费看低价</Text>
                <FreePriceList  navigator={navigator} freePriceList={freePriceList}></FreePriceList>

                {/* <Text style={styles.title}>特价车</Text> */}
                {/* <SpecialCar specialCar={specialCar}></SpecialCar> */}
                <Text style={styles.title}>车主秀</Text>
                <CarShowBanner carShowBanner={carShowBanner}></CarShowBanner>

                <Text style={styles.title}>热门推荐</Text>
                <HotCarList hotCarList={hotCarList} navigator={navigator}></HotCarList>
            </ScrollView>
        </View>


    )
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  title:{

    textAlign:'center',
    backgroundColor:'#e5e5e5',
    padding:5
  }

});

function mapStateToProps(state) {



  return {
    banner: state.secondView.banner,
    hotCarList:state.secondView.hotCarList,
    freePriceList:state.secondView.freePriceList,
    carShowBanner:state.secondView.carShowBanner,
    specialCar:state.secondView.specialCar
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
)(SecondView);
