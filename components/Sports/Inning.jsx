import React from "react";
import InningsBatmans from "./InningsBatmans";
import InningsBowlers from "./InningsBowlers";

const Inning = ({ item }) => {
  return (
    <div className="cricket-sports-inning">
      <h6 className="h-4 text-capitalize mb-4">{`${item?.name} (${item?.team})`}</h6>
      <InningsBatmans data={item?.batsmanstats?.player} />

      <InningsBowlers data={item?.bowlers?.player ?? []} />
    </div>
  );
};

export default Inning;
