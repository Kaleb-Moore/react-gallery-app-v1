import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {

  componentDidUpdate() {
    if(this.props.searchText !== this.props.query) {
      this.props.reload(this.props.query);
    }
  }

  render () {
    const results = this.props.data;
    let photos;
    if(results.length > 0) {
      photos = results.map( image =>
        <Photo 
          server={image.server}
          id={image.id}
          secret={image.secret}
          key={image.id}
          title={this.props.alt}
        />
      );
    } else {
      photos = <NotFound />
    }

    return (
      <div className="photo-container">
          {
            (results.length > 0) 
              ? <h2>{this.props.alt || this.props.searchText} Pictures</h2>
              : null
            }
         
          <ul>
            {photos}
          </ul>      
      </div>
    );
  };
}

export default PhotoContainer;