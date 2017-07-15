import React from 'react';
import {Link} from 'react-router';
import Select from 'react-select';

var options = [
  { value: 'Football', label: 'Football' },
  { value: 'Rugby', label: 'Rugby' },
  { value: 'Basket', label: 'Basket' },
  { value: 'Danse classique', label: 'Danse classique' },
  { value: 'Hip-Hop', label: 'Hip-Hop' },
  { value: 'Vélo', label: 'Velo' },

];

const PhotoProfilUpdate = React.createClass({


getInitialState: function() {
      return {
          tag1: '',
          tag2: '',
          tag3: ''
        };
    },

    handleChangeTag1: function(e) {
      this.setState({tag1: e.value});
      this.refs.tag1_ref.value = e.value;
    },

     handleChangeTag2: function(e) {
      this.setState({tag2: e.value});
      this.refs.tag2_ref.value = e.value;
    },

     handleChangeTag3: function(e) {
      this.setState({tag3: e.value});
      this.refs.tag3_ref.value = e.value;
    },

   update_image(){
        /*this.props.deletePicture('http://localhost:3000/deleteImage', i, postId);
        this.props.history.push('/profil/');*/
        var caption = '';
        var tag1 = '';
        var tag2 = '';
        var tag3 = '';
        if (this.refs.caption.value === '') {
            caption = this.refs.captionOld.value;
        } else {
            caption = this.refs.caption.value;
        }

        if (this.refs.tag1_ref.value === '') {
            tag1 = this.refs.tag1_old.value;
        } else {
            tag1 = this.refs.tag1_ref.value;
        }

         if (this.refs.tag2_ref.value === '') {
            tag2 = this.refs.tag2_old.value;
        } else {
            tag2 = this.refs.tag2_ref.value;
        }

         if (this.refs.tag3_ref.value === '') {
            tag3 = this.refs.tag3_old.value;
        } else {
            tag3 = this.refs.tag3_ref.value;
        }


        console.log("caption = " +  caption);
        console.log("tag1 = " +  tag1);
        console.log("tag2 = " +  tag2);
        console.log("tag3 = " +  tag3);
        console.log("id = " + this.props.post.id);
         this.props.updatePicture(
            'http://localhost:3000/updatePicture',
            caption,
            tag1,
            tag2,
            tag3,
            this.props.post.id,
            );
        //console.log("tag1 new = " +  this.refs.tag1_ref.value);
        //console.log("tag1 = " +  this.refs.tag1_old.value);
    },

    render(){
        const {post, i, comments} = this.props;
        console.log("messageupload = " + this.props.items.MessageUpdate);
        if (this.props.items.MessageUpdate === 'Upload') {
            console.log("test");
            this.props.history.push('/profil/');
        }

        return (
            <figure className="grid-figure">
                <div className="grid-photo-wrap">
                    <Link to={`/profil/${post.code}`}>
                        <img src={require('./../'+post.path) } alt={post.caption} className="grid-photo"/>
                    </Link>
                </div>

                <figcaption>
                    <input type="text" ref="caption"/>
                    <input type="text" ref="tag1_old" value={post.tag_1} disabled/>
                    <input type="text" ref="tag2_old" value={post.tag_2} disabled/>
                    <input type="text" ref="tag3_old" value={post.tag_3} disabled/>
                    <input type="text" ref="captionOld" value={post.caption} disabled/>
                    <Select name="form-field-name" ref="tag1" value={this.state.tag1} options={options} onChange={this.handleChangeTag1} />
                    <Select name="form-field-name" ref="tag2" value={this.state.tag2} options={options} onChange={this.handleChangeTag2} />
                    <Select name="form-field-name" ref="tag3" value={this.state.tag3} options={options} onChange={this.handleChangeTag3} />
                      <input type="hidden" ref="tag1_ref"/>
                      <input type="hidden" ref="tag2_ref"/>
                      <input type="hidden" ref="tag3_ref"/>
                    <div className="control-buttons">
                        <button onClick={() => this.update_image(i, post.id)} className="likes">
                            &times; UpdateImage
                        </button>
                    </div>
                </figcaption>
            </figure>
        )
    }
});

export default PhotoProfilUpdate;