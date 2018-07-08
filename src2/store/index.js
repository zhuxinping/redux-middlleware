import {createStore} from '../redux';
import reducer from './reducer';
import action from "./action";
// let store=createStore(reducer);
// window._store=store;
// let old=store.dispatch;//存一下以前的方法
// //重写dispatch(dispatch本来就是一个方法,被重写了)
// store.dispatch=function (action) {
//     //派发前
//     console.log(store.getState().number);
//     old(action);
//     //派发后
//     console.log(store.getState().number);
// };
//logger最终返回的是一个dispatch对应的那个函数即dispatch=(action)=>{}
//最后返回值那个值是新包装的dispatch函数(方法)
//logger传入一个旧的store和一个旧的dispatch最后返回一个带有aciton的dispatch函数
let logger=store=>dispatch=>action=>{//最后这个函数是用户派发执行的
    console.log(store.getState().number);
    dispatch(action);//进行动作派发
    console.log(store.getState().number);
}
let reduxThunk=store=>dispatch=>action=>{//dispatch(action)如果是异步操作用户操作这个返回的是一个函数也就是action可能是一个函数 如果是返回一个对象说明这是一个同步操作
    //下面是中间件的处理逻辑
    if(typeof action==='function'){//返回的是function处理逻辑  如果返回的action是一个函数就执行这函数并且传入了dispathch
       return action(dispatch,store.getState());//这里的return是阻断代码执行
    }
    return dispatch(action);//如果返回action是对象按照原来逻辑执行
}
let reduxPromise=store=>dispatch=>action=>{//action可能是promise
        if(action.then){//说明action是promise
            action.then(dispatch);//dispatch就是一个函数  所以没有处理失败
        }else if(action.payload&&action.payload.then){//promise是一个异步函数
            action.payload.then(function (data) {
                 dispatch({...action,payload:data});//更改payload
            },function (err) {
                 dispatch({...action,payload:err});
            })
            return;//阻断执行下面的代码
        }
        return dispatch(action);
}
//应用中间件redux内部的方法 applyMiddleWare的逻辑会让他自动执行到action=>{}这个方法来的
let applyMiddleWare=middleware=>createStore=>reducer=>{
    let store=createStore(reducer);//创建一个store
    let middle=middleware(store);
    let dispatch=middle(store.dispatch);//返回一个新的dispatch方法
    return {...store,dispatch};//返回一个新的store用新的dispatch覆盖老的dispatch方法
}
//applyMiddleWare可以返回一个store  store中的dispatch方法是logger最后的返回值
let store=applyMiddleWare(reduxPromise)(createStore)(reducer);
export default store;