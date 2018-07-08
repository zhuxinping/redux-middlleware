import * as  Types from '../action-types';

let actions= {
    add(n){
         return (dispatch)=>{
             setTimeout(()=>{
                 dispatch({type:Types.INCREMENT,amount:n});
             },2000)
         }
    },
    minus(n){
        return{type:Types.DECREMENT,amount:n}
    }
}
export default actions;