import React from 'react';
import ReactDOM from 'react-dom';

var hasOwn = {}.hasOwnProperty;

function classNames() {
    var classes = '';

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes += ' ' + arg;
        } else if (Array.isArray(arg)) {
            classes += ' ' + classNames.apply(null, arg);
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes += ' ' + key;
                }
            }
        }
    }

    return classes.substr(1);
}

class SuggestionsPics extends React.Component {
    constructor() {
        super();
        this.state = {activeIndex: 0};
        this.currentIndex = 0;
    }

    jumpToSlide(index) {
        this.setState({activeIndex: index});
    }

    componentDidMount() {
        this.AutoSwitch();
    }

    handleFollow(e) {
        let currentUserId = JSON.parse(localStorage["session"])[0].id;
        let imageUserId = this.props.slides[0].idUser;
        this.props.addFollow(
            'http://localhost:3000/follow',
            currentUserId,
            imageUserId
        );
        window.location.reload();
    }

    IsFollowed() {
        return (
            <button onClick={(e) => this.handleFollow(e)} value={this.state.activeIndex} className="likes">
                follow
            </button>
        )
    }

    AutoSwitch() {
        let self = this;
        window.setInterval(function () {
            if (self.state.activeIndex >= self.props.slides.length - 1) {
                self.setState({activeIndex: 0});
            } else {
                self.setState({activeIndex: self.state.activeIndex + 1});
            }
        }, 3000);
    }

    render() {
        return (
            <ul style={{width: '400px', height: '400px'}} className="slideshow-slides">
                {
                    this.props.slides.map((slide, index) => (
                        <li className={ classNames({active: index === this.state.activeIndex}) }>
                            <figure style={{width: '400px', height: '400px'}} className="grid-figure">
                                <div className="grid-photo-wrap">
                                    <img src={require('./../' + slide.path) } alt={slide.caption}
                                         className="grid-photo"/>
                                </div>
                                <figcaption>
                                    <p>{slide.pseudo}</p>
                                    <p>{slide.caption}</p>
                                    <div className="control-buttons">
                                        {this.IsFollowed()}
                                    </div>
                                </figcaption>
                            </figure>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default SuggestionsPics;