import React from 'react';
import {Link, Redirect, Route, Router} from 'react-router';
import {browserHistory} from 'react-router';
import PhotoSubscription from './PhotoSubscription';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import SlideShow from './SlideShow';

let options = [
    {value: 'Football', label: 'Football'},
    {value: 'Rugby', label: 'Rugby'},
    {value: 'Basket', label: 'Basket'},
    {value: 'Danse classique', label: 'Danse classique'},
    {value: 'Hip-Hop', label: 'Hip-Hop'},
    {value: 'Vélo', label: 'Velo'},

];

let _slides = [{
    imageUrl: "http://tellementfoot.com/wp-content/uploads/2017/03/promo301304063-640x360.jpeg",
    caption: "Allan Allan Al Al Allan"
}, {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzu04_SiQRI-Lm9y1CU9JfMRPkN_r8gfSj-tqj1R1_VWSmj6El4A",
    caption: "Steve Steve Steve"
}];


const Subscription = React.createClass({

    getInitialState: function () {
        return {
            tag1: '',
            tag2: '',
            tag3: ''
        };
    },

    handleChangeTag1: function (e) {
        this.setState({tag1: e.value});
        this.refs.tag1_ref.value = e.value;
    },
    handleChangeTag2: function (e) {
        this.setState({tag2: e.value});
        this.refs.tag2_ref.value = e.value;
    },
    handleChangeTag3: function (e) {
        this.setState({tag3: e.value});
        this.refs.tag3_ref.value = e.value;
    },


    handleLogin(e){
        e.preventDefault();
        console.log('Submit form !!!');
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const confirmPassword = this.refs.confirmPassword.value;
        const tag1_ref = this.refs.tag1_ref.value;
        const tag2_ref = this.refs.tag2_ref.value;
        const tag3_ref = this.refs.tag3_ref.value;


        if (password !== confirmPassword || password === '') {
            console.log("Error password");
            this.refs.loginForm.reset();
            this.setState({tag1: ''});
            this.setState({tag2: ''});
            this.setState({tag3: ''});
        } else {
            console.log(username);
            console.log(password);
            console.log(confirmPassword);
            console.log("tag1_ref = " + tag1_ref);
            console.log("tag2_ref = " + tag2_ref);
            console.log("tag3_ref = " + tag3_ref);
            /*var payload = {
                username: username,
                password: password,
                confirmPassword: confirmPassword
            }*/
            this.props.subscribe(
                'http://localhost:3000/users',
                username,
                password,
                tag1_ref,
                tag2_ref,
                tag3_ref,
            );

            console.log("password are the same");
        }
    },

    componentWillMount(){
        this.props.getRandomPicture("http://localhost:3000/getNumberRandomImage");
    },

    render(){
        if (this.props.hasErrored) {
            return <p>Error</p>;
        }

        if (this.props.isLoading) {
            return <p>loading</p>
        }

        if (this.props.items.Message === 'Success') {
            ////this.props.history.push('/information/');
            window.location= "http://localhost:7770/login/";
        }

        if (this.props.items.Message === 'OK' && this.props.items.Pictures !== undefined) {
            return (
                <section>
                    <SlideShow slides={ this.props.items.Pictures }/>

                    <div style={{marginTop : '-140px', opacity: '0.8', borderRadius: '25px'}} className="single-photo">
                        <form style={{margin: 'auto', position: 'relative'}} ref="loginForm"
                              onSubmit={(e) => this.handleLogin(e)} className="comment-form">

                            <h1 style={{fontSize: '50px'}}>Subscription</h1>
                            <input type="text" ref="username" placeholder="username"/>
                            <input type="password" ref="password" placeholder="password"/>
                            <input type="password" ref="confirmPassword" placeholder="confirm password"/>
                            <input type="hidden" ref="tag1_ref"/>
                            <input type="hidden" ref="tag2_ref"/>
                            <input type="hidden" ref="tag3_ref"/>

                            <Select style={{marginTop: '8px'}} name="form-field-name" ref="tag1" value={this.state.tag1}
                                    options={options}
                                    onChange={this.handleChangeTag1}/>
                            <Select name="form-field-name" ref="tag2" value={this.state.tag2} options={options}
                                    onChange={this.handleChangeTag2}/>
                            <Select name="form-field-name" ref="tag3" value={this.state.tag3} options={options}
                                    onChange={this.handleChangeTag3}/>
                            <input type="submit"/>
                        </form>
                    </div>
                    <div style={{marginTop: '20px'}} className="photo-grid">
                        {this.props.items.Pictures.map((post, i) =>
                            <PhotoSubscription {...this.props} key={i} i={i} post={post}/>)}
                    </div>

                </section>
            )
        }

        return (
            <section>
                <div>
                    <div className="single-photo">
                        <form ref="loginForm" onSubmit={(e) => this.handleLogin(e)} className="comment-form">
                            <input type="text" ref="username" placeholder="username"/>
                            <input type="password" ref="password" placeholder="password"/>
                            <input type="password" ref="confirmPassword" placeholder="confirm password"/>
                            <input type="submit"/>
                        </form>
                    </div>
                </div>

            </section>
        )
    }
});

export default Subscription;