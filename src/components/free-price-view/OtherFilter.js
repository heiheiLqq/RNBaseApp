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
    TouchableOpacity,
    InteractionManager

} from 'react-native';
let screenWidth = Dimensions.get('window').width*0.8
let screenHeight = Dimensions.get('window').height


let rowMargin = 8;
let row =3;
let columnMargin = 5
let rowWidth = (screenWidth - (row+1)*rowMargin)/row;
let rowHeight = 35
class OtherFilter extends Component {

    constructor(props) {
        super(props);

        this.priceArr = [
            {
                id:0,
                price:"不限",
                min:'0',
                max:'10000000000'
            },
            {
                id:1,
                price:"8万以下",
                min:'0',
                max:'80000'
            },
            {
                id:2,
                price:"8-10万",
                min:'80000',
                max:'100000'
            },
            {
                id:3,
                price:"10-15万",
                min:'100000',
                max:'150000'
            },
            {
                id:4,
                price:"15-20万",
                min:'150000',
                max:'200000'
            },
            {
                id:5,
                price:"20-30万",
                min:'200000',
                max:'300000'
            },
            {
                id:6,
                price:"30-50万",
                min:'300000',
                max:'500000'
            },
            {
                id:7,
                price:"50-80万",
                min:'500000',
                max:'800000'
            },
            {
                id:8,
                price:"80万以上",
                min:'800000',
                max:'100000000'
            },

        ]
        this.state={

            priceSelect:0,
            carTypeSelect:0,

        }

    }
    fliterClick=()=>{
        this.props.closeModalParent();

        const {carType,actions,car,brandId} = this.props;
        InteractionManager.runAfterInteractions(() => {
        
            var carTypeId = carType[this.state.carTypeSelect].carTypeId;
            var minPrice = this.priceArr[this.state.priceSelect].min;
            var maxPrice = this.priceArr[this.state.priceSelect].max;
            var pageNumber =1
            actions.getFreeCarSource({pageNumber,car,brandId,minPrice,maxPrice,carTypeId});
        })
    }
    priceClick=(index)=>{
        this.setState({priceSelect: index});

    }
    carTypeClick=(index)=>{
        this.setState({carTypeSelect: index});

    }
    render(){

        const {carType} = this.props;

        return(
            <View style={{flex:1,backgroundColor:'#EBEBEB',position:'relative'}}>
                <Text style={{width:screenWidth,height:44,lineHeight:44,textAlign:'center',backgroundColor:'white'}}>更多条件</Text>
                <Text style={{padding:rowMargin,marginTop:rowMargin}}>价格区间</Text>
                <View style={{width:screenWidth,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        this.priceArr.map((dic, i) => <TouchableOpacity key={i} onPress={()=>{this.priceClick(i)}}  style={{marginLeft:rowMargin,marginTop:columnMargin,width:rowWidth,height:rowHeight}}>
                            <Text style={i==this.state.priceSelect?{flex:1,lineHeight:rowHeight,textAlign:'center',backgroundColor:'orange',color:'white'}:{flex:1,lineHeight:rowHeight,textAlign:'center',backgroundColor:'white',color:'#999999'}}>{dic.price}</Text>
                        </TouchableOpacity>) // 单行箭头函数无需写return
                    }
                </View>
                <Text style={{padding:rowMargin,marginTop:rowMargin}}>车型</Text>
                <View style={{width:screenWidth,flexDirection:'row',flexWrap:'wrap'}}>
                    {
                        carType.map((dic, i) => <TouchableOpacity key={i} onPress={()=>{this.carTypeClick(i)}}  style={{marginLeft:rowMargin,marginTop:columnMargin,width:rowWidth,height:rowHeight}}>
                            <Text style={i==this.state.carTypeSelect?{flex:1,lineHeight:rowHeight,textAlign:'center',backgroundColor:'orange',color:'white'}:{flex:1,lineHeight:rowHeight,textAlign:'center',backgroundColor:'white',color:'#999999'}}>{dic.carTypeName}</Text>
                        </TouchableOpacity>) // 单行箭头函数无需写return
                    }
                </View>
                <View style={{width:screenWidth,backgroundColor:'white',height:44,flexDirection:'row-reverse',position:'absolute',bottom:0}}>
                    <TouchableOpacity onPress={()=>{this.fliterClick()}}>
                        <Text style={{backgroundColor:'orange',height:44,lineHeight:44,color:'white',width:rowWidth,textAlign:'center'}}>
                            确定
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({



});

export default OtherFilter;
