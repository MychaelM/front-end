import React, { Component } from 'react'

import axiosWithAuth from '../utils/axiosWithAuth';


class LoginForm extends Component {
    state = {
        credentials: {
            email: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post("/login", this.state.credentials)
        .then(res => {
            localStorage.setItem("token", res.data.payload);
            this.props.history.push("/protected")
        })
        .catch(err => {
            console.log("Err is", err);
        });
    };

    render() {
        return (
            <div>
                <form className='login_form' onSubmit={this.login}>
                    <input
                        className='input'
                        type='text'
                        name='email'
                        value={this.state.credentials.username}
                        placeholder='UserName'
                        onChange={this.handleChange}
                    />
                    <input
                        className='input'
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        placeholder='Password'
                        onChange={this.handleChange}
                    />
                    <button>Please Log In</button>
                </form>
            </div>
        )
    }
}


export default LoginForm;