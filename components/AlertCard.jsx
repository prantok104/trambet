import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
const AlertCard = ({icon, message = "Alert message", bg="#282F42", ...otherProps }) => {
  return (
    <div className="profile-warning-message bg-shadow px-4 py-3 d-flex align-items-center  gap-3 mb-2" style={{background: `${bg}`}} {...otherProps}>
      <span>
        <FontAwesomeIcon
          icon={icon ?? faCircleInfo}
          className={"warning-icon"}
        />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default AlertCard;
