import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    PixelRatio,
    TouchableWithoutFeedback,
    TouchableHighlight,
    InteractionManager

} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height
import CarLifeList from './CarLifeList'
import ScrollableTabView  from 'react-native-scrollable-tab-view';

class CarLife extends Component {

    constructor() {
        super();
        this.state={
            ceshi:false,
        }
    }
    
    changeTab=(obj)=>{
        var currentPage = obj.i;

        const  {actions,data,refresh} = this.props;

        requestAnimationFrame(() => {



            if(data[currentPage].length > 0){

                return
            }
            var typeId=0;

            if(currentPage==1){
                //美容
                typeId = 3;
            }else if(currentPage ==2){
                //装饰
                typeId = 4;
            }else if (currentPage == 3){
                //维修
                typeId = 8;
            }else{
                //全部
                typeId = 0;
            }

        actions.getLifeDataAndSowDataSource(
                {
                    'data':data,
                    'pid':1,
                    'typeId':typeId,
                    'index':currentPage,
                    'refresh':refresh,
                    'page':1
                }
            )



        });

    }

    render(){

        const  {data,refresh,actions} = this.props;

        return(
            <ScrollableTabView  style = {{width:screenWidth,height:screenHeight-64,backgroundColor:'#EBEBEB'}}
                                initialPage={0}
                                tabBarTextStyle={{fontSize: 14}}
                                tabBarUnderlineStyle={{backgroundColor: 'orange'}}
                                tabBarInactiveTextColor = "#999999" tabBarBackgroundColor = "white" tabBarActiveTextColor = "#333333"
                                onChangeTab={(obj) => this.changeTab(obj)}
            >
                <CarLifeList tabLabel='全部' actions={actions} pid={1} index={0} refresh={refresh} dataArr={data}></CarLifeList>
                <CarLifeList tabLabel='美容' actions={actions} pid={1} index={1} refresh={refresh} dataArr={data}></CarLifeList>
                <CarLifeList tabLabel='装饰' actions={actions} pid={1} index={2} refresh={refresh} dataArr={data}></CarLifeList>
                <CarLifeList tabLabel='维修' actions={actions} pid={1} index={3} refresh={refresh} dataArr={data}></CarLifeList>
            </ScrollableTabView>
        )

    }
}

const styles = StyleSheet.create({

    flex:{
      flex:1
    },

    selectItemNormal:{
        flex:1,
        padding:5,
        color:'gray',
        textAlign:'center',
        lineHeight:34
    },
    selectItemSelect:{
        flex:1,
        padding:5,
        color:'black',
        textAlign:'center',
        lineHeight:34,
    }
});

export default CarLife;



