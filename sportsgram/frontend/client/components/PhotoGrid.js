import React from 'react';
import Photo from './Photo'
import PhotoLike from './PhotoLike';
import SuggestionsPics from './SuggestionsPics';

class PhotoGrid extends React.Component{

    componentDidMount(){
        if (typeof localStorage["session"] !== "undefined"
            && localStorage["session"] !== "undefined") {
            let idUser = JSON.parse(localStorage["session"])[0].id;
            let like1 = JSON.parse(localStorage["session"])[0].like1;
            let like2 = JSON.parse(localStorage["session"])[0].like2;
            let like3 = JSON.parse(localStorage["session"])[0].like3;
            this.props.newsFeed("http://localhost:3000/getNewFeedUser?idUser=" + idUser);
            this.props.getSuggestion("http://127.0.0.1:3000/getSuggestionsTags?id=" + idUser);
            this.props.getLikedPictures("http://localhost:3000/getImageLiked?idUser=" + idUser);
            this.props.getSharedPictures("http://localhost:3000/getImageShared?idUser=" + idUser);
            this.props.getUserFollowed("http://localhost:3000/getUserFollowed?idUser=" + idUser);
        }
    }

    RenderPicsSuggest(){
        if (this.props.items.suggestions !== undefined) {

            let names = [];
            this.props.items.suggestions[0].map((post) =>
                names.indexOf(post.pseudo) === -1 ? names.push(post.pseudo) : console.log('exit')
            );

            let res = [];

            let pics = [];
            let suggest = this.props.items.suggestions[0];
            let index = 0;
            let props = this.props;
            names.forEach(function (name) {
                suggest.map((post) =>
                    name === post.pseudo ? pics.push(post) : console.log('no')
                );
                pics !== [] ? res.push(<SuggestionsPics {...props} key={index} i={index}
                                                        slides={pics}/>) : console.log('empty');
                pics = [];
                index += 1;
            });

            return (<div className="photo-grid">{res}</div>);
        } else {
            return <p>Aucune Suggestions</p>
        }
    }

    RenderPicsFeed(){
        if (this.props.items.Pictures !== undefined) {
            return (
                <div className="photo-grid">
                    {this.props.items.Pictures.map((post, i) =>
                        <PhotoLike {...this.props} key={i} i={i} post={post}/>)}
                </div>
            )
        } else {
            return <p>Fil d'acualité vide</p>
        }
    }

    render(){
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        if (this.props.items.Message === 'Success') {
            return (
                <section>
                    <h1> suggestion </h1>
                    {this.RenderPicsSuggest()}
                    <h1>fil d'actualité </h1>
                    {this.RenderPicsFeed()}
                </section>
            )
        }
        return <p>File d'actu</p>;
    }
}

export default PhotoGrid;