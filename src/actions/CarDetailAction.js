export const INTERIORCOLORLIST = 'INTERIORCOLORLIST'
export const EXTERIORCOLORLIST = 'EXTERIORCOLORLIST'
export const CARDETAILINFO = 'CARDETAILINFO'
import {API_BASE_URL} from '../constants/Theme';


function receiveextEriorColorListPosts( exteriorColorList) {
    return {
        type: EXTERIORCOLORLIST,
        exteriorColorList,

    }
}
function receiveInteriorColorPosts(interiorColorList) {
    return {

        type: INTERIORCOLORLIST,
        interiorColorList,

    }
}
//所有获取颜色
export function getColorSource(item) {
    console.log("getColorSource");

    return dispatch => {

        //免费看底价0 找车1 特价车 2

        var detailUrl='';
        if(item.detailType == 0){

            detailUrl = '/mobile/indexCarPrice/findIndexPriceDetails';

        }else {
            detailUrl='/mobile/carPrice/findCarPriceDetails';
        }

        return fetch(API_BASE_URL+'/mobile/carPrice/findMyCarColorByCarId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"carId":item.id}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.code == 0){

                    console.log(responseJson);
                    dispatch(receiveInteriorColorPosts(responseJson.data.interiorColorList));
                    dispatch(receiveextEriorColorListPosts(responseJson.data.exteriorColorList));

                    fetch(API_BASE_URL+detailUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'sessionid': "hanwuqia"
                        },
                        body: JSON.stringify({
                            "query": {
                                "carId": item.id,
                                "interiorColorId": responseJson.data.interiorColorList[0].id,
                                "exteriorColorId": responseJson.data.exteriorColorList[0].id
                            }
                        })
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.code == 0) {

                                if(responseJson.data.length == 0){
                                    dispatch(receiveCarDetailInfoPosts({}));

                                }else {
                                    dispatch(receiveCarDetailInfoPosts(responseJson.data[0]));

                                }


                            }

                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
//根据颜色获取其他数据

function receiveCarDetailInfoPosts(carData) {
    return {

        type: CARDETAILINFO,
        carData,

    }
}

//点击色块切车的数据
export function getCarInfo(item) {


    return dispatch => {

        var detailUrl='';
        if(item.detailType == 0){

            detailUrl = '/mobile/indexCarPrice/findIndexPriceDetails';

        }else {
            detailUrl='/mobile/carPrice/findCarPriceDetails';
        }


        return fetch(API_BASE_URL+detailUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({
                "query": {
                    "carId": item.id,
                    "interiorColorId": item.inId,
                    "exteriorColorId": item.outId
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('lalala',responseJson);
                if (responseJson.code == 0) {


                    if(responseJson.data.length == 0){
                        dispatch(receiveCarDetailInfoPosts({}));

                    }else {
                        dispatch(receiveCarDetailInfoPosts(responseJson.data[0]));

                    }


                }

            })
            .catch((error) => {
                console.error(error);
            });

    }
}