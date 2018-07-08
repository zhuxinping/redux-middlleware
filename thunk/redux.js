let createStore=(reducer)=>{
    let state;
    let listeners=[];
    let getState=()=>state;
    let subscribe=(listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners=listeners.filter(l=>l!==listener);
        }
    }
    let dispatch=(action)=>{
        state=reducer(state,action);
        listeners.forEach(l=>l());
    }
    dispatch();
    return{
        getState,
        subscribe,
        dispatch
    }
}
//应用中间件增强dispatch
let applyMiddleware=(middleware)=>{
    return (createStore)=>(reducer)=>{
        //旧的store传入进去
        let store=createStore(reducer);
         middleware=middleware(store);//传入store执行返回一个带有dispatch参数的函数
         let dispatch=middleware(store.dispatch);//传入dispatch执行返回一个带有action参数的新的dispatch函数  这也就是一个dispatch方法即dispatch=(action)=>{}
         return{
             ...store,dispatch//中间件返回的是一个新的store和新的dispatch方法
         }
    }
}
export {createStore,applyMiddleware};