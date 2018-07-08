import React,{Component} from 'react';
import * as Types from '../store/action-types';
import {bindActionCreators} from 'redux';
import {connect}from'../react-redux';
import actions from '../store/actions/action';
class Counter extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <p>计数器{this.props.n}</p>
                <button onClick={()=>{this.props.add(1)}}>+</button>
                <button onClick={()=>{this.props.minus(2)}}>-</button>
            </div>
        );
    }
}
//redux里面的bindActionCreator方法
// function bindActionCreators(actions,dispatch) {
//     let obj={};
//     for(let key in actions){
//         obj[key]=(...args)=>dispatch(actions[key](...args));
//     }
//     return obj;
// }
// export default connect(state=>({n:state.counter.number}),actions)(Counter);
// export default connect(state=>({n:state.getIn(['counter','number'])}),actions)(Counter);
export default connect(state=>({n:state.getIn(['counter','number'])}),(dispatch)=>(
   {
        add:(n)=>dispatch(actions.add(n)),
        minus:(n)=>dispatch(actions.minus(n))
    }
))(Counter);