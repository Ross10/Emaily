import { FETCH_USER } from '../actions/types';
export default function(state = null, action) {
    // console.log(action);
    switch(action.type){
        case FETCH_USER:
            return action.payload || false; //If there is no user logged in - It will return an empty string - and its interpitate to FALSE;
        default:
            return state;
    }
}