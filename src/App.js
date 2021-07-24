//Import React and other modules for routing
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

//Import API Key for flickr get requests
import apiKey from "./components/config";

//Import components
import SearchForm from "./components/SearchForm";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
	//Initialize state and create empty arrays to hold pictures
	state = {
		photos: [],
		cats: [],
		dogs: [],
		computers: [],
		title: "",
		loading: true,
	};

	//On page load it calls the flickr API and stores the results for the default searches in their respective state
	componentDidMount() {
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				this.setState({
					cats: res.data.photos.photo,
					loading: false,
				});
			})
			.catch(error => console.log("Error fetching and parsing data", error));

		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				this.setState({
					dogs: res.data.photos.photo,
					loading: false,
				});
			})
			.catch(error => console.log("Error fetching and parsing data", error));

		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				this.setState({
					computers: res.data.photos.photo,
					loading: false,
				});
			})
			.catch(error => console.log("Error fetching and parsing data", error));
	}

	//Calls the flickr API with a query and returns the photo results into the state
	performSearch = query => {
		this.setState({ loading: true });
		axios
			.get(
				`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
			)
			.then(res => {
				this.setState({
					photos: res.data.photos.photo,
					title: query,
					loading: false,
				});
			})
			.catch(error => console.log("Error fetching and parsing data", error));
	};

	//Renders and redirects URL to the appropriate paths
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					{/* When you submit a search it calls for the flickr API to get pictures and store them in state */}
					<SearchForm onSearch={this.performSearch} />
					<Nav />
					{/* Checks if the state is set to loading, if it is displays "Loading..." until the photos are recieved and ready to be displayed */}
					{this.state.loading ? (
						<p>Loading...</p>
					) : (
						<Switch>
							{/* Switch - Chooses the first route in the list and loads that one. If it finds no routes it loads the page not found route */}

							{/* Navigating to the root URL redirects to the /cats, this makes sure that on page load there are always pictures being loaded and not just a blank screen */}
							<Route exact path="/" render={() => <Redirect to="/cats" />} />

							{/* Loads the /cats route and displays the images store in state for that page */}
							<Route
								exact
								path="/cats"
								render={() => (
									<PhotoContainer data={this.state.cats} alt="cat" />
								)}
							/>

							{/* Loads the /dogs route and displays the images store in state for that page */}
							<Route
								exact
								path="/dogs"
								render={() => (
									<PhotoContainer data={this.state.dogs} alt="dog" />
								)}
							/>

							{/* Loads the /computes route and displays the images store in state for that page */}
							<Route
								exact
								path="/computers"
								render={() => (
									<PhotoContainer data={this.state.computers} alt="computer" />
								)}
							/>

							{/* Loads a custom route on search, this route uses the users input to define the URL path. It then loads the pictures in state associated with that path */}
							<Route
								exact
								path="/search/:query"
								render={({ match }) => (
									<PhotoContainer
										data={this.state.photos}
										reload={this.performSearch}
										searchText={this.state.title}
										query={match.params.query}
									/>
								)}
							/>

							{/* Catch all route incase the URL path is not valid */}
							<Route
								render={() => (
									<ul>
										<PageNotFound />
									</ul>
								)}
							/>
						</Switch>
					)}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
