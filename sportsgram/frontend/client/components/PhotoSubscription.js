import React from 'react';
import {Link} from 'react-router';

class PhotoSubscription extends React.Component{

    render(){
        const {post, i, comments} = this.props;
        return (
            <figure className="grid-figure">
                <div className="grid-photo-wrap">                   
                    <img src={require('./../'+post.path) } alt={post.caption} className="grid-photo"/>
                     <p className="likes">
                            &hearts; {post.nb_like}
                        </p>  
                        <p className="likes">
                            share : {post.nb_shared}
                        </p>           

                </div>

                <figcaption>
                    <p>{post.caption}</p>
                    <p>{post.tag_1} {post.tag_2} {post.tag_3}</p>
                </figcaption>
            </figure>
        )
    }
}

export default PhotoSubscription;