import React from 'react'
import Inning from './Inning';

const Innings = ({data}) => {
    let inningType;

    if (Array.isArray(data)) {
      inningType = "array";
    } else if (typeof data === "object" && data !== null) {
      inningType = "object";
    } else {
      inningType = "other";
    }


  return (
    <>
      {inningType === "object" ? (
        <Inning item={data} />
      ) : (
        data?.map((item, index) => (
         <Inning key={`multiple_innings_${index}`} item={item} />
        ))
      )}
    </>
  );
}

export default Innings