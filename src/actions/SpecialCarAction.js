import {API_BASE_URL} from '../constants/Theme';
export const SPECIAL_CAR_LIST = 'SPECIAL_CAR_LIST';

function receiveSpecialCarPosts(specialCarList,isRefreshing,isLoadMore,page) {
    return {

        type: SPECIAL_CAR_LIST,
        specialCarList,
        isRefreshing,
        isLoadMore,
        page
        

    }
}

//特价车
export function getSpecialCarList(item) {
    return dispatch => {

        if(item.pageNumber == 1){
            dispatch(receiveSpecialCarPosts(item.specialCarList,true,false,item.pageNumber));

        }else{
            dispatch(receiveSpecialCarPosts(item.specialCarList,false,true,item.pageNumber));
            
        }
        
        return fetch(API_BASE_URL+'/mobile/specialPriceCar/findSpecialPriceCarList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":5,"page":item.pageNumber}})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if(responseJson.code == 0){

                    if(item.pageNumber == 1){
                        dispatch(receiveSpecialCarPosts(responseJson.data.rows,false,false,item.pageNumber));

                    }else{

                        var arr1 = responseJson.data.rows;
                        var arr2 = item.specialCarList;
                        item.specialCarList = arr2.concat(arr1);
                        dispatch(receiveSpecialCarPosts(item.specialCarList,false,false,item.pageNumber));

                    }
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}
