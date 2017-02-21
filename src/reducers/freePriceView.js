import * as types from '../constants/ActionTypes';



export default function freePriceView(state ={
    car:[],
    isRefreshing:false,
    isLoadMore:false,
    page:1,
    brandId:'',
    carType:[],
    minPrice:'',
    maxPrice:'',
    carTypeId:''
}, action) {

    switch (action.type) {

        case types.FREECARLIST:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoadMore: action.isLoadMore,
                car: action.car,
                page:action.page,
                brandId:action.brandId,
                minPrice:action.minPrice,
                maxPrice:action.maxPrice,
                carTypeId:action.carTypeId

            });
        case types.CAR_TYPE_DATA:
            return Object.assign({}, state, {
                carType:action.carType,
            });
        
        default:
            return state
    }
}

