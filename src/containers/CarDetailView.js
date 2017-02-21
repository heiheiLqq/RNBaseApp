import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TitleBar from '../components/common/TitleBar';

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
import {

    CarDetail,
    BuyInfo,
    QuestionInfo,
} from '../components/car-detail-view';
import Actions from '../actions';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

import ScrollableTabView  from 'react-native-scrollable-tab-view';


class CarDetailView extends Component {

    constructor(props) {
        super(props);

        this.state={

            // selectItem:0,
            renderPlaceholderOnly: true

        }
    }




    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });


        let id = this.props.id;
        let detailType = this.props.detailType
        this.props.actions.getColorSource({id,detailType});

    }
    // selectItemClick= (scrollView,index)=>{
    //     requestAnimationFrame(() => {
    //         scrollView.scrollTo({x: screenWidth*index,animated:false});
    //         this.setState({
    //             selectItem :index,
    //         });
    //     });
    //
    // }

    ceshi(scroll){
        

    }

    // render(){
    //     if (this.state.renderPlaceholderOnly) {
    //         return this._renderPlaceholderView();
    //     }
    // }
    _renderPlaceholderView() {
        return (
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center',}}>
                <Text>Loading...</Text>
            </View>
        );
    }

    render() {


        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        const {  interiorColorList , exteriorColorList,carData,actions,id,detailType} = this.props;


        var _scrollView: ScrollView;

        if(carData.brandName == null || carData.brandName ==undefined){
            carData.brandName = '';
        }

        if(carData.carModelName == null || carData.carModelName ==undefined){

            carData.carModelName='';
        }


        return (

            <View style={{ flex: 1, backgroundColor:'white'}}>
                <TitleBar title={carData.brandName+carData.carModelName}></TitleBar>

                <ScrollableTabView  style = {{width:screenWidth,height:screenHeight-64,backgroundColor:'#EBEBEB'}}
                                    initialPage={0}
                                    tabBarTextStyle={{fontSize: 14}}
                                    tabBarUnderlineStyle={{backgroundColor: 'orange'}}
                                    tabBarInactiveTextColor = "#999999" tabBarBackgroundColor = "white" tabBarActiveTextColor = "#333333"

                >

                    <CarDetail tabLabel='车辆详情' id={id} detailType={detailType} actions={actions} carData={carData} interiorColorList={interiorColorList} exteriorColorList={exteriorColorList}></CarDetail>
                    <BuyInfo tabLabel='购买须知'></BuyInfo>
                    <QuestionInfo tabLabel='问题咨询'></QuestionInfo>
                </ScrollableTabView>


            </View>


        )
    }


}
const styles = StyleSheet.create({

    buttonNormal:{
        textAlign:'center',
        padding:5,
        flex:1,
    },
    buttonSelect:{
        textAlign:'center',
        padding:5,
        flex:1,
        color:'#2194fe',

    },

    scrollView:{

        flexDirection:'row',
    },

    flex:{
        flex:1,
    },
    flexDirection:{
        flexDirection: 'row',

    },
    selectBox:{

        padding:5,
        height:40,


    },
    selectItem:{

        textAlign:'center',
        padding:5,

    },

});

function mapStateToProps(state) {


    return {

        interiorColorList:state.carDetail.interiorColorList,
        exteriorColorList:state.carDetail.exteriorColorList,
        carData:state.carDetail.carData,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarDetailView);

