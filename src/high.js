import React from 'react';
//let 新组件=connect()(旧的组件)
let high=()=>(Component)=>{
    return class HigtOrderComponent extends React.Component{
        //在父组件处理好逻辑返回出去原来的组件
        constructor(props){
            super(props);
            console.log(this.props);
            this.state={value:''}//把状态映射成原来组件的属性
            this.handleChange=this.handleChange.bind(this);
        }
        handleChange(e){
            this.setState({value:e.target.value});
        }
        componentWillMount(){
            // let username= localStorage.getItem(key);
            // this.setState({value:username});
        }
        render(){
            return <Component {...this.props}  handleChange={this.handleChange} value={this.state.value}></Component>
        }
    }
}
export default high;