
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    Dimensions

} from 'react-native';

import ViewPager from 'react-native-viewpager';

const deviceWidth = Dimensions.get('window').width;



class Banner extends Component {

    constructor(props) {
        super(props);

        
    }



    _renderPage(data, pageID) {
        return (
            <Image
                source={{ uri: data }}
                style={styles.page}/>
        );
    }

    render() {

        const {  banner } = this.props;
        console.log('constructor',banner)

        var imgArr=[];
        for(let i in banner){
            var dic = banner[i];
            imgArr.push(dic.imgUrl);

        }


        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        // 实际的DataSources存放在state中
        var dataArr;
        dataArr= dataSource.cloneWithPages(imgArr);



        return (

            <View style={{  height:deviceWidth*0.3, width: deviceWidth, marginTop: 0 }}>
                <ViewPager
                    dataSource={dataArr}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
            </View>


        )
    }




}
const styles = StyleSheet.create({

    page: {
        width:deviceWidth,
        //flex: 1,
        //height: 130,
    },

});

export default Banner;
