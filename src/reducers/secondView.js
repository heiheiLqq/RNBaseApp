import * as types from '../constants/ActionTypes';



export default function secondView(state ={
    banner: [],
    hotCarList:[],
    freePriceList:[],
    carShowBanner:[],
    specialCar:[]
}, action) {

    switch (action.type) {
        case types.DATA_BANNER :
            

            return Object.assign({}, state, {


                banner: action.banner
            });
        case types.HOT_CAR_LIST :

            

            return Object.assign({}, state, {

                hotCarList: action.hotCarList
            });
        case types.FREE_PRICE_LIST:

            return Object.assign({}, state, {

                freePriceList: action.freePriceList
            });

        case types.CAR_SHOW_BANNER:

            return Object.assign({}, state, {

                carShowBanner: action.carShowBanner
            });
        case types.SPECIAL_CAR:

            return Object.assign({}, state, {

                specialCar: action.specialCar
            });

        default:
            return state
    }
}

