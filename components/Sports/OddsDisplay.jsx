import React from "react";
import Card from "../Card";
import OddsButton from "../Bets/OddsButton";

const OddsDisplay = ({ details, cat }) => {
  const renderOdds = (odds, parentIndex, markerItem, parentType) => {
    return odds.map((oddsItem, oddsIndex) => {
      if (oddsItem.bookmakers) {
        return oddsItem.bookmakers.map((subMarker, subMarkerIndex) => (
          <div
            key={`bookmarker_name_${parentIndex}_${oddsIndex}_${subMarkerIndex}`}
            style={{ minWidth: "120px" }}
          >
            <h6 className="df-font" style={{ paddingLeft: "5px" }}>
              {subMarker.name}
            </h6>
            <div className="d-flex align-items-center flex-wrap">
              {renderOdds(
                subMarker.odds,
                `${parentIndex}_${oddsIndex}_${subMarkerIndex}`,
                subMarker,
                parentType
              )}
            </div>
          </div>
        ));
      } else if (oddsItem.odds) {
        return renderOdds(
          oddsItem.odds,
          `${parentIndex}_${oddsIndex}`,
          markerItem,
          parentType
        );
      } else {
        return (
          <OddsButton
            key={`odds_item_${parentIndex}_${oddsIndex}`}
            odds={{
              category: cat,
              league: details.name,
              bookmarkId: markerItem.id,
              matchId: details.matches[0].id,
              odd_details: markerItem.odds,
              id: `${oddsItem.name}${Math.random(0, 8)}`,
              title:
                parentType === "handicap"
                  ? `${oddsItem.name} ${markerItem.name}`
                  : oddsItem.name,
              value: oddsItem.value,
              toName: details.matches[0].localteam?.name,
              twName: details.matches[0].awayteam?.name,
              isLive: oddsItem.status === "Not Started" ? true : false,
              market: markerItem.name,
              oddsName: `${oddsItem.name}`,
              disable: oddsItem?.stop == "True" ? true: false
            }}
          />
        );
      }
    });
  };

  return details?.matches?.length > 0
    ? details.matches[0].odds.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <Card header={`${item.value}`}>
            <div className="d-flex flex-wrap gap-2">
              {item.bookmakers.map((markerItem, markerIndex) => (
                <div
                  key={`bookmarker_name_${index}_${markerIndex}`}
                  style={{ minWidth: "120px" }}
                >
                  <h6 className="df-font" style={{ paddingLeft: "5px" }}>
                    {markerItem.name}
                  </h6>
                  <div className="d-flex align-items-center flex-wrap">
                    {renderOdds(
                      markerItem.odds,
                      `${index}_${markerIndex}`,
                      markerItem,
                      item.type
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ))
    : "No Data found right now";
};

export default OddsDisplay;
