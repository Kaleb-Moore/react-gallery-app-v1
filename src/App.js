import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import apiKey from './components/config';



class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      cats: [],
      dogs: [],
      computers: []
    }
  }


  componentDidMount () {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=525e7edbd3a509ae599b517235d9d962&tags=cats&text=cats&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photos: res.data.photos.photo
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
    });
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        photos: res.data.photos.photo
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
    })
  }


  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <SearchForm />
          <Nav />
          <Switch>
           <Route exact path="/" component={ () => <PhotoContainer data={ this.performSearch}/> } />
           <Route exact path="/cats" component={ () => <PhotoContainer data={ this.state.cats }/> } />
           <Route exact path="/dogs" component={ () => <PhotoContainer data={ this.state.dogs }/> } />
           <Route exact path="/computers" component={ () => <PhotoContainer data={ this.state.computers }/> } />
           
           <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

