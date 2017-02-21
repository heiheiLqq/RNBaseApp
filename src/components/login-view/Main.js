import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
    TextInput,
  TouchableHighlight, TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';


//import Actions from '../../actions';
//import { ACTIVE_OPACITY } from '../../constants/Theme';
let {height, width} = Dimensions.get('window');

class Main extends Component {


  render() {

    return (
        <View style={{flex: 1, padding: 20}}>


          <Text style ={styles.text}>
            Welcome to RNBaseAPP!
          </Text>
          <View style={styles.inputGroup}>
            <TextInput style={styles.formControl} placeholder="手机号" onChangeText={(text) => this.setState({phone: text})} />
          </View>
          <View style={styles.inputGroup}>
            <TextInput style={styles.formControl} placeholder="用户密码" onChangeText={(text) => this.setState({pass: text})} secureTextEntry />
          </View>
          <TouchableOpacity
              onPress={
              ()=>this.props.actions.logIn2(this.props.navigator)}
          >
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>


        </View>
    );
  }

}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }  ,
  inputGroup: {
    marginBottom:10,

  },

  formControl: {
    marginLeft:10,
    marginRight: 10,
    height:35,
    borderWidth:1,
    paddingLeft:2,
    borderColor:'#dddddd',
    backgroundColor: '#ffffff',
    fontSize:14,

  },
});


export default Main;
