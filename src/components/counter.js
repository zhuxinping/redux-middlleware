import React,{Component} from 'react';
import * as Types from '../store/action-types';
import {bindActionCreators} from 'redux';
import {connect}from'../react-redux';
import actions from '../store/actions/action';
class Counter extends Component{
    constructor(props){
        super(props);
    }
   // const handleClick = (e) =>{
   //      console.log(e);
   //      console.log(this);
   //  }
    handleClick = (e) =>{
        console.log(e);
        console.log(this);
    }
    //在下面这个生命周期函数中可以绑定原生事件  会先触发原生事件  然后原生事件转为合成为React合成事件触发react事件
    //在原生事件中阻止冒泡行为可以阻止react事件的冒泡行为但是react事件中阻止冒泡行为无法阻止原生事件的冒泡行为 因为React事件其实是绑定在容器最外层
//react事件合成机制:事件委派 和自动绑定
    componentDidMount(){
        //console.log(this);
        //console.log(this.refs);
        this.refs.button.addEventListener('click',e=>{
            this.handleClick(e);
        })
    }
    componentWillUnmount(){
        this.refs.button.removeEventListener('click');
    }
    render(){
        return(
            <div>
                <p>计数器{this.props.n}</p>
                <button onClick={()=>{this.props.add(1)}}>+</button>
                <button onClick={()=>{this.props.minus(2)}}>-</button>
                {/*<button ref="button" onClick={(e)=>this.handleClick(e)}>点击</button>*/}
                {/*<button ref="button" onClick={this.handleClick}>点击</button>*/}
                <button onClick={this.handleClick} ref="button">点击</button>
                {/*这里的ref是一个组件实例的引用,所以在无状态组件因为没有创建一个实例所以无法用这个属性*/}
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