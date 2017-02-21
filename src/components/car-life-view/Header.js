import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Dimensions

} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height
class Header extends Component {


    changeSegementState=(state)=>{

        const {actions} = this.props;

        actions.changeLifeShowState(state)


    }
    
    render() {
        const {titleSegement} = this.props;
        
        return (
            <View style={styles.container} >

                <View style={styles.titleBox}>
                    <TouchableOpacity style={{flex:1,height:25}}  onPress={()=>{this.changeSegementState(false)}} >
                        <Text style={titleSegement?[styles.textNormal]:[styles.textSelect]}>{this.props.title1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,height:25}} onPress={()=>{this.changeSegementState(true)}} >
                        <Text style={titleSegement?[styles.textSelect]:[styles.textNormal]}>{this.props.title2}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleBox:{
        flexDirection:'row',

        marginTop: 20,
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

export default Header;



