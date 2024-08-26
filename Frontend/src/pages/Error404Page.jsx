


import { NavLink } from "react-router-dom";

import "./Error404Page.css";

export const Error404 = () => {
  const currentURL = window.location.href;
  
  return (
    <>

      <section id="error-page">
        <div className="content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          {/* <button onClick={() => openPopup(currentURL)}>Share</button> */}
          <p>
            Oops! It seems like the page({currentURL}) you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.


          </p>
          <div className="btns">
            <NavLink to="/">return home</NavLink>
            <NavLink to="/contact">report problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );

};