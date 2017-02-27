import * as types from '../constants/ActionTypes';
import * as HomviewActions from '../actions/CarServiceActions';

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}


export default function test(state ={
    items: {}
}, action) {

    //console.log("test");
    switch (action.type) {
        case types.SYSTEM_LOGIN_OK :


            return Object.assign({}, state, {

                items: action.item
            });
        default:
            return state
    }
}

