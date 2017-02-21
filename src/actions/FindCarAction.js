export const HOTBRAND = 'HOTBRAND'
export const CARMODAL = 'CARMODAL'
export const CARCAR = 'CARCAR'
export const MODAL_STATE = 'MODAL_STATE'
import {API_BASE_URL} from '../constants/Theme';


//热门品牌
export function getBrandSource(item) {
    console.log("getBrandSource");
    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/carPrice/findOnSellBrand/letter', {
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
                    dispatch(receiveBrandPosts(responseJson.data));

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function receiveBrandPosts(brand, json) {
    return {
        type: HOTBRAND,
        brand,

      
    }
}
//获取品牌对应的车型
export function getModalSource(item) {
    
    return dispatch => {

        return fetch(API_BASE_URL+'/mobile/carPrice/findOnSellCarModelByBracnd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"brandId":item.id}} )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.code == 0){
                    dispatch(receiveModalPosts(responseJson.data));

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function receiveModalPosts(modal, json) {
    return {
        type: CARMODAL,
        modal,


    }
}
export function getCarSource(item) {

    return dispatch => {

        //dispatch(requestPosts(item));
        return fetch(API_BASE_URL+'/mobile/carPrice/findOnSellCarByCarModelId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"carModelId":item.id}}  )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.code == 0){
                    dispatch(receiveCarPosts(responseJson.data));
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function receiveCarPosts(car, json) {
    return {
        type: CARCAR,
        car,

    }
}