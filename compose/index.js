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
let logger1=store=>next=>action=>{

           console.log('blogger1',store.getState());
           console.log(action);
           next(action);//这两的next相当于dispatch方法传入action执行
           console.log('blogger1',store.getState());

}
let logger2=store=>next=>action=>{

    console.log('alogger2',store.getState());
    console.log(action);
    next(action);//这两的next相当于dispatch方法传入action执行
    console.log('alogger2',store.getState());

}
//如果放入多个中间件的话从左到右依次执行
let store=applyMiddleware(logger1,logger2)(createStore)(counter);
//传入一个promise执行异步代码后执行resolve 内部是自动调用dispatch方法
store.dispatch({type:"ADD"});
store.subscribe(function () {
    console.log(store.getState());
})
