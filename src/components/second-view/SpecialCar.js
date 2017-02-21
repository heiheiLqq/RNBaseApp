import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    Dimensions

} from 'react-native';

let screenWidth = Dimensions.get('window').width


class SpecialCar extends Component {

    constructor(props) {
        super(props);

    }




    render() {


        const {  specialCar} = this.props;


        return (
            
            <ScrollView style={styles.scroll} horizontal={true} pagingEnabled={true}>
                {
                    specialCar.map((dic, i) => <View style = {styles.item} key={i}>

                        <Image style={styles.car_image} source={(dic.carImage != null)?{ uri: dic.carImage}:require('../car-detail-view/img/carImage_default.png')} />

                        <View style={styles.content}>
                            <Text>{dic.brandName}{dic.carModelName}{dic.carName}</Text>

                            <Text style={styles.redColor}>特价:{dic.specialPrice/10000}万</Text>
                        </View>


                    </View>) // 单行箭头函数无需写return
                }
            </ScrollView>

        );

    }

}
const styles = StyleSheet.create({

    redColor:{

        marginTop:5,
        color:'red',
    },




    content:{
        width:screenWidth,
        height:50,
        padding:5
    },

    car_image:{
        width:screenWidth,
        height:150,
        // resizeMode: 'contain'


    },

    item:{
      
        width:screenWidth,
        height:200
        
    },

    scroll:{
        
        width:screenWidth,
        flexDirection:'row',
        height:200
        
        
    }

    


})


export default SpecialCar;