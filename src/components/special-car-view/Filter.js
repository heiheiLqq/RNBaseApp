import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity

} from 'react-native';

let screenWidth = Dimensions.get('window').width


class Filter extends Component {

    constructor(props) {
        super(props);

    }




    render() {




        return (

            <View style={{width:screenWidth,height:44,flexDirection:'row',backgroundColor:'white',paddingTop:10,paddingBottom:10}}>
                <TouchableOpacity style={{flex:1}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightColor:'#EBEBEB',borderRightWidth:1}}>
                        <Text>价格</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>优惠幅度</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );

    }

}
const styles = StyleSheet.create({






})


export default Filter;