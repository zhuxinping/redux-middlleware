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