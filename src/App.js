import React, { Component } from 'react';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import apiKey from './components/config';



class App extends Component {

  state = {
    photos: []
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photos: res.data.photos
      })
    })
  }


  render() {
    console.log(this.performSearch)
    return (
      <div className='container'>
        <SearchForm />
        <Nav />
        <PhotoContainer data={ this.state.photos }/>
      </div>
    );
  }
}

export default App;

