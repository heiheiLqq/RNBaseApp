
export const FREECARLIST = 'FREECARLIST'
export const CAR_TYPE_DATA = 'CAR_TYPE_DATA'

import {API_BASE_URL} from '../constants/Theme';
//获取免费看低价列表
export function getFreeCarSource(item) {
    return dispatch => {

        if(item.pageNumber ==1){
            // dispatch(changeRefresh(true));

            dispatch(fetchFreePrice(item.car,true,false,item.pageNumber,item.brandId,item.minPrice,item.maxPrice,item.carTypeId));


        }else{
            // dispatch(changeLoadMore(true));
            dispatch(fetchFreePrice(item.car,false,true,item.pageNumber,item.brandId,item.minPrice,item.maxPrice,item.carTypeId));

        }

        var _params = {"query":{"pagenum":"10","page":item.pageNumber}};


        if(item.brandId != undefined && item.brandId != null && item.brandId != ''){

            _params.query.brandId = item.brandId;
        }
        if(item.minPrice != undefined && item.minPrice != null && item.minPrice != ''){

            _params.query.minPrice = item.minPrice;
        }
        if(item.maxPrice != undefined && item.maxPrice != null && item.maxPrice != ''){

            _params.query.maxPrice = item.maxPrice;
        }
        if(item.carTypeId != undefined && item.carTypeId != null && item.carTypeId != ''){

            _params.query.carTypeId = item.carTypeId;
        }

        return fetch(API_BASE_URL+'/mobile/indexCarPrice/findCarPriceByQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify(_params)
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.code == 0){

                    
                    if(item.pageNumber ==1){

                        dispatch(fetchFreePrice(responseJson.data.rows,false,false,item.pageNumber,item.brandId,item.minPrice,item.maxPrice,item.carTypeId));
                        
                    }else{

                        var arr1 = responseJson.data.rows;
                        var arr2 = item.car;
                        item.car = arr2.concat(arr1);
                        dispatch(fetchFreePrice(item.car,false,false,item.pageNumber,item.brandId,item.minPrice,item.maxPrice,item.carTypeId));

                    }
                    
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function fetchFreePrice(car,isRefreshing,isLoadMore,page,brandId,minPrice,maxPrice,carTypeId ) {
    return {
        type: FREECARLIST,
        car,
        isRefreshing,
        isLoadMore,
        page,
        brandId,
        minPrice,
        maxPrice,
        carTypeId

    }
}

export function getCarTypesource() {
    return dispatch => {



        return fetch(API_BASE_URL+'/mobile/carType/findAllCarType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.code == 0){

                    var dic ={
                        'carTypeName':'不限',
                        'carTypeId':''
                    }
                    var arr = responseJson.data;
                    arr.splice(0,0,dic);
                    dispatch(receiveCarTypePosts(arr));
                    
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function receiveCarTypePosts(carType ) {
    return {
        type: CAR_TYPE_DATA,
        carType

    }
}