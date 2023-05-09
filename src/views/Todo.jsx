import React, { Component } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TodoItem from '../components/TodoItem';

export default class Todo extends Component {
    constructor(){
        super();
        this.state = {
            inputText: "",
            inputDate: "",
            inputTime: "",
            todoItems: []
        }
        //this.onDragEnd = this.onDragEnd.bind(this);
    }

    // onDragEnd(result) {
    //     // dropped outside the list
    //     if (!result.destination) {
    //       return;
    //     }
    
    //     const todoItems = this.reorder(
    //       this.state.todoItems,
    //       result.source.index,
    //       result.destination.index
    //     );
    
    //     this.setState({
    //       todoItems
    //     });
    //   }

    showTodoItems = () => {
        if (this.state.todoItems) {
            return this.state.todoItems.map((tdi, index)=><TodoItem key ={index} tdiInfo = {tdi}/>)
        }
        return null
    }

    // a little function to help us with reordering the result
    // reorder = (list, startIndex, endIndex) => {
    //     const result = Array.from(list);
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);
    
    //     return result;
    // };

    handleSubmit = async (e) => {
        e.preventDefault(); // do not reload the page, especialy important in React
        // const todo_item = e.target.todo_input.value;
        // console.log(`ITEM TO DO: ${todo_item}`)

        // const todo_dt = this.state.inputDate;
        // if (todo_dt) {
        //     const date = new Date(JSON.parse(todo_dt))

        //     const formattedDate = date.toLocaleDateString('en-US');
        //     const formattedTime = date.toLocaleTimeString('en-US');

        //     console.log(formattedDate)
        //     console.log(formattedTime)

        //     console.log(`WHEN TO DO: ${todo_dt}`)
        // }


        // we will want to get the date in here formatted properly
        // handle that in the handleDateChange

        if (this.state.todoItems.length < 15) {

            this.setState(previousState => {
                return {
                //todoItems: [...previousState.todoItems, previousState.inputDate, previousState.inputText],
                todoItems: [...previousState.todoItems, [previousState.inputText, previousState.inputDate, previousState.inputTime]],
                inputDate: "",
                inputText: ""
                };
            });
        } else {
            alert("You can only have up to 15 items in your to-do list. Quit wasting time here and go complete some of your tasks!")
        }
        // // just pushing 1 for now so we know this is working
        // this.setState({todoItems: this.state.todoItems.push({"hi": "again"})});

        // this.setState({inputDate: ""})
        // this.setState({inputText: ""}) //reset the value of the list
    }

    handleDateChange(x, event){
        console.log(JSON.stringify(x));
        const json = JSON.stringify(x);
        const date = new Date(JSON.parse(json))

        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

        this.setState({inputDate: formattedDate})
        this.setState({inputTime: formattedTime})
    }

    handleChange = (e) => {
        this.setState({inputText: e.target.value})
    }

    render() {
        return (
        <div align="center">
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <input id="todo-input" type="text" placeholder="Task for to-do list" required name="todo_input" value={this.state.inputText} onChange={this.handleChange}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        sx={{
                            width: 210,
                            color: 'success.main',
                            '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                height: 40,
                            },
                            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
                                fontSize: 12,
                                padding:0,
                                color: '#001188',
                                top: -4, //center it
                            },
                            '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                height: 40,
                                fontSize: 12,
                                paddingLeft: 2
                            },
                            '& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root': {
                                borderRadius: '50% 50%',
                                backgroundColor:'#ffaaaaaa',
                                width: 20,
                                height: 20,
                                padding: 2
                            },
                            '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
                                color: '#001188',
                            },
                            '& .css-i4bv87-MuiSvgIcon-root': {
                                width: 20,
                            },
                        }}
                        label="Due date for task" onChange={(x, event) => this.handleDateChange(x,event)} name="dt_input"/>    
                    </LocalizationProvider>
                    <button type="submit">Add to list</button>
                </form>
            </div>
            <div className="todo-items-container">
                {this.showTodoItems()}
            </div>
        </div>
        )
    }
}
