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
function compose(...fns) {
    {//[upper,sum]
        return function (...args) {
            let last=fns.pop();
            return fns.reduceRight((composed,fn)=>{
                return fn(composed);
            },last(...args));
        }
    }
}

//logger最终返回的是一个dispatch对应的那个函数即dispatch=(action)=>{}
//最后返回值那个值是新包装的dispatch函数(方法)
//logger传入一个旧的store和一个旧的dispatch最后返回一个带有aciton的dispatch函数 dispatch(action);//进行动作派发会执行的是
//执行顺序就是先执行logger2的返回一个action=>{}函数传入给logger1的dispatch此时dispatch是logger2的action=>{}函数  然后执行logger1的时候console.log('1before',store.getState().number);然后
//然后dispatch(action);执行的是logger2  console.log('2before',store.getState().number); 然后 console.log('2after',store.getState().number); 最后执行logger1的 console.log('1after',store.getState().number);
let logger1=store=>dispatch=>action=>{//最后这个函数是用户派发执行的
    //logger1的dispatch其实是logger2的最后一个函数
    console.log('1before',store.getState().number);
    dispatch(action);//进行动作派发
    console.log('1after',store.getState().number);
}
let logger2=store=>dispatch=>action=>{//最后这个函数是用户派发执行的
    console.log('2before',store.getState().number);
    dispatch(action);//进行动作派发
    console.log('2after',store.getState().number);
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
let applyMiddleWare=(...middlewares)=>createStore=>reducer=>{
    let store=createStore(reducer);//创建一个store
    let middles=middlewares.map(middleware=>{
       return middleware(store);
    });//middles [fn,fn]//表示两个action=>{}函数
    let dispatch=compose(...middles)(store.dispatch);//返回一个新的dispatch方法
    return {...store,dispatch};//返回一个新的store用新的dispatch覆盖老的dispatch方法
    //logger2先执行执行的结果是一个action=>{}函数 会传入给logger1中的dispatch
}
//applyMiddleWare可以返回一个store  store中的dispatch方法是logger最后的返回值
let store=applyMiddleWare(logger1,logger2)(createStore)(reducer);
export default store;