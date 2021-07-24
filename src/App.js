import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import apiKey from './components/config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

class App extends Component {

  state = {
    photos: [],
    cats: [],
    dogs: [],
    computers: [],
    title: '',
    loading: true
  };

  componentDidMount () {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          cats: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => console.log("Error fetching and parsing data", error));
    
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          dogs: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => console.log("Error fetching and parsing data", error));

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          computers: res.data.photos.photo,
          loading: false
        })
      })
      .catch(error => console.log("Error fetching and parsing data", error));
  }

  performSearch = (query) => {
    this.setState({ loading: true })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          photos: res.data.photos.photo,
          title: query,
          loading: false
        })
      })
      .catch(error => console.log("Error fetching and parsing data", error));
  }

  render () {
    console.log(this.performSearch)
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav />
          {
            (this.state.loading)
            ? <p>Loading...</p>
            :
            <Switch>
              <Route exact path='/' render={ () => <Redirect to='/cats' /> } />
              <Route path='/cats' render={ () => <PhotoContainer data={this.state.cats} alt="cat" /> } />
              <Route path='/dogs' render={ () => <PhotoContainer data={this.state.dogs} alt="dog"/> } /> 
              <Route path='/computers' render={ () => <PhotoContainer data={this.state.computers} alt="computer" /> } />
              <Route path='/search/:query' render={ ( { match } ) => <PhotoContainer data={this.state.photos} alt={this.state.title} reload={this.performSearch} query={match.params.query} /> } />
              <Route render={ () => <ul><PageNotFound /></ul> } />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
