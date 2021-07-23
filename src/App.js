import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
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
      loading: true,
      cats: [],
      dogs: [],
      computers: []
    }
  }


  componentDidMount () {
    this.performSearch();

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          cats: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          dogs: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          computers: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  performSearch = (query = 'cats') => {
    this.setState({ loading: true });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          photos: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }


  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={ this.performSearch }/>
          <Nav />
          {
          (this.state.loading) 
          ? <p>Loading... </p>
          :
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/cats'/>} />
            <Route path="/cats" render={ () =>  <PhotoContainer data={ this.state.cats } />} />
            <Route path='/dogs' render={ () =>  <PhotoContainer data={ this.state.dogs } />} />
            <Route path='/computers' render={ () =>  <PhotoContainer data={ this.state.computers } />} />
            <Route component={NotFound} />
          </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

