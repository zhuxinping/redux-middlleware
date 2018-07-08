import React, { Component } from 'react';
class ListItem extends Component {
    static defaultProps = {
        text: '',
        checked: false,
    }
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.checked}
                       onChange={this.props.onChange} />
                <span>{this.props.value}</span>
            </li>
        );
    }
}
class List extends Component {
    static defaultProps = {
        list: [],
        handleItemChange: () => {},
    };
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list.map(entry => ({
                text: entry.text,
                checked: entry.checked,
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
            })),
        });
        //这边构造了一个handleItemChange可以拿到entery值
        //在上述例子中，我们在 List 组件中构造了 handleItemChange 方法，这样在使用 List 组件时，
        // 就可以在运行时拿到改变的项对应的值。
        this.props.handleItemChange(entry);
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
    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
    }
    handleItemChange(item) {
        console.log(item);
    }

    render() {
        return (
            <List
                list={[{text: 1}, {text: 2}]}
                handleItemChange={this.handleItemChange}
            />
        );
    }
}