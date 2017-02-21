import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
    Platform,
} from 'react-native';
import {COLOR_GREEN} from '../../constants/Theme';

class TitleBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ( Platform.OS == 'ios')? 64:49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0894ec'
  },
  text: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 32/2
  }
});

export default TitleBar;



