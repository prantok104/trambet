import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
const Breadcrumb = ({title, path}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="breadcrumb-area bg-shadow px-3 py-2 df-radius">
          <h5>{title}</h5>
          <h6><FontAwesomeIcon icon={faHome} /> {path}</h6>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb