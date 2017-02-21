import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    ActivityIndicator,
    RefreshControl

} from 'react-native';

let screenWidth = Dimensions.get('window').width


class SpecialList extends Component {

    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._toEnd = this._toEnd.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }
    

    _renderRow(rowData,sectionID,rowID,highlightRow){

        return(
            <TouchableOpacity key={rowID} >
                <View style={{width:screenWidth,marginTop:10,backgroundColor:'white'}}>
                    <Image style={{width:screenWidth,height:200,resizeMode:'cover'}} source={{ uri: rowData.carImage}}/>
                    <View style={{width:screenWidth,padding:10}}>
                        <Text style={{fontSize:18}} numberOfLines ={1}>
                            {rowData.brandName+rowData.carModelName+rowData.carName}
                        </Text>
                        <Text style={{marginTop:10,fontSize:14}}>
                              <Text style={{color:'red',}}>特价<Text style={{fontSize:20,}}>{rowData.specialPrice/10000}</Text>万</Text> <Text style={{color:'#999999',marginLeft:20,textDecorationLine:'line-through'}}>{rowData.price/10000}万</Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
    componentDidMount() {
        this._onRefresh();
    }
    _onRefresh() {


        const { actions,specialCarList} = this.props;

        var pageNumber = 1
        
        actions.getSpecialCarList({pageNumber,specialCarList});
    }
    _toEnd(){


        const {isLoadMore,specialCarList, actions,page,isRefreshing} = this.props;
        if((isLoadMore && (!isRefreshing))|| specialCarList.length<5)return;
        var pageNumber = page+1
        actions.getSpecialCarList({pageNumber,specialCarList});
    }

    _renderFooter() {

        const { isLoadMore,isRefreshing} = this.props;

        if( isLoadMore && (!isRefreshing)){
            return(
                <View style={styles.footer}>
                    <ActivityIndicator
                        animating={true}
                        color="gray"
                    />
                    <Text style={styles.footerTitle}>正在加载更多……</Text>
                </View>
            )

        }

    }
    render() {

        const {specialCarList ,isRefreshing} = this.props;

        return (

            <ListView
                style={{width:screenWidth}}
                dataSource={this.dataSource.cloneWithRows(specialCarList)}
                renderRow={this._renderRow} //设置cell
                enableEmptySections = {true}
                initialListSize ={10}
                removeClippedSubviews={false}
                onEndReached={ this._toEnd }
                onEndReachedThreshold={10}
                renderFooter={ this._renderFooter }
                refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="gray"
                            title="Loading..."
                            titleColor="gray"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />}
            />

        );

    }

}
const styles = StyleSheet.create({

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width:screenWidth
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },




})


export default SpecialList;