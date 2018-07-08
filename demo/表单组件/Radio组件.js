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