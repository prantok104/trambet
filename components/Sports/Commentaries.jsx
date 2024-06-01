"use client"
import React from "react";
import { ListGroup } from "react-bootstrap";

const Commentaries = ({ commentaries }) => {
  return (
    <ListGroup>
      {commentaries?.map((commentary, index) => (
        <ListGroup.Item key={index} className="d-flex gap-2">
          <p>{commentary.post}</p>
          <p>Runs: {commentary.runs}</p>
          <p>Over: {commentary.over}</p>
          <p>Balls: {commentary.balls}</p>
          {commentary.noballs === "True" && <p>Its a No ball!</p>}
          {commentary.wides === "True" && <p>Its a Wides!</p>}
          {commentary.isFour === "True" && <p>Its a Four!</p>}
          {commentary.isSix === "True" && <p>Its a Six!</p>}
          {commentary.isWicket === "True" && <p>Wicket!</p>}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Commentaries;
