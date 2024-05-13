import React from "react";
import SquadsPlayerForCricket from "./SquadsPlayerForCricket";

const CricketSquads = ({ data = [] }) => {
  return (
    <>
      {data?.map((item, idx) => (
        <SquadsPlayerForCricket
          team={item?.name}
          item={item?.player}
          key={idx}
        />
      ))}
    </>
  );
};

export default CricketSquads;
