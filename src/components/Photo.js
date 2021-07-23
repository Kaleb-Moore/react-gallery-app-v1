import React from 'react';

function Photo(props) {
  return (
    <li>
        <img src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`} alt={props.title} />
    </li>
  );
}

export default Photo;
