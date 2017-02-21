import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');




class Header extends Component {
  render() {
    return (

        <View style = {styles.banner }>

        </View>
    );
  }
}

const styles = StyleSheet.create({

  banner:{
    backgroundColor:'blue',
    width : width,
    height:22,
  }

  //container: {
  //  height: 480/2,
  //},
  //bg: {
  //  flex: 1,
  //  height: 480/2,
  //  width: width,
  //  justifyContent: 'center',
  //  alignItems: 'center',
  //  backgroundColor: '#000000'
  //},
  //img: {
  //  width: 100,
  //  height: 100
  //},
  //text: {
  //  paddingTop: 10/2,
  //  color: '#fff',
  //  fontSize: 30/2
  //},
  //title: {
  //  fontSize: 80/2
  //},
  //subTitle: {
  //  fontSize: 20/2,
  //  fontStyle: 'italic'
  //}
});

export default Header;
