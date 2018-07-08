import React ,{Component}from 'react';
import high from "./high";
 class Password extends Component{
    render(){
        return(
            <div>
                <input onChange={(e)=>(this.props.handleChange(e))} type="text" value={this.props.value}/>
            </div>
        );
    }
}
export default high()(Password);