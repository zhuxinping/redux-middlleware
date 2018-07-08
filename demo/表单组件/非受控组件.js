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