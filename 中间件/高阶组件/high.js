import React from 'react';
//let 新组件=connect()(旧的组件)
let high=(key)=>(Component)=>{
    return class HigtOrderComponent extends React.Component{
        //在父组件处理好逻辑返回出去原来的组件
        constructor(props){
            super(props);
            this.state={value:''}//把状态映射成原来组件的属性
        }

        componentWillMount(){
            let username= localStorage.getItem(key);
            this.setState({value:username});
        }
        render(){
            return <Component value={this.state.value}></Component>
        }
    }
}
export default high;