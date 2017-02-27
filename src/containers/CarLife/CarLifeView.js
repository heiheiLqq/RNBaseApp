import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

} from 'react-native';
import {

    Header,
    CarLife,
    CarShow

} from '../../components/car-life-view';
import Actions from '../../actions';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

class CarLifeView extends Component {

    constructor(props) {
        super(props);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);

        this.state={
            renderPlaceholderOnly: true
        }
    }
    
    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });

        const {carShowDataArr,carShowRefreshStateArr}=this.props;


        if(carShowDataArr[0].length == 0){
            this.props.actions.getLifeDataAndSowDataSource(
                {
                    'data':carShowDataArr,
                    'pid':2,
                    'typeId':0,
                    'index':0,
                    'refresh':carShowRefreshStateArr,
                    'page':1
        
                }
            )
        
        }

    }
   
    _renderPlaceholderView() {
        return (
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center',}}>
                <Text>Loading...</Text>
            </View>
        );
    }

    changeSegementState=(state,scrollView)=>{

        if(state){
            scrollView.scrollTo({x:screenWidth})

            if(Platform.OS != 'ios'){

                const {actions,carLifeDataArr,carLifeRefreshStateArr} = this.props


                requestAnimationFrame(() => {


                    actions.changeLifeShowState(state)


                    if(carLifeDataArr[0].length == 0){

                        actions.getLifeDataAndSowDataSource(
                            {
                                'data':carLifeDataArr,
                                'pid':1,
                                'typeId':0,
                                'index':0,
                                'refresh':carLifeRefreshStateArr,
                                'page':1

                            }
                        )

                    }

                })
            }


        }else{

            scrollView.scrollTo({x:0})

        }



    }
    onAnimationEnd(e){
        // 求出水平方向上的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;

        // // 计算当前页码
        var currentPage = offSetX / screenWidth;
        const {actions,carLifeRefreshStateArr,carLifeDataArr,carShowDataArr,carShowRefreshStateArr} = this.props;

        var state=false;
        if(currentPage == 0){
            state = false
        }else{
        
            state = true
        }

        actions.changeLifeShowState(state)
        
        if(state){
        
            if(carLifeDataArr[0].length == 0){
        
                actions.getLifeDataAndSowDataSource(
                    {
                        'data':carLifeDataArr,
                        'pid':1,
                        'typeId':0,
                        'index':0,
                        'refresh':carLifeRefreshStateArr,
                        'page':1
        
                    }
                )
        
            }
        
        }else{
        
        
            if(carShowDataArr[0].length == 0){
                this.props.actions.getLifeDataAndSowDataSource(
                    {
                        'data':carShowDataArr,
                        'pid':2,
                        'typeId':0,
                        'index':0,
                        'refresh':carShowRefreshStateArr,
                        'page':1
        
                    }
                )
        
            }
        
        }


    }
    render() {


        const {titleSegement,actions,carShowDataArr,carLifeDataArr,carShowRefreshStateArr,carLifeRefreshStateArr} = this.props;



        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }


        var _scrollView: ScrollView;
        return (

            <View style={{ flex: 1, backgroundColor:'white'}}>
                <View style={styles.container} >

                    <View style={styles.titleBox}>
                        <TouchableOpacity style={{flex:1,height:25}}  onPress={()=>{this.changeSegementState(false,_scrollView)}} >
                            <Text style={titleSegement?[styles.textNormal,{borderBottomLeftRadius:5,borderTopLeftRadius:5}]:[styles.textSelect,{borderBottomLeftRadius:5,borderTopLeftRadius:5}]}>车主秀</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,height:25}} onPress={()=>{this.changeSegementState(true,_scrollView)}} >
                            <Text style={titleSegement?[styles.textSelect,{borderBottomRightRadius:5,borderTopRightRadius:5}]:[styles.textNormal,{borderBottomRightRadius:5,borderTopRightRadius:5}]}>车生活</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView style={{width:screenWidth,flexDirection:'row'}}
                            horizontal={true}
                            pagingEnabled={true}
                            scrollEnabled={( Platform.OS == 'ios')?true:false}
                            ref={(scrollView) => { _scrollView = scrollView; }}
                            onMomentumScrollEnd={this.onAnimationEnd}>
                    <CarShow  refresh={carShowRefreshStateArr} actions={actions} data={carShowDataArr}></CarShow>

                    <CarLife refresh={carLifeRefreshStateArr} actions={actions} data={carLifeDataArr}></CarLife>

                </ScrollView>
            </View>


        )
    }


}
const styles = StyleSheet.create({

    titleBox:{
        flexDirection:'row',

        marginTop: ( Platform.OS == 'ios')? 20:5,
        borderWidth:1,
        borderColor :'white',
        borderRadius:5,
        width:150,
        overflow:'hidden'

    },
    container: {
        height: ( Platform.OS == 'ios')? 64:49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0894ec'
    },
    textSelect: {
        // marginTop: 20,
        color: '#0894ec',
        // fontSize: 32/2
        flex:1,
        padding:5,
        textAlign:'center',
        backgroundColor:'white',


    },
    textNormal: {
        // marginTop: 20,
        color: 'white',
        flex:1,
        padding:5,
        textAlign:'center',
        backgroundColor:'#0894ec',
    }
});

function mapStateToProps(state) {


    return {
      
        titleSegement:state.carLifeView.titleSegement,
        carShowDataArr:state.carLifeView.carShowDataArr,
        carLifeDataArr:state.carLifeView.carLifeDataArr,
        carShowRefreshStateArr:state.carLifeView.carShowRefreshStateArr,
        carLifeRefreshStateArr:state.carLifeView.carLifeRefreshStateArr,
        loading:state.carLifeView.loading,


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
)(CarLifeView);

