import React from "react";
import OddsButton from "../Bets/OddsButton";
import Card from "../Card";

const OddsBookmark = ({category,league, odds, isLive }) => {
  return (
    <div>
      {odds?.odds?.type?.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <Card header={`${index}.${item?.value}`}>
            {Array.isArray(item?.bookmaker) ? (
              <div className="d-flex flex-wrap gap-2">
                {item?.bookmaker?.map((markerItem, index) => (
                  <div
                    key={`bookmarker_name_${index}`}
                    style={{ minWidth: "120px" }}
                  >
                    <h6 className="df-font" style={{ paddingLeft: "5px" }}>
                      {markerItem?.name}
                    </h6>
                    {markerItem?.hasOwnProperty("total") ? (
                      Array.isArray(markerItem?.total) ? (
                        markerItem?.total?.map((totalitem, index) => (
                          <div key={`total_${index}`}>
                            {Array.isArray(totalitem?.odd) ? (
                              <div
                                className="d-flex align-items-center flex-wrap gap-2"
                                key={`total_odd_item_${index}`}
                              >
                                {totalitem?.odd?.map((odditem, index) => (
                                  <OddsButton
                                    key={index}
                                    odds={{
                                      category: category,
                                      league: league,
                                      bookmarkId: totalitem?.id,
                                      matchId: odds?.id,
                                      odd_details: totalitem?.odd,
                                      id: odditem?.id,
                                      title: `${odditem?.name} (${totalitem?.name})`,
                                      value: odditem?.value,
                                      toName: odds?.localteam?.name,
                                      twName: odds?.visitorteam?.name,
                                      isLive: isLive,
                                      market: markerItem?.name,
                                      oddsName: `${odditem?.name} (${totalitem?.name})`,
                                      disable:
                                        odditem?.stop == "True"
                                          ? true
                                          : item?.stop == "True"
                                          ? true
                                          : false,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="total_single_object_item_odds">
                          <div className="total_single_object_item_odd_view d-flex align-items-center flex-wrap">
                            {markerItem?.total?.odd?.map((odd, index) => (
                              <OddsButton
                                key={index}
                                odds={{
                                  category: category,
                                  league: league,
                                  bookmarkId: markerItem?.id,
                                  matchId: odds?.id,
                                  odd_details: markerItem?.total?.odd,
                                  id: odd?.id,
                                  title: `${odd?.name} (${markerItem?.total?.name}) `,
                                  value: odd?.value,
                                  toName: odds?.localteam?.name,
                                  twName: odds?.visitorteam?.name,
                                  isLive: isLive,
                                  market: markerItem?.name,
                                  oddsName: `${odd?.name} (${markerItem?.total?.name})`,
                                  disable:
                                    odd?.stop == "True"
                                      ? true
                                      : item?.stop == "True"
                                      ? true
                                      : false,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    ) : (
                      <>
                        {markerItem.hasOwnProperty("odd") ? (
                          Array.isArray(markerItem?.odd) ? (
                            <div className="d-flex align-items-center flex-wrap">
                              {markerItem?.odd?.map((mitem, index) => (
                                <OddsButton
                                  key={`odds_item_${index}`}
                                  odds={{
                                    category: category,
                                    league: league,
                                    bookmarkId: markerItem?.id,
                                    matchId: odds?.id,
                                    odd_details: markerItem?.odd,
                                    id: mitem?.id,
                                    title: `${mitem?.name} `,
                                    value: mitem?.value,
                                    toName: odds?.localteam?.name,
                                    twName: odds?.visitorteam?.name,
                                    isLive: isLive,
                                    market: markerItem?.name,
                                    oddsName: `${mitem?.name}`,
                                    disable:
                                      mitem?.stop == "True"
                                        ? true
                                        : item?.stop == "True"
                                        ? true
                                        : false,
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="without_total_odd">
                <>
                  <h6 className="df-font" style={{ paddingLeft: "5px" }}>
                    {item?.bookmaker?.name}
                  </h6>
                  {item?.bookmaker?.hasOwnProperty("total") ? (
                    Array.isArray(item?.bookmaker?.total) ? (
                      item?.bookmaker?.total?.map((totalitem, index) => (
                        <div
                          className={`total_${index}`}
                          key={`total_odd_item_${index}`}
                        >
                          {Array.isArray(totalitem?.odd) ? (
                            <div className="d-flex align-items-center flex-wrap">
                              {totalitem?.odd?.map((odditem, index) => (
                                <OddsButton
                                  key={index}
                                  odds={{
                                    category: category,
                                    league: league,
                                    bookmarkId: totalitem?.id,
                                    matchId: odds?.id,
                                    odd_details: totalitem?.odd,
                                    id: odditem?.id,
                                    title: `${odditem?.name} (${totalitem?.name})`,
                                    value: odditem?.value,
                                    toName: odds?.localteam?.name,
                                    twName: odds?.visitorteam?.name,
                                    isLive: isLive,
                                    market: item?.bookmaker?.name,
                                    oddsName: `${odditem?.name} (${totalitem?.name})`,
                                    disable:
                                      odditem?.stop == "True"
                                        ? true
                                        : item?.stop == "True"
                                        ? true
                                        : false,
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        className="d-flex align-items-center flex-wrap"
                        key={`total_odd_item_${index}`}
                      >
                        {item?.bookmaker?.total?.odd?.map((odditem, index) => (
                          <OddsButton
                            key={index}
                            odds={{
                              category: category,
                              league: league,
                              bookmarkId: item?.bookmaker?.total?.id,
                              matchId: odds?.id,
                              odd_details: item?.bookmaker?.total?.odd,
                              id: odditem?.id,
                              title: `${odditem?.name} (${item?.bookmaker?.total?.name})`,
                              value: odditem?.value,
                              toName: odds?.localteam?.name,
                              twName: odds?.visitorteam?.name,
                              isLive: isLive,
                              market: item?.bookmaker?.name,
                              oddsName: `${odditem?.name} (${item?.bookmaker?.total?.name})`,
                              disable:
                                odditem?.stop == "True"
                                  ? true
                                  : item?.stop == "True"
                                  ? true
                                  : false,
                            }}
                          />
                        ))}
                      </div>
                    )
                  ) : (
                    ""
                  )}

                  {item?.bookmaker.hasOwnProperty("odd") ? (
                    <div className="d-flex align-items-center flex-wrap">
                      {item?.bookmaker?.odd?.map((_item, index) => (
                        <OddsButton
                          key={`odds_item_${index}`}
                          odds={{
                            category: category,
                            league: league,
                            bookmarkId: item?.bookmaker?.id,
                            matchId: odds?.id,
                            odd_details: item?.bookmaker?.odd,
                            id: _item?.id,
                            title: `${_item?.name} h`,
                            value: _item?.value,
                            toName: odds?.localteam?.name,
                            twName: odds?.visitorteam?.name,
                            isLive: isLive,
                            market: item?.bookmaker?.name,
                            oddsName: _item?.name,
                            disable:
                              _item?.stop == "True"
                                ? true
                                : item?.stop == "True"
                                ? true
                                : false,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OddsBookmark;
