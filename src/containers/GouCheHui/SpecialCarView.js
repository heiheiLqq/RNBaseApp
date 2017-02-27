import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TitleBar from '../../components/common/TitleBar';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions,
    InteractionManager

} from 'react-native';
import {
    Filter,
    SpecialList
} from '../../components/special-car-view';
import Actions from '../../actions';


class SpecialCarView extends Component {

    constructor(props) {
        super(props);
        this.state={

            renderPlaceholderOnly:true,


        }
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});

            // this.props.actions.getSpecialCarList();
        });

    }
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
        
        
        return (

            <View style={{ flex: 1, backgroundColor:'#EBEBEB'}}>
                <TitleBar title="特价车"></TitleBar>
                <Filter></Filter>
                <SpecialList {...this.props}></SpecialList>
            </View>


        )
    }


}
const styles = StyleSheet.create({


});

function mapStateToProps(state) {



    return {
        specialCarList:state.specialCarView.specialCarList,
        isRefreshing: state.specialCarView.isRefreshing,
        isLoadMore: state.specialCarView.isLoadMore,
        page:state.specialCarView.page,
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
)(SpecialCarView);

