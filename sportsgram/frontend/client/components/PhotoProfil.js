import React from 'react';
import {Link} from 'react-router';
import Select from 'react-select';

var options = [
    {value: 'Football', label: 'Football'},
    {value: 'Rugby', label: 'Rugby'},
    {value: 'Basket', label: 'Basket'},
    {value: 'Danse classique', label: 'Danse classique'},
    {value: 'Hip-Hop', label: 'Hip-Hop'},
    {value: 'Vélo', label: 'Velo'},

];

class PhotoProfil extends React.Component{

    delete_image(i, postId){
        this.props.deletePicture('http://localhost:3000/deleteImage', i, postId);
        this.props.history.push('/profil/');
    }

    render(){
        const {post, i, comments} = this.props;
        return (
            <figure className="grid-figure">
                <div className="grid-photo-wrap">
                    <Link to={`/profil/${post.code}`}>
                        <img src={require('./../' + post.path) } alt={post.caption} className="grid-photo"/>
                    </Link>

                </div>

                <figcaption>
                    <p>{post.caption}</p>
                    <p>{post.tag_1} {post.tag_2} {post.tag_3}</p>
                    <div style={{display: 'inline-block'}}>
                        <a>&hearts; {post.nb_like}</a>
                        <a>  Shared : {post.shared}</a>
                    </div>
                    <div className="control-buttons">
                        {console.log(post.code)}
                        <Link to={`/profil/${post.code}`} className="button">
                            <span className="comment-count">
                            <span className="speech-bubble"></span>
                                Edit
                            </span>
                        </Link>
                        <button onClick={() => this.delete_image(i, post.id)} className="likes">
                            &times; Delete
                        </button>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

export default PhotoProfil;