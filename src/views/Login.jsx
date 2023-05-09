import React, { Component } from 'react'
import Button from '@mui/material/Button';
import {Link, Navigate} from 'react-router-dom'

export default class Login extends Component {
    constructor () {
        super();
        this.state = {
            usernameText: '',
            passwordText: '',
            redirect:false,
        }
    }
    
    handleChange = (e) => {
        switch(e.target.id){
            case 'username':
                this.setState({usernameText: e.target.value})
                break
            case 'password':
                this.setState({passwordText: e.target.value})
                break    
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        //get the info
        //const username = e.target.username.value;
        const username = this.state.usernameText;
        //const password = e.target.password.value;
        const password = this.state.passwordText;

        const url = 'http://127.0.0.1:5000/api/login';
        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type":'application/json'
        //     },
        //     body: JSON.stringify({ // added the JSON method later so that Flask can actually read it 
        //         username: username,
        //         password: password
        //     })
        // }
        const options = {
            method: "POST",
            headers: {
                Authorization: `Basic ${window.btoa(username+":"+password)}`
            }
        };


        console.log('submitting form')

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            const myUserInfo = data.data // the stuff under the 'data' key in the info
            console.log(myUserInfo)

            this.props.logMeIn(myUserInfo)
            this.setState({redirect:true})
        } else {
            // throw an error message
            alert('That username/password combo was incorrect. Please try again.')
        }

    }

    render(){
        return this.state.redirect? <Navigate to="/products"/> :(
        <div align="center">
            <div className="login" align="center">
                <h2>Login</h2>
                <form id= "login-form" onSubmit={this.handleSubmit}>
                    <input id="username"type="text" placeholder="Username" value={this.state.usernameText} onChange={this.handleChange}/>
                    <input id="password"type="password" placeholder="Password" value={this.state.passwordText} onChange={this.handleChange}/>
                    <Button color="primary" variant="contained" size="large" type="submit">Login</Button>
                </form>
                <Link className="auth-link" style={{textDecoration:'none', color:'#445500', fontSize:10}}to="/signup">Don't have an account yet?</Link>
            </div>
        </div>
        )
    }
}
