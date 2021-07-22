import React, { Component } from 'react';
import NotFound from '../components/NotFound';
import Photo from './Photo';

class PhotoContainer extends Component {
  render() {
    let results = this.props.data;
    let photos;
    if (results.length > 0) {
      photos = results.map(image =>
        <Photo farm={image.photo.farm} server={image.photo.server} id={image.photo.id} secret={image.photo.secret} title={image.photo.title} key={image.photo.id}/>
      );
    } else {
      photos = <NotFound />
    }

    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {photos}
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;