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
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height




class BrandFilter extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=> r1 !==r2,
            sectionHeaderHasChanged:(s1,s2)=> s1!== s2
        })

    }

    //品牌点击
    selectBrand=(arr )=>{

        this.props.closeModalParent();
        const { actions,car,minPrice,maxPrice,carTypeId} = this.props;
       
        InteractionManager.runAfterInteractions(() => {
        
            var pageNumber = 1;
            var brandId = arr[0];
            actions.getFreeCarSource({pageNumber, car, brandId, minPrice, maxPrice, carTypeId});
        })
    }
    //返回头部视图
    renderHeader(){
        
        return(
            <TouchableOpacity onPress={() => {
                                    this.selectBrand(['','',''])}}>
                <Text style={{width:screenWidth*0.8,height:44,lineHeight:44,textAlign:'center'}}>
                    全部品牌
                </Text>
            </TouchableOpacity>

        )
    }
    //返回cell的方法
    renderRow(rowData,sectionID,rowID,highlighRow){
        return(
            <TouchableOpacity key={rowID} onPress={() => {
                                    this.selectBrand(rowID)}}>
                <View style={styles.cellStyle}>
                    <Image style={styles.imageStyle} source={{ uri: rowID[2]}}/>
                    <Text style={{marginLeft:20}}>{rowID[1]}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    //返回section的方法
    renderSectionHeader(sectionData,sectionID){

        return(
            <View style={styles.sectionStyle}>
                <Text style={{marginLeft:10}}>{sectionID}</Text>
            </View>
        )
    }

    render(){
        const { brand} = this.props;

        var  Arr = brand ,
            sectionIDs =[],//所有区ID的数组
            rowIDs =[];//行ID数组
        
        for (let i in brand ) {

            sectionIDs.push(i);

            rowIDs.push(brand[i])

        }
        return(
            <ListView style={{backgroundColor:'white'}}
                      dataSource={this.dataSource.cloneWithRowsAndSections(Arr,sectionIDs,rowIDs)}
                      renderRow={this.renderRow}
                      renderSectionHeader={this.renderSectionHeader}
                      removeClippedSubviews={false}
                      renderHeader={this.renderHeader }

            />
        )
    }
    
}


const styles = StyleSheet.create({


    sectionStyle:{
        backgroundColor:'#EBEBEB',
        height:25,
        width:screenWidth*0.8,
        justifyContent:'center'
    },
    cellStyle:{
        flexDirection:'row', //设置横向布局
        borderBottomColor:'#EBEBEB',
        borderBottomWidth:1,
        alignItems:'center',//交叉轴的对齐方式
        backgroundColor:'white'

    },
    imageStyle:{
        width:30,
        height:30,
        margin:10
    },

});

export default BrandFilter;
