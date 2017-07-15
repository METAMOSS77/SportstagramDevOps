import React from 'react';
import {Link} from 'react-router';
import PhotoProfil from './PhotoProfil';
import PhotoProfilUpdate from './PhotoProfilUpdate';
import Comments from './Comments';
// comments

const SingleProfil = React.createClass({
    render(){
        const {postId} = this.props.params;
        const i = this.props.items.MyImages.findIndex((post) => post.code === postId);
        const post = this.props.items.MyImages[i];

        return (
            <div className="single-photo">
                <PhotoProfilUpdate i={i} post={post} {...this.props} />
            </div>
            )
    }
});

export default SingleProfil;