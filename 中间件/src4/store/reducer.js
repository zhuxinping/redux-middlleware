import * as Types from './action-types';
export default function (state={number:0},action) {
   switch (action.type){
       case Types.INCREMENT:
           return{number:state.number+action.amount};
       case Types.DECREMENT:
           return{number:state.number-action.payload.amount};
       default:
           return state;
   }
}