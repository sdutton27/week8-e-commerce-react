import React, { Component } from 'react'
import Checkbox from '@mui/material/Checkbox';

export default class TodoItem extends Component {
    constructor() {
        super();
        this.state = {
            color: '#ffaabb',
            show: true
        }
    }
    changeColor = () => {
        if (this.state.color === 'aquamarine') {
            this.setState({color: '#ffaabb'})
        } else {
            this.setState({color: 'aquamarine'})
        }
        //this.setState({show: false});
    }
    removeItem = () => {
        this.setState({show: false});
    }

    render() {
        return (
            this.state.show ?
                <div className="todo-item-outer">
                    <button onClick={this.removeItem}>x</button>
                    <div className="todo-item" style={{backgroundColor: this.state.color}}>
                        <div className="item">{this.props.tdiInfo[0]}</div>
                        <div className="date">{this.props.tdiInfo[1]}</div>
                        <Checkbox id='checkbox' 
                        sx={{
                            '& .css-i4bv87-MuiSvgIcon-root':{
                                height: 10,
                                width: 10
                            },
                        }}onClick={this.changeColor}/>
                        <div className="time">{this.props.tdiInfo[2]}</div>
                    </div>
                </div>
            : 
            <></>
        )
    }
}
