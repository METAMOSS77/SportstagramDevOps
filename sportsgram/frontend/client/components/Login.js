import React from 'react';
import {Link, Redirect, Route, Router} from 'react-router';
import {browserHistory} from 'react-router';

class Login extends React.Component{
    handleLogin(e){
        e.preventDefault();
        console.log('Submit form !!!');
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        var payload = {
            username: username,
            password: password
        };
        this.props.login('http://localhost:3000/user?pseudo=' + username + '&password=' + password);
        this.refs.loginForm.reset();
    }

    render(){
        if (this.props.hasErrored) {
            window.location.reload();
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (this.props.items.Message === 'Success') {
            localStorage.setItem("session", JSON.stringify(this.props.items.Users));
            this.props.history.push('/view/');
        }

        return (
            <div>
                <div className="single-photo">
                    <form style={{marginLeft : '6cm'}} ref="loginForm" onSubmit={(e) => this.handleLogin(e)} className="comment-form">
                        <input type="text" ref="username" placeholder="username"/>
                        <input type="password" ref="password" placeholder="password"/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;