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
    InteractionManager,
    Platform,
    Easing,
    Animated,
    PanResponder



} from 'react-native';
import {
    Condition,
    Brand,
    
} from '../components/find-car-view';
import Actions from '../actions';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

var modalHeight = (Platform.OS == 'ios')? (screenHeight- 64):(screenHeight- 49)
var navigatorHeight = (Platform.OS == 'ios')?64:49
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer'

class FindCarView extends Component {


    //初始化
    constructor(props) {
        super(props);


        this._renderRowModal = this._renderRowModal.bind(this);
        this._renderRowCar = this._renderRowCar.bind(this);


        this.state={

            renderPlaceholderOnly:true,

            
        }
        this.dataSourceModal = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.dataSourceCar = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    
    //页面进去时
    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.props.actions.getBrandSource({});

        });

    }
    

    //返回loading
    _renderPlaceholderView() {
        return (
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center',}}>
                <Text>Loading...</Text>
            </View>
        );
    }

    //车型点击事件
    selectModal=(index)=>{
        requestAnimationFrame(() => {
            const { modal,actions} = this.props;

            var dic = modal[index];
            var id = dic.carModelId;

            actions.getCarSource({id});

            this._scrollView.scrollTo({x: (screenWidth -80),animated:true});
        });



    }

    //车款点击事件
    selectCar=(index)=>{



        requestAnimationFrame(() => {
            this._scrollView.scrollTo({x: 0,animated:false});




            const {  navigator ,car} = this.props;


            this.closeControlPanel();

            var dic = car[index];


            navigator.push({
                name: 'car_detail_view',
                params:{
                    id:dic.carId,
                    //免费看底价0 找车1 特价车 2
                    detailType:1
                }
            });

        });



    }

    _renderRowModal(rowData,sectionID,rowID,highlightRow){
        if(rowData.carModelImageUrl == null){
            rowData.carModelImageUrl=undefined;
        }
        return(
            <TouchableOpacity key={rowID} onPress={() => {this.selectModal(rowID)}}>
                <View style={{width:screenWidth -80,flexDirection:'row',padding:5,marginTop:5}}>
                    <Image style={{width:100,height:50}} source={{ uri: rowData.carModelImageUrl}}/>

                    <View style={{width:screenWidth *0.8-100,height:50,borderBottomColor:'#EBEBEB',borderBottomWidth:1}}>
                        <Text style={{color:'#333333',marginLeft:5,fontSize:18}}>{rowData.brandName}{rowData.carModelName}</Text>
                        <Text style={{color:'red',marginLeft:5,marginTop:5,fontSize:14}}>{rowData.minCarPrice/10000}-{rowData.maxCarPrice/10000}万</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
    _renderRowCar(rowData,sectionID,rowID,highlightRow){
        if(rowData.carImage == null){
            rowData.carImage=undefined;
        }
        return(
            <TouchableOpacity key={rowID} onPress={() => {this.selectCar(rowID)}}>
                <View style={{width:screenWidth *0.8,flexDirection:'row',padding:5,marginTop:5}}>
                    <Image style={{width:100,height:50}} source={{ uri: rowData.carImage}}/>

                    <View style={{width:screenWidth*0.8 -100,height:50,borderBottomColor:'#EBEBEB',borderBottomWidth:1}}>
                        <Text style={{color:'#333333',marginLeft:5}}>{rowData.carName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
    _renderHeaderModal(){
        return(
            <Text style={{textAlign:'center',height:50,lineHeight:50}}>选择车型</Text>
        )
    }
    _renderHeaderCar(){
        return(
            <Text style={{textAlign:'center',height:50,lineHeight:50}}>选择车款</Text>
        )
    }

    componentDidUpdate(){
        // const { modalState} = this.props;
        //
        // if(modalState){
        //
        //     this.openControlPanel();
        //
        // }
    }
    maskDidClose=()=>{
        const { actions} = this.props;

        this._scrollView.scrollTo({x: 0,animated:false})
        // actions.changeModalState({modalState:false,modalName:''})
    }
    render() {

        const { car,modal} = this.props;

        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return(
            <View style={{ flex: 1, backgroundColor:'white'}}>
                <TitleBar title="找车"></TitleBar>
                <Drawer
                    side="right"
                    type="overlay"
                    ref={(ref) => this._drawer = ref}
                    content={<ScrollView style={styles.scrollView}
                                horizontal={true}
                                pagingEnabled={true}
                                ref={(ref) => this._scrollView = ref}
                                scrollEnabled={false}>
                        <ListView
                            style={{width:screenWidth*0.8}}
                            dataSource={this.dataSourceModal.cloneWithRows(modal)}
                            renderRow={this._renderRowModal} //设置cell
                            enableEmptySections = {true}
                            initialListSize ={8}
                            renderHeader ={this._renderHeaderModal}
                            removeClippedSubviews={false}
                        />
                        <ListView
                            style={{width:screenWidth*0.8}}
                            dataSource={this.dataSourceCar.cloneWithRows(car)}
                            renderRow={this._renderRowCar} //设置cell
                            enableEmptySections = {true}
                            initialListSize ={8}
                            renderHeader ={this._renderHeaderCar}
                            removeClippedSubviews={false}
                        />

                    </ScrollView>}
                    tapToClose={true}
                    openDrawerOffset={0.2}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}
                    onClose={()=>{this.maskDidClose()}}
                    styles={{
                            drawer: { shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3},
                            main: {backgroundColor:"#EBEBEB"},
                    }}
                >
                    <ScrollableTabView  style = {{width:screenWidth,height:screenHeight-64,backgroundColor:'#EBEBEB'}}
                                        initialPage={0}
                                        tabBarTextStyle={{fontSize: 14}}
                                        tabBarUnderlineStyle={{backgroundColor: 'orange'}}
                                        tabBarInactiveTextColor = "#999999" tabBarBackgroundColor = "white" tabBarActiveTextColor = "#333333"
                    >
                        <Brand tabLabel='热门品牌' openModalParent={this.openControlPanel} {...this.props}></Brand>
                        <Condition tabLabel='条件选车'></Condition>
                    </ScrollableTabView>

                </Drawer>
            </View>
        )


    }


}
const styles = StyleSheet.create({

    scrollView:{

        flexDirection:'row',
    },

    mask:{
        width:screenWidth,
        height:modalHeight,
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        position:"absolute",
        left:0,
        top:navigatorHeight,
        flexDirection:'row' ,

    },


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
        backgroundColor:'white'
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

        brand:state.findCarView.brand,
        modal:state.findCarView.modal,
        car:state.findCarView.car,
        
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
)(FindCarView);