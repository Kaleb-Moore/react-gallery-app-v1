import React, {Component} from 'react';
import Photo from './Photo';

class PhotoContainer extends Component {

  componentDidMount() {
    if(this.props.alt !== this.props.query) {
      this.props.reload(this.props.query);
    }
  }

  componentDidUpdate() {
    this.props.reload(this.props.query);
  }

  render () {
    console.log(this.props.reload)
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
    }

    return (
      <div className="photo-container">
          <h2>{this.props.alt} Pictures</h2>
          <ul>
            {photos}
          </ul>      
      </div>
    );
  };
}

export default PhotoContainer;