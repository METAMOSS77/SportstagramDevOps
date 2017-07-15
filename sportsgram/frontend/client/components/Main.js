import React from 'react';
import {Link} from 'react-router';

class Main extends React.Component{

    logout(){
        localStorage.clear();
        window.location = "http://localhost:7770/";
    }
    RenderButton(){
        if (localStorage["session"] !== undefined) {
            return (
                <div>
                    <button onClick={() => this.props.history.push('/profil/')} style={{marginLeft: '2cm'}}
                            className="likes">
                        Profil
                    </button>

                    <button onClick={() => this.logout()} style={{marginLeft: '2cm'}}
                            className="likes">
                        logout
                    </button>
                </div>
            );
        } else {
            return (
                <button onClick={() => this.props.history.push('/login/')} style={{marginLeft: '2cm'}}
                        className="likes">
                    login
                </button>
            );
        }
    }
    render(){
        return (
            <div>
                <div style={
                    {display: 'inline'}
                }>
                    <h1>
                        <Link to="/view/">Sportstagram</Link>
                        {this.RenderButton()}
                    </h1>
                </div>
                { React.cloneElement(this.props.children, this.props) }
            </div>
        )
    }
}

export default Main;