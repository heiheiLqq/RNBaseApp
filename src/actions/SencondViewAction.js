
//export const REQUEST_POSTS = 'REQUEST_POSTS';
export const DATA_BANNER = 'DATA_BANNER';
export const HOT_CAR_LIST = 'HOT_CAR_LIST';
export const FREE_PRICE_LIST = 'FREE_PRICE_LIST';
export const CAR_SHOW_BANNER = 'CAR_SHOW_BANNER';
export const SPECIAL_CAR = 'SPECIAL_CAR';

import {API_BASE_URL} from '../constants/Theme';

function receiveBannerPosts(banner, json) {
    return {
        type: DATA_BANNER,
        banner,

        //posts: json.data.children.map(child => child.data),
        //receivedAt: Date.now()
    }
}

function receiveHotCarPosts(hotCarList, json) {
    return {

        type: HOT_CAR_LIST,
        hotCarList,

    }
}

function receiveFreePriceListPosts(freePriceList, json) {
    return {

        type: FREE_PRICE_LIST,
        freePriceList,

    }
}


function receiveCarShowBannerPosts(carShowBanner, json) {
    return {

        type: CAR_SHOW_BANNER,
        carShowBanner,

    }
}


function receiveSpecialCarPosts(specialCar, json) {
    return {

        type: SPECIAL_CAR,
        specialCar,

    }
}

//特价车
export function getSpecialCarSource(item) {
    console.log("getSpecialCarSource");
    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/specialPriceCar/findSpecialPriceCarList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":10,"page":1,"pid":"1","typeId":""}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){

                    console.log(responseJson);
                    dispatch(receiveSpecialCarPosts(responseJson.data.rows));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//车主秀
export function getCarShowBannerSource(item) {
    console.log("getCarShowBrandSource");
    return dispatch => {
        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/carLifeBBS/findCarLifeBBSList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":10,"page":1,"pid":"1","typeId":""}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){

                    console.log(responseJson);
                    dispatch(receiveCarShowBannerPosts(responseJson.data.rows));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}




//免费看低价

export function getFreePriceListSource(item) {
    console.log("getFreePriceListSource");
    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/indexCarPrice/findCarPriceByQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":4,"page":1}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){

                    console.log(responseJson);
                    dispatch(receiveFreePriceListPosts(responseJson.data.rows));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}


//轮播图
export function getBannerSource(item) {
    console.log("getBannerSource");
    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/ad/findAllShowAdByMobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":10,"page":1}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){
                    dispatch(receiveBannerPosts(responseJson.data.rows));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//热门推荐
export function getHotCarSource(item) {
    console.log("getHotCarSource");
    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/attentionCarModel/findAttentionCarModelList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":6,"page":1}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){
                    dispatch(receiveHotCarPosts(responseJson.data));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}