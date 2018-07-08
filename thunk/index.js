import {createStore,applyMiddleware} from "./redux";
let counter=(state=0,action)=>{
    if(action){
        switch (action.type){
            case "ADD":
                return state+1;
            case "SUB":
                return state-1;
            default:
                return state;
        }
    }else{
        return state;
    }
}
// let store=createStore(counter);
//logger中间件传入进去
let logger=store=>next=>action=>{

           console.log('before',store.getState());
           console.log(action);
           next(action);//这两的next相当于dispatch方法传入action执行
           console.log('after',store.getState());

}
//这个中间件首先传入一个旧的store返回一个function(reducer){ return function(action){} }
// let logger=function(store){
//     return function (next) {
//         return function(action){
//
//         }
//     }
// }
//把所有需要的方法依次传入进去在里面处理分别传入logger store  reducer
//logger相当于是一个会点函数
let thunk=store=>next=>action=>{
    if(typeof  action==='function'){
       return action(next);
    }
     return next(action);
}
let store=applyMiddleware(thunk)(createStore)(counter);
store.dispatch(function (dispatch) {
        setTimeout(function () {
            dispatch({type:'ADD'});
        },3000)
});
store.subscribe(function () {
    console.log(store.getState());
})
