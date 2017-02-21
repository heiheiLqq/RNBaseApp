import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TitleBar from '../components/common/TitleBar';
import Drawer from 'react-native-drawer'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions,
    InteractionManager,
    TouchableOpacity

} from 'react-native';
import {
    Filter,
    Collection,
    BrandFilter,
    OtherFilter
} from '../components/free-price-view';
import Actions from '../actions';

let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height
class FreePriceView extends Component {

    constructor(props) {
        super(props);
        this.state={

            renderPlaceholderOnly:true,
        }
    }
    _renderPlaceholderView() {
        return (
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center',}}>
                <Text>Loading...</Text>
            </View>
        );
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.props.actions.getBrandSource({});
            this.props.actions.getCarTypesource();

        });

    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    maskDidClose=()=>{
        
    }
    componentDidUpdate(){

       
    }
    filterClick=(index)=>{

        this._scrollView.scrollTo({x: index*screenWidth*0.8,animated:false})        // this.setState({

        this.openControlPanel();
    }
    render() {



        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        console.log('render',this.state.modalType)
        return (

            <View style={{ flex: 1, backgroundColor:'#EBEBEB'}}>
                <TitleBar title="免费看底价"></TitleBar>

                <Drawer
                    side="right"
                    type="overlay"
                    ref={(ref) => this._drawer = ref}
                    content={
                    <ScrollView style={styles.scrollView}
                                horizontal={true}
                                pagingEnabled={true}
                                ref={(ref) => this._scrollView = ref}
                                scrollEnabled={false}>
                            <BrandFilter closeModalParent={this.closeControlPanel} {...this.props}></BrandFilter>
                           <OtherFilter closeModalParent={this.closeControlPanel} {...this.props}></OtherFilter>
                    </ScrollView>
                    }
                    tapToClose={true}
                    openDrawerOffset={0.2}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}
                    onClose={()=>{this.maskDidClose()}}
                    styles={{
                            drawer: { shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3},
                            main: {backgroundColor:'#EBEBEB'}
                    }}
                >
                    <Filter openModalParent={this.filterClick}></Filter>
                    <Collection {...this.props}></Collection>


                </Drawer>



            </View>


        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    title:{

        textAlign:'center',
        backgroundColor:'#e5e5e5',
        padding:5
    },
    item:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    scrollView:{

        flexDirection:'row',
    },

});

function mapStateToProps(state) {


    return {
        isRefreshing:state.freePriceView.isRefreshing,
        isLoadMore:state.freePriceView.isLoadMore,
        car:state.freePriceView.car,
        page:state.freePriceView.page,
        brand:state.findCarView.brand,
      
        brandId:state.freePriceView.brandId,
        carType:state.freePriceView.carType,

        minPrice:state.freePriceView.minPrice,
        maxPrice:state.freePriceView.maxPrice,
        carTypeId:state.freePriceView.carTypeId,
        
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
)(FreePriceView);

