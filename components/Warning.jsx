import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBug } from "@fortawesome/free-solid-svg-icons";
const WarningCard = ({message="Warning message", ...otherProps}) => {
  return (
    <div className="profile-warning-message bg-shadow px-4 py-3 d-flex align-items-center  gap-3 mb-2 w-100" {...otherProps}>
      <span>
        <FontAwesomeIcon icon={faBug} className={"warning-icon"} />
      </span>
      <span>{message}</span>
    </div>
  );
}

export default WarningCard