import React from 'react';
import Photo from './Photo';
import PhotoProfil from './PhotoProfil';
import Select from 'react-select';
import PhotoSubscription from './PhotoSubscription';

var options = [
    {value: 'Football', label: 'Football'},
    {value: 'Rugby', label: 'Rugby'},
    {value: 'Basket', label: 'Basket'},
    {value: 'Danse classique', label: 'Danse classique'},
    {value: 'Hip-Hop', label: 'Hip-Hop'},
    {value: 'Vélo', label: 'Velo'},

];

const Profil = React.createClass({

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
        ReactDOM.u
    },
    handleChangeTag2: function (e) {
        this.setState({tag2: e.value});
        this.refs.tag2_ref.value = e.value;
    },
    handleChangeTag3: function (e) {
        this.setState({tag3: e.value});
        this.refs.tag3_ref.value = e.value;
    },

     componentDidMount(){
        if (typeof localStorage["session"] !== "undefined"
            && localStorage["session"] !== "undefined") {
            let idUser = JSON.parse(localStorage["session"])[0].id;
            this.props.getLikedPictures("http://localhost:3000/getImageLiked?idUser=" + idUser);
        }
    },
    componentWillMount(){
        let idUser = JSON.parse(localStorage["session"])[0].id;
        this.props.getLikedPicturesProfile("http://localhost:3000/getImageLikedProfil?idUser=" + idUser);
        this.props.getImageUser("http://localhost:3000/getImageUser?idUser=" + idUser);
    },
    render(){

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (this.props.items.ImageLikedProfil !== undefined && this.props.items.MyImages !== undefined) {
            return (
                <section>


                    <div>
                        <h1>Profil</h1>
                        <div className="single-photo">
                            <form style={{margin: 'auto', position: 'relative'}}
                                  action="http://localhost:3000/fileupload" method="post" encType="multipart/form-data">
                                <h2>Upload a picture</h2>
                                 <input type="hidden" name="idUser" value={JSON.parse(localStorage["session"])[0].id}/>
                                <div className="custom-file-upload">
                                    <input type="file" name="filetoupload"/>
                                </div>
                                <br/>
                                <label style={{fontSize: '16px'}}> caption : </label>
                                <input style={{width: '100%'}} type="text" name="caption"/>
                                <p>
                                    <input type="hidden" name="tag1" ref="tag1_ref"/>
                                    <input type="hidden" name="tag2" ref="tag2_ref"/>
                                    <input type="hidden" name="tag3" ref="tag3_ref"/>
                                    <Select name="form-field-name" ref="tag1" value={this.state.tag1} options={options}
                                            onChange={this.handleChangeTag1}/>
                                    <Select name="form-field-name" ref="tag2" value={this.state.tag2} options={options}
                                            onChange={this.handleChangeTag2}/>
                                    <Select name="form-field-name" ref="tag3" value={this.state.tag3} options={options}
                                            onChange={this.handleChangeTag3}/>
                                </p>
                                <input value='Submit' style={{width: '100%'}} className="button" type="submit"/>
                            </form>
                        </div>
                    </div>

                    <h1>Mes photos</h1>
                    <div style={{marginTop: '15px'}} className="photo-grid">
                        {this.props.items.MyImages.map((post, i) =>
                            <PhotoProfil {...this.props} key={i} i={i} post={post}/>)}
                    </div>
                     <h1>Les photos que j'aime</h1>
                    <div className="photo-grid">
                          {this.props.items.ImageLikedProfil.map((post, i) =>
                            <PhotoSubscription {...this.props} key={i} i={i} post={post}/>)}
                            </div>
                </section>
            )
        }

        return (
            <div>
                <h1>Profil</h1>
                <div className="single-photo">
                    <form style={{margin: 'auto', position: 'relative'}} action="http://localhost:3000/fileupload"
                          method="post" encType="multipart/form-data">
                        <input type="file" name="filetoupload"/>
                        <input type="text" name="caption"/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        )

    }
});

export default Profil;