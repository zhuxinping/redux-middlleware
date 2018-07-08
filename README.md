####  redux中间件的原理和实现
##### 最新版react提供一个context API  可以解决跨组件的数据传递
#####  新的contextAPI  新的方法非常简便
```javascript
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
```
####  redux原理以及增强版dispatch的实现
```javascript
let createStore=(reducer)=>{
    let state;
    let listeners=[];
    let getState=()=>state;
    let subscribe=(listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners=listeners.filter(l=>l!==listener);
        }
    }
    let dispatch=(action)=>{
        state=reducer(state,action);
        listeners.forEach(l=>l());
    }
    dispatch({});
    return{
        getState,
        subscribe,
        dispatch
    }
}
//应用中间件增强dispatch
let applyMiddleware=(...middlewares)=>{
    return (createStore)=>(reducer)=>{
        //旧的store传入进去
        let store=createStore(reducer);
         middlewares=middlewares.map(middleware=>middleware(store));//传入store执行返回一个带有dispatch参数的函数
         let dispatch=compose(...middlewares)(store.dispatch);//传入dispatch执行返回一个带有action参数的新的dispatch函数  这也就是一个dispatch方法即dispatch=(action)=>{}
         return{
             ...store,dispatch//中间件返回的是一个新的store和新的dispatch方法
         }
    }
}
//组合函数
function compose(...fns) {
    {//[upper,sum]
        return function (...args) {
            let last=fns.pop();
            return fns.reduceRight((composed,fn)=>{
                return fn(composed);
            },last(...args));
        }
    }
}
export {createStore,applyMiddleware};
```
#### 组件中直接使用发布订阅模式进行组件间数据传递

```javascript
    import { EventEmitter } from 'events';
    //  EventEmitter 实例输出到各组件中使用：
    import React, { Component, PropTypes } from 'react';
    let emitter=new EventEmitter();
    class ListItem extends Component {
        static defaultProps = {
            checked: false,
        }
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <li>
                    <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
                    <span>{this.props.value}</span>
                </li>
            );
        }
    }
    class List extends Component {
        constructor(props) {
            super(props);
            this.state = {
                list: this.props.list.map(entry => ({
                    text: entry.text,
                    checked: entry.checked || false,
                })),
            };
        }
        onItemChange(entry) {
            const { list } = this.state;
            this.setState({
                list: list.map(prevEntry => ({
                    text: prevEntry.text,
                    checked: prevEntry.text === entry.text ?
                        !prevEntry.checked : prevEntry.checked,
                }))
            });
            //发布ItemChange事件
            emitter.emit('ItemChange', entry);
        }
        render() {
            return (
                <div>
                    <ul>
                        {this.state.list.map((entry, index) => (
                            <ListItem
                                key={`list-${index}`}
                                value={entry.text}
                                checked={entry.checked}
                                onChange={this.onItemChange.bind(this, entry)}
                            />
                        ))}
                    </ul>
                </div>
            );
        }
    }
    export default class Table extends Component {
        componentDidMount() {
            //订阅
            this.itemChange = emitter.on('ItemChange', (data) => {
                console.log(data);
            });
        }
        componentWillUnmount() {
            //移除订阅
            emitter.removeListener(this.itemChange);
        }
        render() {
            return (
                <List list={[{text: 1}, {text: 2}]} />
            );
        }
    }
```

##### 高阶组件的本质就是一个高阶函数 高阶组件可以把公共的逻辑抽离出来 从父组件把数据信息往子组件传递 子组件相当于一个UI组件 只负责展示没有复杂的业务逻辑
#####  高阶组件可以实现代码的高度复用，减少代码冗余
##### 应用场景 例如 react-redux中的connect就是一个高阶组件 用于把容器组件的数据映射成UI组件的属性 实现数据从父组件往子组件流动

```javascript
//表单组件 /**多选表单*/
import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**多选表单*/
        this.handeChange=this.handeChange.bind(this);
        this.state={
            coffee:[]
        }
    }
    handeChange(e){
        const {checked,value}=e.target;
        let {coffee}=this.state;
        if(checked&&coffee.indexOf(value)===-1){//如果被选中但是没有这个值就要放入这个值到coffee
            coffee.push(value);
        }else{
            coffee=coffee.filter(i=>i!==value)
        }
        this.setState({
            coffee
        });
    }

    render(){
        const {coffee}=this.state;
        return(
            <div>
                <p>请选择你最喜欢的咖啡</p>
                <label htmlFor="">
                    <input onChange={this.handeChange} type="checkbox" value="coffee1" checked={coffee.indexOf('coffee1')!==-1}/>
                </label>
                <label htmlFor="">
                    <input onChange={this.handeChange} type="checkbox" value="coffee2" checked={coffee.indexOf('coffee2')!==-1}/>
                </label>
                <label htmlFor="">
                    <input onChange={this.handeChange} type="checkbox" value="coffee3" checked={coffee.indexOf('coffee3')!==-1}/>
                </label>
            </div>
        );

    }
}


//输入表单组件
import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**输入表单*/
        this.handeInputChange=this.handeInputChange.bind(this);
        this.handeTextareaChange=this.handeTextareaChange.bind(this);
        this.state={
            inputValue:'',
            textareaValue:''
        }
    }
    handeInputChange(e){
        this.setState({
            inputValue:e.target.value
        });
    }
    handeTextareaChange(e){
        this.setState({
            textareaValue:e.target.value
        });
    }
    render(){
        const {inputValue,textareaValue}=this.state;
        console.log(inputValue,textareaValue);
        return(
            <div>
                <p>单行输入框: <input
                   onChange={this.handeInputChange} type="text" value={inputValue}/></p>
                <p>多行输入框: <textarea
                    onChange={this.handeTextareaChange} value={textareaValue}></textarea></p>
            </div>
        );

    }
}

//单选
import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**单选表单*/
        this.handeChange=this.handeChange.bind(this);
        this.state={
            radioValue:''
        }
    }
    handeChange(e){
        this.setState({
            radioValue:e.target.value
        });
    }

    render(){
        const {radioValue}=this.state;
        return(
            <div>
                <p>gender:</p>
                <label htmlFor="">male: <input onChange={this.handeChange} type="radio" value="male" checked={radioValue==='male'}/></label>
                <label htmlFor="">female: <input onChange={this.handeChange} type="radio" value="female" checked={radioValue==='female'}/></label>
            </div>
        );

    }
}
//下拉多选
import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**多选表单*/
        this.handeChange=this.handeChange.bind(this);
        this.state={
            area:[]
        }
    }
    handeChange(e){
        const {options}=e.target;
        const area=Object.keys(options)
            .filter(i=>options[i].selected===true).map(i=>options[i].value);
        this.setState({
            area
        });
        console.log(area);
    }

    render(){
        const {area}=this.state;
        return(
            <div>
                <select multiple={true} value={area} onChange={this.handeChange}>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="xiamen">厦门</option>
                </select>
            </div>
        );

    }
}
// 非受控表单组件
import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**多选表单*/
        this.handeSubmit=this.handeSubmit.bind(this);
        this.state={
            area:[]
        }
    }
    handeSubmit(e){
       e.preventDefault();
    const {value}=this.refs.name;
    console.log(value);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handeSubmit}>
                    <input type="text" ref="name" defaultValue="厦门"/>
                    <button type="submit">提交</button>
                </form>
            </div>
        );

    }
}
```

##### 柯理化函数
```javascript
function currying(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        }
        else {
            Array.prototype.push.apply(args, arguments);
            return arguments.callee;
        }
    }
}
function add() {
    var vals = Array.prototype.slice.call(arguments);
    return vals.reduce((pre, val) => {
        return pre + val;
    });
}

var newAdd = currying(add, 1, 2, 3);
newAdd(4, 5);
newAdd(6, 7);

console.log(newAdd());  // 28

```



