import React,{Component} from 'react';
import classNames from 'classnames';
import './reset.less';
export default class Table extends Component{
    constructor(props){
        super(props);
        this.state={
           isHover:false
        }
    }
    handeChange=(e)=>{
        //console.log(e.target.tagName.toUpperCase()==="LI");
        if(e.target.tagName.toUpperCase()==="LI"){
            this.setState({
                isHover:!this.state.isHover
            });
        }
    }
    render(){
        const activeClass=classNames({
            'default-color':true,
            'hover-color':this.state.isHover
        });
        return(
            <div>
                <ul onClick={this.handeChange}>
                    <li className={activeClass}>121212</li>
                </ul>
            </div>
        );

    }
}