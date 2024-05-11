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
          {commentary.noballs === "True" && <p>It's a No ball!</p>}
          {commentary.wides === "True" && <p>It's a Wides!</p>}
          {commentary.isFour === "True" && <p>It's a Four!</p>}
          {commentary.isSix === "True" && <p>It's a Six!</p>}
          {commentary.isWicket === "True" && <p>Wicket!</p>}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Commentaries;
