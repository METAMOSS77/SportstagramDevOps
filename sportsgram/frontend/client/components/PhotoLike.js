import React from 'react';
import {Link} from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class PhotoLike extends React.Component{

    handleLike(e) {
        console.log(this.props.items.Pictures[this.props.i].id);
        console.log(this.props.i);
        console.log(JSON.parse(localStorage["session"])[0].id);
        this.props.incrementSuggestionLike(
            'http://localhost:3000/likePicture',
            this.props.i,
            JSON.parse(localStorage["session"])[0].id,
            this.props.items.Pictures[this.props.i].id,
           this.props.items.Pictures[this.props.i].id
        );
    }

    handleFollow(e) {
        var currentUserId = JSON.parse(localStorage["session"])[0].id;
        var imageUserId = this.props.post.user_id;
        this.props.addFollow(
            'http://localhost:3000/follow',
            currentUserId,
            imageUserId
        );
        window.location.reload();
    }

     handleShare(e) {
        var currentUserId = JSON.parse(localStorage["session"])[0].id;
        var imageUserId = this.props.post.id;
        this.props.addShare(
            'http://localhost:3000/share',
            currentUserId,
            imageUserId
        );
    }

    getIndex(value, arr, prop) {
        let index = -1;
        arr.forEach(function (item, i) {
            item[prop] === value ? index = i: console.log('empty');
        });

        return index;
    }

    IsFollowed(){
        if (undefined !== this.props.items.UserFollowed && this.getIndex(this.props.post.user_id, this.props.items.UserFollowed, 'id') === -1) {
            return (
                <button onClick={(e) => this.handleFollow(e)} value={this.props.i} className="likes">
                    follow
                </button>
            )
        } else {
            return (
                <button disabled={true} className="likes">
                    followed
                </button>
            )
        }
    }

    IsLiked(){
        if (undefined !== this.props.items.LikedPictures && this.getIndex(this.props.post.id, this.props.items.LikedPictures, 'id_image') === -1) {
            console.log("id = " + this.props.post.id + "on click ok " + (undefined !== this.props.items.LikedPictures));
            return (
                 <button autoFocus={true}
                    onClick={(e) => this.handleLike(e)}
                    value={this.props.i} className="likes">
                    &hearts; {this.props.post.nb_like}
               </button>               
            )
        } else {
            console.log("id = " + this.props.post.id + "on click pas ok");
             return (
              <button disabled={true}
                    value={this.props.i} className="likes">
                    &hearts; {this.props.post.nb_like}
               </button>
            )
        }
    }

    IsShared(){
        if (undefined !== this.props.items.SharedPictures && this.getIndex(this.props.post.id, this.props.items.SharedPictures, 'id_image') === -1) {
            console.log("id = " + this.props.post.id + "on click ok " + (undefined !== this.props.items.LikedPictures));
            return (
                 <button onClick={(e) => this.handleShare(e)} value={this.props.i} className="likes">
                    share
                </button>   
            )
        } else {
            return (
                 <button value={this.props.i} className="likes">
                    shared
                </button>   
            )
        }
    }

    render(){
        const {post, i, comments} = this.props;

        return (
            <figure className="grid-figure">
                <div className="grid-photo-wrap">
                    <Link to={`/view/${post.code}`}>
                        <img src={require('./../' + post.path) } alt={post.caption} className="grid-photo"/>
                    </Link>

                    <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500}
                                        transitionLeaveTimeout={500}>
                        <span key={post.nb_like} className="likes-heart">{post.nb_like}</span>
                    </CSSTransitionGroup>

                </div>

                <figcaption>
                    <p>{post.caption}</p>
                    <p>{post.tag_1} {post.tag_2} {post.tag_3}</p>
                    <p>Photo de {post.pseudo}</p>
                    <div className="control-buttons">
                        {this.IsLiked()}
                        {this.IsFollowed()}
                        {this.IsShared()}
                    </div>
                </figcaption>
            </figure>
        )
    }
}

export default PhotoLike;