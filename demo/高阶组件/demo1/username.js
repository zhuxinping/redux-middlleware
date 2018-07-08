import React ,{Component}from 'react';
import high from './high';
 class Username extends Component{

    render(){
        return(
            <div>
                <input type="text" onChange={(e)=>(this.props.handleChange(e))} value={this.props.value}/>
            </div>
        );
    }
}
export default high()(Username);
//高阶组件就是解决代码的复用，把公共的代码抽离出去 成为高阶组件