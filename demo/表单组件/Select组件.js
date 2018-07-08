import React,{Component} from 'react';

export default class Table extends Component{
    constructor(props){
        super(props);
        /**多选表单*/
        this.handeChange=this.handeChange.bind(this);
        this.state={
            area:[]
        }
    }
    handeChange(e){
        const {options}=e.target;
        const area=Object.keys(options)
            .filter(i=>options[i].selected===true).map(i=>options[i].value);
        this.setState({
            area
        });
        console.log(area);
    }

    render(){
        const {area}=this.state;
        return(
            <div>
                <select multiple={true} value={area} onChange={this.handeChange}>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="xiamen">厦门</option>
                </select>
            </div>
        );

    }
}