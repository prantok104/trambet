import React, { useState } from "react";
import Card from "../Card";
import DetailsOddsButton from "../Bets/DetailsOddsButton";
import { FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa6";
const OddsDisplay = ({ details, cat, league='' }) => {
   const [collapsed, setCollapsed] = useState({});

   const toggleCollapse = (index) => {
     setCollapsed((prevState) => ({
       ...prevState,
       [index]: !prevState[index],
     }));
   };

  const getDeepestOdds = (bookmakers) => {
    let deepestOdds = [];

    const findDeepestOdds = (odds) => {
      if (Array.isArray(odds) && odds.length > 0) {
        if (odds[0].odds) {
          findDeepestOdds(odds[0].odds);
        } else {
          deepestOdds = odds;
        }
      }
    };

    if (Array.isArray(bookmakers) && bookmakers.length > 0) {
      findDeepestOdds(bookmakers[0].odds);
    }

    return deepestOdds;
  };

  const renderOdds = (odds, parentIndex, markerItem, parentType, isHtFt) => {
    return odds.map((oddsItem, oddsIndex) => {
      if (oddsItem.bookmakers) {
        return oddsItem.bookmakers.map((subMarker, subMarkerIndex) => (
          <div
            key={`bookmarker_name_${parentIndex}_${oddsIndex}_${subMarkerIndex}`}
          >
            <h6 className="df-font" style={{ paddingLeft: "5px" }}>
              {subMarker.name}
            </h6>
            <div>
              {renderOdds(
                subMarker.odds,
                `${parentIndex}_${oddsIndex}_${subMarkerIndex}`,
                subMarker,
                parentType,
                isHtFt
              )}
            </div>
          </div>
        ));
      } else if (oddsItem.odds) {
        return renderOdds(
          oddsItem.odds,
          `${parentIndex}_${oddsIndex}`,
          markerItem,
          parentType,
          isHtFt
        );
      } else {
        return (
          <div
            key={`odds_item_${parentIndex}_${oddsIndex}`}
            className="options-odd"
          >
            <DetailsOddsButton
              odds={{
                category: cat,
                league: league ? league : details.name,
                bookmarkId: markerItem.id,
                matchId: details?.id,
                odd_details: markerItem.odds,
                id: `${oddsItem.name}${Math.random(0, 8)}`,
                title:
                  parentType === "handicap"
                    ? `${oddsItem.name} ${markerItem.name}`
                    : oddsItem.name,
                value: oddsItem.value,
                toName: details?.localteam?.name,
                twName: details?.awayteam?.name,
                isLive: oddsItem.status === "Not Started" ? "Upcoming" : "LIVE",
                market: markerItem.name,
                oddsName: `${oddsItem.name}`,
                disable: oddsItem?.stop == "True" ? true : false,
                isHtFt,
              }}
            />
          </div>
        );
      }
    });
  };

  return details?.odds?.length > 0
    ? details?.odds.map((item, index) => {
        const deepestOdds = getDeepestOdds(item.bookmakers);
        return (
          <div
            className="details-odds-bookmakers"
            key={index}
            style={{ marginBottom: "5px" }}
          >
            <h5 className="d-flex align-items-center justify-content-between">
              <div>
                <FaRegStar style={{ marginTop: "-5px" }} /> {`${item.value}`}
              </div>
              <div onClick={() => toggleCollapse(index)}>
                {collapsed[index] ? (
                  <FaChevronUp style={{ cursor: "pointer", p: 1 }} />
                ) : (
                  <FaChevronDown style={{ cursor: "pointer", p: 1 }} />
                )}
              </div>
            </h5>
            {Array.isArray(item?.bookmakers) && item?.bookmakers?.length > 0 ? (
              <>
                {item.value !== "HT/FT Double" && (
                  <div className="odds-option-header">
                    {deepestOdds.map((_itemhead, headIndex) => (
                      <div className="single-header-option" key={headIndex}>
                        {_itemhead?.name}
                      </div>
                    ))}
                  </div>
                )}

                {!collapsed[index] && (
                  <div className="details-odds-button">
                    {item?.bookmakers?.map((markerItem, markerIndex) => (
                      <div key={`bookmarker_name_${index}_${markerIndex}`}>
                        <div
                          className={`details-item-odd column${deepestOdds?.length} d-flex align-items-center  flex-wrap`}
                        >
                          {renderOdds(
                            markerItem.odds,
                            `${index}_${markerIndex}`,
                            markerItem,
                            item.type,
                            item.value === "HT/FT Double"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        );
      })
    : "No Data found right now";
};

export default OddsDisplay;
