import React ,{Component,Children} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
class Provider extends Component{
    getChildContext() {
        return {
            store: this.props.store
        };
    }
    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }
    render(){
        return Children.only(this.props.children);
    }
}

Provider.childContextTypes={
    store:PropTypes.object
}
//最后connect返回的组件一定是Provider的子组件
let connect=(mapStateToProps,mapDispatchToProps)=>(_Component)=>{
    class Proxy extends Component{
        constructor(props, context){
            super(props, context);
            this.context.store = props.store || context.store
            //订阅store里面的state对象然后展开赋值给当前这个容器组件Proxy的state状态
            this.state={...mapStateToProps(this.context.store.getState())};
            //mapStateToProps执行完毕相当于 this.state={value:0}
        }
        componentWillMount(){
            this.unsubscribe=this.context.store.subscribe(()=>{
                this.setState(mapStateToProps(this.context.store.getState()));
            })
        }
        componentWillUnmount() {
            this.unsubscribe();
        }
        render(){
            let actions;
            if(typeof mapDispatchToProps =='function'){
                actions=mapDispatchToProps(this.context.store.dispatch);
                // console.log(this.context.store);
                //(this.context.store.dispatch);
            }else{
                actions=bindActionCreators(mapDispatchToProps,this.context.store.dispatch);
            }

            return <_Component {...this.state} {...actions} />
        }
    }
    Proxy.contextTypes={
        store:PropTypes.object
    }
    return Proxy;
};
export {Provider,connect};

