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
    //在下面这个生命周期函数中可以绑定原生事件  会先触发原生事件  然后触发react事件
    //
    /**
     * 在JavaScript中，事件的触发实质上是要经过三个阶段:事件捕获、目标对象本身的事件处理和事件冒泡，假设在div中触发了click事件，实际上首先经历捕获阶段会由父级元素将事件一直传递到事件发生的元素，执行完目标事件本身的处理事件后，然后经历冒泡阶段，将事件从子元素向父元素冒泡。正因为事件在DOM的传递经历这样一个过程，从而为行为委托提供了可能。通俗地讲，行为委托的实质就是将子元素事件的处理委托给父级元素处理。React会将所有的事件都绑定在最外层(document)，使用统一的事件监听，并在冒泡阶段处理事件，当挂载或者卸载组件时，只需要在通过的在统一的事件监听位置增加或者删除对象，因此可以提高效率。
     　　并且React并没有使用原生的浏览器事件，而是在基于Virtual DOM的基础上实现了合成事件(SyntheticEvent)，事件处理程序接收到的是SyntheticEvent的实例。SyntheticEvent完全符合W3C的标准，因此在事件层次上具有浏览器兼容性，与原生的浏览器事件一样拥有同样的接口，可以通过stopPropagation()和preventDefault()相应的中断。如果需要访问当原生的事件对象，可以通过引用nativeEvent获得。
     　　
     此处输入图片的描述

     　　上图为大致的React事件机制的流程图，React中的事件机制分为两个阶段:事件注册和事件触发:

     事件注册　　
     　　React在组件加载(mount)和更新(update)时,其中的ReactDOMComponent会对传入的事件属性进行处理，对相关事件进行注册和存储。document中注册的事件不处理具体的事件，仅对事件进行分发。ReactBrowserEventEmitter作为事件注册入口，担负着事件注册和事件触发。注册事件的回调函数由EventPluginHub来统一管理，根据事件的类型(type)和组件标识(_rootNodeID)为key唯一标识事件并进行存储。

     事件执行
     　　事件执行时，document上绑定事件ReactEventListener.dispatchEvent会对事件进行分发，根据之前存储的类型(type)和组件标识(_rootNodeID)找到触发事件的组件。ReactEventEmitter利用EventPluginHub中注入(inject)的plugins(例如:SimpleEventPlugin、EnterLeaveEventPlugin)会将原生的DOM事件转化成合成的事件，然后批量执行存储的回调函，回调函数的执行分为两步，第一步是将所有的合成事件放到事件队列里面，第二步是逐个执行。需要注意的是，浏览器原生会为每个事件的每个listener创建一个事件对象，可以从这个事件对象获取到事件的引用。这会造成高额的内存分配，React在启动时就会为每种对象分配内存池，用到某一个事件对象时就可以从这个内存池进行复用，节省内存。

     　　再回到我们刚开始的问题，现在看起来就很没有很费解了，之所以会出现上面的问题是因为我们混用了React的事件机制和DOM原生的事件机制，认为通过:

     handleClickQr(e) {
    e.stopPropagation();
}
     就能阻止原生的事件传播，其实在事件委托的情形下是不能实现这一点的。当然解决的办法也不复杂,不要将React事件和DOM原生事件混用。

     componentDidMount() {
  document.body.addEventListener('click', e => {
    this.setState({
      active: false,
    });
  });
　
  document.querySelector('.code').addEventListener('click', e => {
    e.stopPropagation();//只能在原生事件中阻止原生事件的传播
  })
}

     componentWillUnmount() {
  document.body.removeEventListener('click');
  document.querySelector('.qr').removeEventListener('click');
}
     或者通过事件原件对象中的target进行判断:

     componentDidMount() {
  document.body.addEventListener('click', e => {
    if (e.target && e.target.matches('div.code')) {
      return;
    }
　
    this.setState({
      active: false,
    });
  });
}
     *
     *
     *
     * */
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