import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
const NotFount = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center not-found-page text-center">
      <FontAwesomeIcon icon={faFaceSadTear} />
      <strong>404</strong>
      <h1>Page not found</h1>
      <p>
        The page you are looking for doesnt exist or an other error occurred,
        <br /> Go back, or head over to choose a new direction.
      </p>
    </div>
  );
};

export default NotFount;
