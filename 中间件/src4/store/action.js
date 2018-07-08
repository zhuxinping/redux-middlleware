import * as  Types from './action-types';

export default {
    add(){
        // return{type:Types.INCREMENT,amount:1}
        //异步的返回一个函数在函数里面dispatch
        return function (dispatch,getState) {
            setTimeout(()=>{
                dispatch({type:Types.INCREMENT,amount:1});
            },1000)
        }
    },
    minus(){
        return{
            type:Types.DECREMENT,
            payload:new Promise((resolve,reject)=>{
                //这里可以写异步代码,有异步就是异步 没写异步就相当于是同步写法
             setTimeout(()=>{
                 resolve({amount:3});
             },2000);
            })
        }
        // return new Promise((resolve)=>{
        //     setTimeout(()=>{
        //         //每隔5秒执行
        //         resolve({type:Types.DECREMENT,amount:5});
        //     },5000)
        // })
    }
}