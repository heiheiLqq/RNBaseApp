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
    Modal,
    Platform,
    Animated,
    Easing,
    InteractionManager,



} from 'react-native';
let screenWidth = Dimensions.get('window').width
let screenHeight = Dimensions.get('window').height

var modalHeight = (Platform.OS == 'ios')? (screenHeight- 64):(screenHeight- 49)


class BrandFind extends Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=> r1 !==r2,
            sectionHeaderHasChanged:(s1,s2)=> s1!== s2
        })
        this.hotBrndArr  = [
            [
                '61',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a96f387a5cd.png",
                '奔驰'
            ],
            [
                '6967',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a970febd640.png",
                '北京现代'
            ],
            [
                '6037',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a970bcbd197.png",
                '铃木'
            ],
            [
                '146',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a97033d23ee.png",
                '斯柯达'
            ],
            [
                '66',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a96f607aa19.png",
                '别克'
            ],
            [
                '144',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a970222795b.png",
                '斯巴鲁'
            ],
            [
                '973',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a9707f007c6.png",
                '日产'
            ],
            [
                '6924',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a970d0ccdce.png",
                '一汽大众'
            ],
            [
                '9a0f9007392017a2987abc182eaf8d3c',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a96e94d36e7.png",
                '吉利汽车'
            ],
            [
                '111',
                "http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/big/2016-08-09/big_57a96fef4d17b.png",
                '长安'
            ]

        ];
    }



    //品牌点击
    selectBrand=(arr)=>{

        this.props.openModalParent();



        InteractionManager.runAfterInteractions(() => {
            const { actions} = this.props;

            var id = arr[0];

            actions.getModalSource({id});

        });

    }


    render(){


        const { brand} = this.props;

        // var _scrollView: ScrollView;


        var  Arr = brand ,
            sectionIDs =[],//所有区ID的数组
            rowIDs =[];//行ID数组


        for (let i in brand ) {

            sectionIDs.push(i);

            rowIDs.push(brand[i])

        }



        return(
                <ListView//创建表，并设置返回section和cell的方法
                    dataSource={this.dataSource.cloneWithRowsAndSections(Arr,sectionIDs,rowIDs)}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderHeader={this.renderHeader }
                />

        )



    }
    componentDidMount(){

    }
    //返回头部视图
    renderHeader(){

        var rowWidth = screenWidth/5;

        return(
            <View  style={{width:screenWidth,flexDirection:'row',flexWrap:'wrap',height:160}}>
                {
                    this.hotBrndArr.map((dic, i) => <TouchableOpacity key={i} style={{width:rowWidth,height:80}} onPress={() => {
                                    this.selectBrand(dic)}}>
                        <View  style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',width:rowWidth,height:80}}>
                            <Image style={styles.imageStyle} source={{ uri: dic[1]}}/>
                            <Text>{dic[2]}</Text>
                        </View>
                    </TouchableOpacity>)  // 单行箭头函数无需写return
                }
            </View>
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


}


const styles = StyleSheet.create({




    scrollView:{

        flexDirection:'row',
    },
    selectCarBox:{

        marginLeft:80,
        width:screenWidth -80,
        backgroundColor:'white',
        height:modalHeight ,

    },

    modal:{
        marginTop:64,
        width:screenWidth,
        height:modalHeight ,
        backgroundColor:'rgba(0, 0, 0, 0.7)',
    },

    one:{
        width:screenWidth,
        height:screenHeight-84,
        backgroundColor:'#EBEBEB'
    },
    sectionStyle:{
        backgroundColor:'#EBEBEB',
        height:25,
        width:screenWidth,
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

export default BrandFind;
