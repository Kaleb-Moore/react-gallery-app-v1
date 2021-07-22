import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {
  render() {
    let results = this.props.data;
    let photos;
    if (results.length > 0) {
      photos = results.map(image =>
        <Photo 
          farm={image.farm} 
          server={image.server} 
          id={image.id} 
          secret={image.secret} 
          title={image.title} 
          key={image.id}
        />
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