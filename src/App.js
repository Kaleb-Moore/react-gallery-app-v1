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
      loading: true,
      cats: [],
      dogs: [],
      computers: []
    }
  }


  componentDidMount () {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
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
    console.log(this.state.cats)
    return (
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={ this.performSearch }/>
          <Nav />
          <Switch>
          <Route exact path='/' component={ () => (this.state.loading) ? <p>Loading... </p>: <PhotoContainer data={ this.state.photos } /> } />
           <Route path="/cats" render={ () => <PhotoContainer data={ this.state.photos }/> } />
           <Route path="/dogs" render={ () => <PhotoContainer data={ this.state.photos }/> } />
           <Route path="/computers" render={ () => <PhotoContainer data={ this.state.photos }/> } />
           
           <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

