import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
//高阶组件  组件返回组件
//高阶函数  函数返回函数
//两个输入框都要去本地的localStorage取值
import Username from './username';
import Password from './password';

ReactDOM.render( <div><Username></Username><Password></Password></div>,window.root);