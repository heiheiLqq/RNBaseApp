import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions,
    TouchableOpacity

} from 'react-native';
let  cols = 2
let vMargin = 7
let screenWidth = Dimensions.get('window').width
let rowListWidth = (screenWidth- (cols+1)*vMargin)/cols

class FreePriceList extends Component {

    constructor(props) {
        super(props);


    }


    push = (index)=>{


        const {  navigator ,freePriceList} = this.props;

        var dic = freePriceList[index];


        navigator.push({
            name: 'car_detail_view',
            params:{
                id:dic.carId,
                detailType:0

            }
        });
        // navigator.pop();

    }

    
    render() {

        const {  freePriceList} = this.props;

        
        return (
            <View style={styles.list}>
                {
                    freePriceList.map((dic, i) => <TouchableOpacity style = {styles.item} onPress={()=> this.push(i)} key={i}>

                        <View style = {{flex:1,alignItems:'center'}} >
                            <View  style={styles.header}>
                                <Text>{dic.brandName}</Text>
                                <Text style = {styles.redColor}>省{dic.discount/10000}万元</Text>
                            </View>

                            <Text style={styles.price}>¥{dic.lowPrice/10000}万元</Text>
                            <Image style={styles.car_image} source={{ uri: dic.carImage}} />

                        </View>
                    </TouchableOpacity>) // 单行箭头函数无需写return
                }
            </View>
        );

    }

}
const styles = StyleSheet.create({

    redColor:{

        color:'red',
    },

    price:{

        color:'red',
        borderColor:'red',
        padding:5,
        borderWidth:1,
        borderRadius:15,
        marginTop:10

    },

    header:{
        flexDirection: 'row',
        // backgroundColor:'red',
        width:rowListWidth-20,

        justifyContent:'space-between',


    },


    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:'#e5e5e5'
    },
    item: {
        marginLeft: vMargin,
        marginTop: vMargin,

        width: rowListWidth,
        height: rowListWidth,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        padding:10

    },
    car_image:{

        width:150,
        height:80,
        marginTop:10

    }


})


export default FreePriceList;