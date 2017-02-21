import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ListView,
    Image,
    RefreshControl,
    ActivityIndicator

} from 'react-native';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class CarLifeList extends Component {


    constructor() {
        super();
        this._onRefresh = this._onRefresh.bind(this);
        this._toEnd = this._toEnd.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this.state={
            page:1,
        }
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        
    }
    
    renderRow(rowData,sectionID,rowID,highlightRow){

        return(
            <TouchableOpacity style={{width:screenWidth,height:150,marginTop:10}}>
                <View style={{width:screenWidth,height:150,backgroundColor:'white',flexDirection:'row',position:'absolute'}}>
                    <Image style={{flex:4}} source={{ uri: rowData.image}}/>
                    <View style = {{flex:3,padding:5}}>
                        <Text style={{color:'#333333',fontSize:16}}>{rowData.title}</Text>
                        <Text style={{marginTop:10,color:'#666666',fontSize:14}}>{rowData.summary}</Text>
                        <View style={{position:'absolute',bottom:0,left:5,right:5,height:30,flexDirection:'row'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',overflow:'hidden'}}>
                                <Image style={{width:20,height:20,resizeMode: 'contain'}} source={require('./img/lifelist_02.png')} />
                                <Text numberOfLines ={1} style={{color:'#333333'}}>
                                    {rowData.clickAmount}
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',overflow:'hidden'}} >
                                <Image style={{width:20,height:20,resizeMode: 'contain'}} source={require('./img/lifelist_03.png')} />
                                <Text numberOfLines ={1} style={{color:'#333333'}}>
                                    {rowData.commentAmount}
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',overflow:'hidden'}}>
                                <Image style={{width:20,height:20,resizeMode: 'contain'}} source={require('./img/lifelist_04.png')} />
                                <Text numberOfLines ={1} style={{color:'#333333'}}>
                                    {rowData.thumbsAmount}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={{position:'relative',left:0,top:0,backgroundColor:'orange',color:'white',padding:5,width:70,textAlign:'center' }}>
                    {rowData.typeName}
                </Text>
            </TouchableOpacity>

        )
    }
    _onRefresh() {
        
        const {actions,dataArr,refresh,index,pid} = this.props
        
        var typeId=0;

        if(pid==1){
            
            if(index==1){
                //美容
                typeId = 3;
            }else if(index ==2){
                //装饰
                typeId = 4;
            }else if (index == 3){
                //维修
                typeId = 8;
            }else{
                //全部
                typeId = 0;
            }
            
        }else{
            if(index==1){
                //新车
                typeId = 5;
            }else if(index ==2){
                //装饰
                typeId = 6;
            }else if (index == 3){
                //改装
                typeId = 9;
            }else if(index ==4){
                //自驾
                typeId = 7;
            }else{
                //全部
                typeId = 0;
            }
        }
        actions.getLifeDataAndSowDataSource(
            {
                'data':dataArr,
                'pid':pid,
                'typeId':typeId,
                'index':index,
                'refresh':refresh,
                'page':1,

            }
        )
        this.setState({
            page:1
        });

    }

    _toEnd(){
        const {actions,dataArr,refresh,index,pid} = this.props

        if(dataArr[index].length ==0)return;
        
        var typeId=0;

        if(pid==1){

            if(index==1){
                //美容
                typeId = 3;
            }else if(index ==2){
                //装饰
                typeId = 4;
            }else if (index == 3){
                //维修
                typeId = 8;
            }else{
                //全部
                typeId = 0;
            }

        }else{
            if(index==1){
                //新车
                typeId = 5;
            }else if(index ==2){
                //装饰
                typeId = 6;
            }else if (index == 3){
                //改装
                typeId = 9;
            }else if(index ==4){
                //自驾
                typeId = 7;
            }else{
                //全部
                typeId = 0;
            }


        }
        var page = this.state.page+1

        this.setState({
            page:page
        });
        actions.getLifeDataAndSowDataSource(
            {
                'data':dataArr,
                'pid':pid,
                'typeId':typeId,
                'index':index,
                'refresh':refresh,
                'page':page,

            }
        )


    }

    _renderFooter() {

        const {refresh,index} = this.props

        var state = refresh[index];
        if(!state.isRefresh && state.isLoadMore){
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

        const {dataArr,refresh,index} = this.props;


        
        return (
            <ListView
                dataSource={this.dataSource.cloneWithRows(dataArr[index])}
                renderRow={this.renderRow} //设置cell
                style={{width:screenWidth}}
                onEndReached={ this._toEnd }
                onEndReachedThreshold={20}
                renderFooter={ this._renderFooter }
                enableEmptySections = {true}
                refreshControl={
                        <RefreshControl
                            refreshing={refresh[index].isRefresh}
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
});

export default CarLifeList;



