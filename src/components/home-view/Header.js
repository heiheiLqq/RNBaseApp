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
      <View style={styles.container}>
        <Image style={styles.bg}
              source={require('./img/chalkboard.png')}>
          <Image style={styles.img} source={require('./img/todo.png')}/>
          <Text style={[styles.text, styles.title]}>
            Todo
          </Text>
          <Text style={[styles.text, styles.subTitle]}>
            React+Redux DEMO for React Native Training
          </Text>
          <Image style={styles.add} source={require('./img/border_color.png')}/>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 480/2,
  },
  bg: {
    flex: 1,
    height: 480/2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  img: {
    width: 100,
    height: 100
  },
  text: {
    paddingTop: 10/2,
    color: '#fff',
    fontSize: 30/2
  },
  title: {
    fontSize: 80/2
  },
  subTitle: {
    fontSize: 20/2,
    fontStyle: 'italic'
  },
  add: {
    position: 'absolute',
    right: 8,
    bottom: 8
  }
});

export default Header;
