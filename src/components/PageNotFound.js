import React from "react";

const PageNotFound = () => (
  <div>
    <ul>
      <li className="not-found">
        <h1>(404): Page Not Found</h1> 
        <li><NavLink to='/cats'>Cats</NavLink></li>
    </li>
  </ul>
  </div>
);

export default PageNotFound;