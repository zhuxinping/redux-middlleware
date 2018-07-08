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