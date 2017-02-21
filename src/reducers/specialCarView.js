import * as types from '../constants/ActionTypes';



export default function freePriceView(state ={
    specialCarList:[],
    isRefreshing:false,
    isLoadMore:false,
    page:1
}, action) {

    switch (action.type) {

        case types.SPECIAL_CAR_LIST:
            return Object.assign({}, state, {
                specialCarList:action.specialCarList,
                isRefreshing: action.isRefreshing,
                isLoadMore: action.isLoadMore,
                page:action.page,
            });

        default:
            return state
    }
}

