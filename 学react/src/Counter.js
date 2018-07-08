import React,{Component} from 'react';
import store from './store/index';
import actions from './store/actions/action';
export default class Counter extends Component{
    constructor(){
        super();
        this.state={number:0}
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({number:store.getState().number});
        })
    }
    render(){
        return(
            <div>
                <button onClick={()=>{store.dispatch(actions.add())}}>+</button>
                <button onClick={()=>{store.dispatch(actions.minus())}}>-</button>
                <p>{this.state.number}</p>
                </div>
        );
    }
}