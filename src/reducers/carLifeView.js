import * as types from '../constants/ActionTypes';



export default function carLifeView(state ={

    titleSegement:false,
    carShowIndex:0,
    carLifeIndex:0,
    carShowDataArr : [[], [], [], [], []],
    carLifeDataArr : [[], [], [], []],
    carShowRefreshStateArr:[{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false}],
    carLifeRefreshStateArr:[{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false},{isRefresh:false,isLoadMore:false}],
    loading:false
}, action) {

    switch (action.type) {

        
        
        
        case types.LIFE_SHOW :
        
        
            return Object.assign({}, state, {
        
                titleSegement: action.titleSegement
            });
        case types.CAR_SHOW_FETCH :


            return Object.assign({}, state, {

                carShowDataArr: action.carShowDataArr,
                carShowRefreshStateArr: action.carShowRefreshStateArr,
                loading:action.loading
            });
        case types.CAR_LIFE_FETCH :


            return Object.assign({}, state, {

                carLifeDataArr: action.carLifeDataArr,
                carLifeRefreshStateArr: action.carLifeRefreshStateArr,
                loading:action.loading

            });

        
        default:
            return state
    }
}

