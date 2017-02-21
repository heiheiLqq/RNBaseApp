import * as types from '../constants/ActionTypes';



export default function carDetail(state ={
    interiorColorList: [],
    exteriorColorList:[],
    carData:{}
    
}, action) {

    switch (action.type) {
        case types.INTERIORCOLORLIST :


            return Object.assign({}, state, {


                interiorColorList: action.interiorColorList
            });
        case types.EXTERIORCOLORLIST :



            return Object.assign({}, state, {

                exteriorColorList: action.exteriorColorList
            });
        case types.CARDETAILINFO :



            return Object.assign({}, state, {

                carData: action.carData
            });
        

        default:
            return state
    }
}

