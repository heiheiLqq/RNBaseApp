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

class BuyInfo extends Component {
    render() {

        return (
            <View style={[styles.one]}>
                <Image style={{width:screenWidth,height:400,resizeMode: 'cover'}} source={ require('./img/need.png')} />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    one:{
        width:screenWidth,
        height:screenHeight-84,
        backgroundColor:'#EBEBEB'
    },
});

export default BuyInfo;
