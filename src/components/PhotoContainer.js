//Import Modules
import React, { Component } from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

class PhotoContainer extends Component {
	/** When components mount it checks that the URl and the UI title display the same thing.
	 * If it doesn't then it calls the fetch data function and returns the proper images.
	 */
	componentDidUpdate() {
		if (this.props.searchText !== this.props.query) {
			this.props.reload(this.props.query);
		}
	}

	render() {
		/**Iterates over the results data and creates new Photo components for each result,
		 * or loads NotFound if results are 0.
		 */
		const results = this.props.data;
		let photos;
		if (results.length > 0) {
			photos = results.map(image => (
				<Photo
					server={image.server}
					id={image.id}
					secret={image.secret}
					key={image.id}
					title={this.props.alt}
				/>
			));
		} else {
			photos = <NotFound />;
		}

		return (
			<div className="photo-container">
				{/* Checks if the results are greater than 0 if so then it will display the title with either the Alt or the SearchText whichever is present */}
				{results.length > 0 ? (
					<h2>{this.props.alt || this.props.searchText} Pictures</h2>
				) : null}

				<ul>{photos}</ul>
			</div>
		);
	}
}

export default PhotoContainer;
