import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity

} from 'react-native';

let  cols = 2
let vMargin = 7
let screenWidth = Dimensions.get('window').width
let rowListWidth = (screenWidth- (cols+1)*vMargin)/cols

class HotCarList extends Component {

    constructor(props) {
        super(props);

    }


    push = (index)=>{


        const {  navigator ,hotCarList} = this.props;

        let  dic = hotCarList[index];


        navigator.push({
            name: 'car_detail_view',
            params:{
                id:dic.carId,
                detailType:1

            }
        });
        // navigator.pop();

    }

    render() {

        const {  hotCarList} = this.props;
        
        return (
            <View style={styles.list}>
                {
                    hotCarList.map((dic, i) => <TouchableOpacity key={i} onPress={()=> this.push(i)} style={{marginTop: vMargin,marginLeft: vMargin, width: rowListWidth, height: rowListWidth,}}>
                        <View style = {styles.item} >
                            <Image style={styles.car_image} source={{ uri: dic.carModelImageUrl }} />
                            <Text>{dic.brandName}{dic.carModelName}</Text>
                            <Text>已有<Text style={{color:'red'}}>{dic.inquiryAmount}</Text>人询价</Text>

                        </View>
                    </TouchableOpacity>) // 单行箭头函数无需写return
                }
            </View>
            
        );

    }

}
const styles = StyleSheet.create({



    list: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:'#e5e5e5',
        marginBottom:vMargin
    },
    item: {
        // marginLeft: vMargin,
        width: rowListWidth,
        height: rowListWidth,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'

    },
    car_image:{

        width:150,
        height:100

    }


})


export default HotCarList;