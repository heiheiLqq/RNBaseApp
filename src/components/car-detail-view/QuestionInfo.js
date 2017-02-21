import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions,
    TouchableHighlight


} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

class QuestionInfo extends Component {
    render() {

        return (
            <View style={[styles.one]}></View>

        );
    }
}

const styles = StyleSheet.create({
    one:{
        width:screenWidth,
        height:screenHeight-84,
        backgroundColor:'green'
    },
});

export default QuestionInfo;
