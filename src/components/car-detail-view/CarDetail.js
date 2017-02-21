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
    Button,
    TouchableOpacity


} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height




class CarDetail extends Component {

    constructor(props) {
        super(props);

        this.state={

            selectInteriorColor:0,
            selectExteriorColor:0,


        }
        this.questionArr = [
            {
                tip:'Q1',
                quesetion:'购车惠的底价是4s店提供的么?'

            },
            {
                tip:'Q2',
                quesetion:'购车惠的底价是4s店提供的么?'

            },
            {
                tip:'Q3',
                quesetion:'购车惠的底价是4s店提供的么?'

            },
            {
                tip:'Q4',
                quesetion:'购车惠的底价是4s店提供的么?'

            },
            {
                tip:'Q5',
                quesetion:'购车惠的底价是4s店提供的么?'

            },

        ]
    }
    selectInteriorColor= (index)=>{
        requestAnimationFrame(() => {
            this.setState({
                selectInteriorColor :index,
            });

            const {  interiorColorList,exteriorColorList,actions ,id,detailType} = this.props;

            let inId = interiorColorList[index].id;
            let outId = exteriorColorList[this.state.selectExteriorColor].id;


            actions.getCarInfo({outId,inId,id,detailType});
        });

        


    };
    selectExteriorColor= (index)=>{

        requestAnimationFrame(() => {
            this.setState({
                selectExteriorColor :index,
            });
            const {  interiorColorList,exteriorColorList,actions,id,detailType} = this.props;

            let inId = interiorColorList[this.state.selectInteriorColor].id;
            let outId = exteriorColorList[index].id;


            actions.getCarInfo({outId,inId,id,detailType});
        });
        

    };

    render() {

        const {  interiorColorList,exteriorColorList,carData} = this.props;

        if(carData.carName == null || carData.carName ==undefined){
            carData.carName = '';
        }
        
        if(carData.authPrice == null || carData.authPrice ==undefined){
            carData.authPrice=0;
        }
        
        if(carData.lowPrice == null || carData.lowPrice == undefined){
            carData.lowPrice = 0;
        }

        return (

            <View style={{flex:1,position : 'relative'}}>
                <ScrollView style={styles.scrollView}>
                    <Image style={{flex:1,width:screenWidth,height:200,resizeMode: 'contain'}} source={(carData.carImage==null || carData.carImage==undefined)?require('./img/carImage_default.png'): { uri: carData.carImage}} />

                    <View style={styles.itemBox}>
                        <View style={{flex:4,marginTop:10}}><Text>{carData.carName}</Text></View>
                        <View style={{flex:1,marginTop:10}}></View>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={{flex:1,marginTop:10}}>官方价格:{carData.authPrice/10000}万</Text>
                        <Text style={{flex:1,textAlign:'right',marginTop:10}}>购车惠特价:{carData.lowPrice/10000}万</Text>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={{flex:1,marginTop:10}}>落地价:</Text>
                        <Text style={{flex:1,textAlign:'right',marginTop:10}}>{carData.lowPrice}元</Text>
                    </View>
                    <View style={styles.itemBox}>
                        <View style={styles.colorTitle}><Text>外观颜色</Text></View>
                        <View style={styles.colorContent}>
                            {
                                exteriorColorList.map((dic, i) => {
                                    var color = dic.colorValue;
                                    var colorArr = color.split(' ');
                                    var doubleColor1,doubleColor2;
                                    if(colorArr.length ==2){

                                        doubleColor1 = colorArr[0];
                                        doubleColor2 = colorArr[1];

                                    }else {
                                        doubleColor1 = color;
                                        doubleColor2 = "rgba(0,0,0,0)";

                                    }
                                    return (<TouchableOpacity key={i} style={styles.colorTouch} onPress={() => this.selectExteriorColor(i)}>
                                        <View    style={this.state.selectExteriorColor==i?[styles.colorSelect,{backgroundColor:doubleColor1}]:[styles.colorNormal,{backgroundColor:doubleColor1}]}>
                                            <View style={{flex:1}}></View>
                                            <View style={{flex:1, backgroundColor:doubleColor2}}></View>
                                        </View>
                                    </TouchableOpacity>) // 多行箭头函数需要加括号和return
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.itemBox}>
                        <View style={styles.colorTitle}><Text>内饰颜色</Text></View>
                        <View style={styles.colorContent}>
                            {
                                interiorColorList.map((dic, i) => {

                                    var color = dic.colorValue;
                                    var colorArr = color.split(' ');
                                    var doubleColor1,doubleColor2;
                                    if(colorArr.length ==2){

                                        doubleColor1 = colorArr[0];
                                        doubleColor2 = colorArr[1];

                                    }else {
                                        doubleColor1 = color;
                                        doubleColor2 = "rgba(0,0,0,0)";

                                    }

                                    return (<TouchableOpacity  key={i}  style={styles.colorTouch} onPress={() => this.selectInteriorColor(i)}>
                                        <View   style={this.state.selectInteriorColor==i?[styles.colorSelect,{backgroundColor:doubleColor1}]:[styles.colorNormal,{backgroundColor:doubleColor1}]}>
                                            <View style={{flex:1}}></View>
                                            <View style={{flex:1, backgroundColor:doubleColor2}}></View>
                                        </View>
                                    </TouchableOpacity>)  // 多行箭头函数需要加括号和return
                                })
                            }
                        </View>
                    </View>
                    <Image style={{width:screenWidth,height:700,resizeMode: 'contain'}} source={ require('./img/background_img.png')} />

                    {
                        this.questionArr.map((dic, i) => <View key={i} style={styles.itemBox}>
                            <Text style={{color:'orange',marginTop:10}}>
                                {dic.tip}
                            </Text>
                            <Text style={{color:'gray',marginTop:10,marginLeft:10}}>
                                {dic.quesetion}
                            </Text>
                        </View>)  // 单行箭头函数无需写return
                    }

                    <View style={{width:screenWidth,height:44}}></View>
                </ScrollView>
                <View style={{position : 'absolute',bottom:0,left:0,right:0,height:44,flexDirection:'row',backgroundColor:'white'}}>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                            <Image style={{width:20,height:20,resizeMode: 'contain'}} source={require('./img/icon-follow.png')} />

                            <Text style={{marginLeft:5}}>关注</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                            <Image style={{width:20,height:20,resizeMode: 'contain'}} source={require('./img/icon-share.png')} />

                            <Text style={{marginLeft:5}}>分享</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:2}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'orange'}}>
                            <Text style={{color:'white'}}>一键询价</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({

    toolbarItem:{
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'#EBEBEB'

    },

    toolbar:{

        width:screenWidth,
        height:44,
        flexDirection:'row',
        position : 'relative',
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'white'

    },

    colorTouch:{
        width:20,
        height:20,
        marginRight:10 ,
        marginTop:10
    },

    colorNormal:{
        borderWidth:1,
        borderColor:'#EBEBEB',
        flex:1
    },
    colorSelect:{
        borderWidth:1,
        borderColor:'orange',
        flex:1
    },

    colorContent:{

        flex:2,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-end'
    },


    colorTitle:{

        flex:1,
        marginTop:10,

    },
    itemBox:{

        width:screenWidth,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:'#EBEBEB',
        borderBottomWidth:1,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,



    },

    scrollView:{

        backgroundColor:'white',

    },

});

export default CarDetail;
