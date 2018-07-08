import * as Types from '../action-types';
import {fromJS} from 'immutable';
let initState=fromJS({number:0});
 function counter(state=initState,action) {
   switch (action.type){
       case Types.INCREMENT:
           return state.update('number',(value)=>value+action.amount);
       case Types.DECREMENT:
           return state.update('number',(value)=>value-action.amount);
       default:
           return state;
   }
}
export default counter;