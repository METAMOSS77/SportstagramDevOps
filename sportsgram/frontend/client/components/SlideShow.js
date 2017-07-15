import React from 'react';

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

class SlideShow extends React.Component {
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
            <div className="slideshow">
                <ul className="slideshow-slides">
                    {
                        this.props.slides.map((slide, index) => (
                            <li style={{width: '100%'}}
                                className={ classNames({active: index === this.state.activeIndex}) }>
                                <figure className="slide-figure" style={{width: '100%'}}>
                                    <img style={{width: '100%', height: '600px'}} src={require('./../' + slide.path)}/>
                                    { slide.caption ?
                                        <figcaption className="slide-figcaption">{ slide.caption }</figcaption> : null }
                                </figure>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default SlideShow;