import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from './react-redux';
import store from './store/index';
//高阶组件  组件返回组件
//高阶函数  函数返回函数
//两个输入框都要去本地的localStorage取值
// import Username from './username';
// import Password from './password';
import Counter from './components/counter';
import WebTable from './components/WebTable';
ReactDOM.render( <Provider store={store}><div><Counter/><WebTable/></div></Provider>,window.root);