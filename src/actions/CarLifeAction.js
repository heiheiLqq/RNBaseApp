export const LIFE_SHOW = 'LIFE_SHOW'

// export const CAR_SHOW_DATA = 'CAR_SHOW_DATA'
// export const CAR_LIFE_DATA = 'CAR_LIFE_DATA'
//
// export const CAR_SHOW_REFRESH_STATE = 'CAR_SHOW_REFRESH_STATE'
//
// export const CAR_LIFE_REFRESH_STATE = 'CAR_LIFE_REFRESH_STATE'

export const CAR_SHOW_FETCH = 'CAR_SHOW_FETCH'
export const CAR_LIFE_FETCH = 'CAR_LIFE_FETCH'


import {API_BASE_URL} from '../constants/Theme';


//改变导航上的segment的状态
export function changeLifeShowState(item) {
    return dispatch =>{

        return dispatch(receiveLifeShowState(item));
        
    }

}

function receiveLifeShowState(titleSegement){

    return {
        type: LIFE_SHOW,
        titleSegement,

    }
}


//改变数组的数据源
export function getLifeDataAndSowDataSource(item) {
    
    
    
    return dispatch => {

        //page ==1下拉刷新
        if(item.page == 1){
            item.refresh[item.index].isRefresh = true

        }else{
            item.refresh[item.index].isLoadMore = true

        }
        //分别处理车生活和车主秀
        if(item.pid == 1){
            dispatch(fetchCarLife(item.data,item.refresh,true));

        }else if(item.pid == 2){
            dispatch(fetchCarShow(item.data,item.refresh,true));

        }

        return fetch(API_BASE_URL+'/mobile/carLifeBBS/findCarLifeBBSList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionid': "hanwuqia"
            },
            body: JSON.stringify({"query":{"pagenum":10,"page":item.page,"pid":item.pid,"typeId":item.typeId}})
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.code == 0){


                    if(item.page==1){

                        item.data[item.index]=responseJson.data.rows;
                        item.refresh[item.index].isRefresh = false


                    }else{

                        //数组合并
                        var arr1 = responseJson.data.rows;
                        var arr2 = item.data[item.index];
                        item.data[item.index] = arr2.concat(arr1);
                        item.refresh[item.index].isLoadMore = false


                    }

                    // setTimeout(function () {
                        if(item.pid == 1){
                            //车生活

                            dispatch(fetchCarLife(item.data,item.refresh,false));


                        }else if (item.pid == 2){
                            //车主秀
                            dispatch(fetchCarShow(item.data,item.refresh,false));


                        }
                    // },500)



                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function fetchCarShow(carShowDataArr,carShowRefreshStateArr,loading) {

    return {
        type: CAR_SHOW_FETCH,
        carShowDataArr,
        carShowRefreshStateArr,
        loading
    }
}
function fetchCarLife(carLifeDataArr,carLifeRefreshStateArr,loading) {
    return {
        type: CAR_LIFE_FETCH,
        carLifeDataArr,
        carLifeRefreshStateArr,
        loading
    }
}

// //改变车主秀的数据源
// function receiveCarShowPosts(carShowDataArr) {
//     return {
//         type: CAR_SHOW_DATA,
//         carShowDataArr,
//
//     }
// }
// //改变车生活的数据源
// function receiveCarLifePosts(carLifeDataArr) {
//     return {
//         type: CAR_LIFE_DATA,
//         carLifeDataArr,
//
//     }
// }
//
// //改变车主秀的刷新状态
//
//
// function receiveCarShowRefreshPosts(carShowRefreshStateArr) {
//     return {
//         type: CAR_SHOW_REFRESH_STATE,
//         carShowRefreshStateArr,
//
//     }
// }
// //改变车生活的刷新状态
//
// function receiveCarLifeRefreshPosts(carLifeRefreshStateArr) {
//     return {
//         type: CAR_LIFE_REFRESH_STATE,
//         carLifeRefreshStateArr,
//
//     }
// }