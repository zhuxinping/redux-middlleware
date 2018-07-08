import React,{Component} from 'react';
import * as Types from '../store/action-types';
import {bindActionCreators} from 'redux';
import {connect}from'../react-redux';
import actions from '../store/actions/action';
class Counter extends Component{
    // constructor(props){
    //     super(props);
    //第一种方式
    //     // this.handleClick=this.handleClick.bind(this);
    //     //console.log(this);//this表示组件实例
    // }
    // handleClick(e){
    //     // console.log(e);
    //     // console.log(this);//this表示组件实例
    // }
    //第二种方式
    //  handleClick=(e)=>{
    //     console.log(e);
    //     console.log(this);
    //  };
    // handleClick(e){
    //     console.log(e);
    //     console.log(this);
    // }
    handleClick = (e)=>{
        console.log(this);
    }
    render(){
        return(
            <div>
                <p>计数器{this.props.n}</p>
                <button onClick={()=>{this.props.add(1)}}>+</button>
                <button onClick={()=>{this.props.minus(2)}}>-</button>
                <button onClick={this.handleClick}>点击</button>
                {/*<button onClick={this. handleClick}>点击</button>*/}
                {/*<button onClick={(e)=>this.handleClick(e)}>点击</button>*/}
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