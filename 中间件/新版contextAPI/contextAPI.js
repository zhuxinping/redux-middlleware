import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
// import Counter from "./Counter";
//最新版react提供一个context API  可以解决跨组件的数据传递
//新的contextAPI  新的方法非常简便
//创建一个上下文有两个属性一个叫Provider 还有一个叫Consumer
//Provider//用在父组件上
//createContext中的对象是默认参数
// let Context = React.createContext({color:'red'});//默认值
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
class App extends Component{
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
ReactDOM.render(<App/>,window.root);