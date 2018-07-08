import React, { Component } from 'react';
let {Consumer,Provider} = React.createContext({color:'red'});//默认值
class Title extends Component{
    render(){
        return(
            //子类通过Consumer进行消费 内部必须是一个函数 函数的参数是Provider的value属性
            <Consumer>
                {({s,h})=>{
                    //console.log(data);
                    return <div onClick={()=>{h('red')}} style={{background:s.color}}>hello Context</div>;
                }}
            </Consumer>
        );
    }
}
class Head  extends Component{
    render(){
        return(
            <div>
                <Title></Title>
            </div>
        );
    }
}
export default class Table extends Component{
    constructor(){
        super();
        this.state={color:'#f90'}
    }
    handleClick=(newColor)=>{
        this.setState({color:newColor});
    }
    render(){
        return (
            <Provider value={{s:this.state,h:this.handleClick}}>
                <Head></Head>
            </Provider>
        );
    }
}