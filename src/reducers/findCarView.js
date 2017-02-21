import * as types from '../constants/ActionTypes';



export default function findCarView(state ={
    modal:[],
    brand:{},
    car:[],
    modalState:false,
    modalName:''
}, action) {
    
    switch (action.type) {
        case types.HOTBRAND :


            return Object.assign({}, state, {


                brand: action.brand
            });
        case types.CARMODAL :


            return Object.assign({}, state, {


                modal: action.modal
            });
        case types.CARCAR :


            return Object.assign({}, state, {


                car: action.car
            });
        


        default:
            return state
    }
}

