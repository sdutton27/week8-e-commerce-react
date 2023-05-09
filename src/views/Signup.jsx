import React, { Component } from 'react'
import Button from '@mui/material/Button';
import {Navigate, Link} from 'react-router-dom'

export default class Signup extends Component {
    constructor () {
        super();
        this.state = {
            firstNameText: '',
            lastNameText: '',
            emailText: '',
            usernameText: '',
            passwordText: '',
            confirmPasswordText: '',
            redirect: false
        }
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        // const first_name = e.target.first_name.value
        // const last_name = e.target.last_name.value
        // const email = e.target.email.value
        // const username = e.target.username.value
        // const password = e.target.password.value
        // const confirmPassword = e.target.confirmPassword.value;
        const first_name = this.state.firstNameText;
        const last_name = this.state.lastNameText;
        const email = this.state.emailText;
        const username = this.state.usernameText;
        const password = this.state.passwordText;
        const confirmPassword = this.state.confirmPasswordText;

        const url = 'http://127.0.0.1:5000/api/signup';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                first_name: first_name[0].toUpperCase() + first_name.slice(1),
                last_name:last_name[0].toUpperCase() + last_name.slice(1),
                email: email,
                username: username,
                password: password
            })
        };

        if (password !== confirmPassword){
            alert('Your passwords did not match. For your security, we cannot create your account until you have properly verified your password.')
        }

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok'){
            // Show success msg
            console.log(data)
            this.setState({redirect:true})
        }

    }

    handleChange = (e) => {
        switch(e.target.id){
            case 'first_name':
                this.setState({firstNameText: e.target.value})
                break
            case 'last_name':
                this.setState({lastNameText: e.target.value})
                break
            case 'email':
                this.setState({emailText: e.target.value})
                break
            case 'username':
                this.setState({usernameText: e.target.value})
                break
            case 'password':
                this.setState({passwordText: e.target.value})
                break
            case 'confirm_password':
                this.setState({confirmPasswordText: e.target.value})
                break 
            default:
                break          
        }
    }

    render() {
        return this.state.redirect ? <Navigate to='/login'/> :(
        <div align="center">
            <div className="signup" align="center">
                <h2>Sign Up</h2>
                <form id= "signup-form" onSubmit={this.handleSubmit}>
                    <input id="first_name"type="text" placeholder="First Name" value={this.state.firstNameText} onChange={this.handleChange}/>
                    <input id="last_name"type="text" placeholder="Last Name" value={this.state.lastNameText} onChange={this.handleChange}/>
                    <input id="email"type="text" placeholder="Email" value={this.state.emailText} onChange={this.handleChange}/>
                    <input id="username"type="text" placeholder="Username" value={this.state.usernameText} onChange={this.handleChange}/>
                    <input id="password"type="password" placeholder="Password" value={this.state.passwordText} onChange={this.handleChange}/>
                    <input id="confirm_password"type="password" placeholder="Confirm Password" value={this.state.confirmPasswordText} onChange={this.handleChange}/>
                    <Button color="success" variant="contained" type="submit" size="large">Sign Up</Button>
                </form>
                <Link style={{textDecoration:'none', color:'#445500', fontSize:10}} to="/login">Already have an account?</Link>
            </div>
        </div>
        )
    }
}
