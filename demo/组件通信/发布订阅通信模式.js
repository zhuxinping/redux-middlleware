import { EventEmitter } from 'events';
//  EventEmitter 实例输出到各组件中使用：
import React, { Component, PropTypes } from 'react';
let emitter=new EventEmitter();
class ListItem extends Component {
    static defaultProps = {
        checked: false,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
                <span>{this.props.value}</span>
            </li>
        );
    }
}
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list.map(entry => ({
                text: entry.text,
                checked: entry.checked || false,
            })),
        };
    }
    onItemChange(entry) {
        const { list } = this.state;
        this.setState({
            list: list.map(prevEntry => ({
                text: prevEntry.text,
                checked: prevEntry.text === entry.text ?
                    !prevEntry.checked : prevEntry.checked,
            }))
        });
        //发布ItemChange事件
        emitter.emit('ItemChange', entry);
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map((entry, index) => (
                        <ListItem
                            key={`list-${index}`}
                            value={entry.text}
                            checked={entry.checked}
                            onChange={this.onItemChange.bind(this, entry)}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
export default class Table extends Component {
    componentDidMount() {
        //订阅
        this.itemChange = emitter.on('ItemChange', (data) => {
            console.log(data);
        });
    }
    componentWillUnmount() {
        //移除订阅
        emitter.removeListener(this.itemChange);
    }
    render() {
        return (
            <List list={[{text: 1}, {text: 2}]} />
        );
    }
}