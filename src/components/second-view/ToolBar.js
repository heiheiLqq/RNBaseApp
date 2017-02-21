/**
 * Created by zzh on 16/11/16.
 */
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

var ITEMARR=[

    {
        title:'找车',
        img:require('./img/logo-findCar.png')

    },
    {
        title:'免费看低价',
        img:require('./img/log-freeCar.png')
    },
    // {
    //     title:'特价车',
    //     img:require('./img/logo-specialCar.png')
    // },
    {
        title:'车生活',
        img:require('./img/logo-carDay.png')
    },
    {
        title:'个人中心',
        img:require('./img/logo-userCenter.png')
    }

]

class ToolBar extends Component {

    constructor(props) {
        super(props);

    }



    test = (index)=>{


        const {  navigator } = this.props;
        if(index == 0){

            navigator.push({
                name: 'find_car_view',

            });


        } else if(index ==1){
            navigator.push({
                name: 'free_price_view',

            });

        }else if(index == 2){

            navigator.push({
                name: 'car_life_view',

            });
        }

        // if(index == 0){
        //
        //     navigator.push({
        //         name: 'find_car_view',
        //
        //     });
        //
        //
        // } else if(index ==1){
        //     navigator.push({
        //         name: 'free_price_view',
        //
        //     });
        //
        // }else if (index == 2){
        //
        //     navigator.push({
        //         name: 'special_car_view',
        //
        //     });
        // } else if(index == 3){
        //
        //     navigator.push({
        //         name: 'car_life_view',
        //
        //     });
        // }




    }

    render() {

        var list = [];
        for(let i in ITEMARR){

            var dic = ITEMARR[i];
            list.push(
                <TouchableOpacity style={{ flex: 1, }} onPress={()=> this.test(i)} key={i}>

                 <View  style={styles.item}>
                    <Image
                        style={styles.icon}
                        source={dic.img}
                    />
                    <Text>{dic.title}</Text>
                </View>
                </TouchableOpacity>

                    )


        }


        return (

            <View style={styles.container}>
                {list}

            </View>

        );

    }

}
const styles = StyleSheet.create({

    icon:{

        width:30,
        resizeMode:'contain'
    },

    item:{

        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:8,
    },

    container:{

        width:screenWidth,
        flexDirection: 'row',
        backgroundColor:'white'


    }

})


export default ToolBar;
