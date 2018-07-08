import React,{Component} from 'react';
import './reset.less';
/**
 * 父子组件之间的通信
 * 父组件向子组件传递数据
 *
 *  **/
//子组件
function ListItem({value}) {
    return(
        <li>
            <span>{value}</span>
        </li>
    );
}
function ListTitle({title}) {
    return(
        <li>
            <span>{title}</span>
        </li>
    );
}
//父组件
function List({list,title}) {
    return(
        <div>
            <ListTitle title={title}/>
            <ul>
                {
                    list.map((item,index)=>(
                        <ListItem key={`list-${index}`} value={item.text}/>
                    ))
                }
            </ul>
        </div>
    );
}
export default class Table extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
            const list=[{text:'react很好'},{text:'vue很棒毛啊'},{text:'ng学习不划算'}], title='标题';
        return(
            <div>
                <ul>
                    {
                        List({list,title})
                    }
                </ul>
            </div>
        );

    }
}