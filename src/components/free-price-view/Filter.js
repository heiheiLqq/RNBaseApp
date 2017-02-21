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


} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height




class Filter extends Component {

    constructor(props) {
        super(props);
        
    }

    filterClick=(index)=>{
        
        this.props.openModalParent(index);
        
    }

    priceFilter=()=>{


    }


    render(){

        return(
            <View style={{width:screenWidth,backgroundColor:'white',height:44,flexDirection:'row',}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>{this.priceFilter()}}>
                    <View style={styles.item}>
                        <Text>价格</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={()=>{this.filterClick(0)}}>
                    <View style={styles.item}>
                        <Text>品牌</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={()=>{this.filterClick(1)}}>
                    <View style={styles.item}>
                        <Text>更多条件</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    



}


const styles = StyleSheet.create({

    item:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    }

});

export default Filter;
