"use client";
import BetCard from "@/components/Bets/BetCard";
import { HttpClientCall } from "@/components/HTTPClient";
import CustomSlider from "@/components/Slider";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaFootballBall, FaBasketballBall } from "react-icons/fa";
import axios from "axios";
import { API_HOST, SEASON, notify } from "@/components/Helper";
import { Spinner } from "react-bootstrap";
import CricketBetCard from "@/components/Bets/CricketBetCard";
import { set } from "lodash";
import BetCardLive from "../../../components/Bets/BetCardLive";

const Sports = () => {
  const categoriesData = [
    {
      id: 2,
      name: "Baseball",
      slug: "baseball",
      restApi: 1,
    },
    {
      id: 5,
      name: "Basketball",
      slug: "bsktbl",
      restApi: 1,
    },
    {
      id: 8,
      name: "Cricket",
      slug: "cricket",
      restApi: 0,
    },
    {
      id: 16,
      name: "Soccer",
      slug: "soccernew",
      restApi: 1,
    },
    {
      id: 17,
      name: "Tennis",
      slug: "tennis_scores",
      restApi: 1,
    },
    {
      id: 6,
      name: "Hockey",
      slug: "hockey",
      restApi: 1,
    },
    {
      id: 4,
      name: "Handball",
      slug: "handball",
      restApi: 0,
    },
    {
      id: 7,
      name: "Volleyball",
      slug: "volleyball",
      restApi: 1,
    },
    {
      id: 3,
      name: "Football",
      slug: "football",
      restApi: 0,
    },

    {
      id: 9,
      name: "Rugby Union",
      slug: "rugby",
      restApi: 0,
    },
    {
      id: 20,
      name: "Rugby League",
      slug: "rugbyleague",
      restApi: 0,
    },
    {
      id: 10,
      name: "Boxing",
      slug: "boxing",
      restApi: 0,
    },
    {
      id: 11,
      name: "Esports",
      slug: "esports",
      restApi: 0,
    },
    {
      id: 12,
      name: "Futsal",
      slug: "futsal",
      restApi: 0,
    },
    {
      id: 13,
      name: "MMA",
      slug: "mma",
      restApi: 0,
    },
    {
      id: 21,
      name: "Table Tennis",
      slug: "table_tennis",
      restApi: 1,
    },
    {
      id: 14,
      name: "Golf",
      slug: "golf",
      restApi: 0,
    },
    {
      id: 15,
      name: "Darts",
      slug: "darts",
      restApi: 0,
    },
  ];
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]?.slug);
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [sliders, setSliders] = useState([]);
  const [league, setLeague] = useState([]);
  const [loading, setLoading] = useState(true);
  const [odds, setOdds] = useState([]);
  const [oddsLoading, setOddsLoading] = useState(false);
  const [filterOddsCricket, setFilterOddsCricket] = useState([]);
  const [filterOddsSoccer, setFilterOddsSoccer] = useState([]);

  const handleFetchLeague = async (slug) => {
    setActiveCategory(slug);
    setLoading(true);
    let endpoint = `${API_HOST}/${slug}/d1?json=1`;
    axios.get(endpoint)
      .then((response) => {
        const stringData = JSON.stringify(response);
        const removeAt = stringData.replace(/@/g, "");
        const objectData = JSON.parse(removeAt);
        setLeague(objectData?.data?.scores?.category);

        const leagueData = objectData?.data?.scores?.category?.filter((item) => item.id == objectData?.data?.scores?.category[0].id);
        setOdds(leagueData);
        setLoading(false);
      })
      .catch((error) => {
        notify("error", "No league found for this category");
        setLeague([]);
      });

      
      
  };

  const sliderEffect = useCallback(async () => {
    await fetchSlider();
  }, []);

  const fetchSlider = async () => {
    const banner = await HttpClientCall({
      method: "GET",
      endpoint: "frontend/banner",
      includeAuth: false,
      data: [],
    });
    setSliders(banner?.data);
  };

  useEffect(() => {
    sliderEffect();
    handleFetchLeague(categoriesData[0]?.slug);
    setCategories(categoriesData);
  }, []);

  const handleSubCategory = async (slug) => {
    setActiveSubCategory(slug);
    setOddsLoading(true);
    //filter data from setLeague
    const leagueData = league?.filter((item) => item?.id == slug);
    setOdds(leagueData);
    setOddsLoading(false);
  };

  //   console.log(odds.matches);
  return (
    <>
      <div className="category-sub-category">
        <div className="sports-main-menu-area px-2">
          <ul className="sports-categories d-flex">
            {categories?.map((item, index) => (
              <li
                key={`categories_menu_${index}`}
                className={`d-flex align-items-center justify-content-center gap-1 flex-column ${
                  activeCategory == item?.slug ? "active" : ""
                }`}
                onClick={() => handleFetchLeague(item?.slug)}
              >
                {/* <span className="games-count">{item?.length}</span> */}
                <div
                  className="text-white"
                  dangerouslySetInnerHTML={{ __html: item?.icon }}
                />
                {item?.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="sport-sub-categories px-2">
          {loading ? (
            <ul className="sports-sub-category">
              <li className="mx-auto">
                <Spinner animation="border" variant="primary" />
              </li>
            </ul>
          ) : (
            <ul className="sports-sub-category">
              {activeCategory == "cricket"
                ? league?.map((item, index) => {
                    const oddsCricketCopy = [...filterOddsCricket];
                    const matchedItems = oddsCricketCopy?.filter(
                      (_item) => _item.id === item?.id
                    );
                    return (
                      <li
                        key={`sports_sub_categories${index}`}
                        className={`d-flex align-items-center gap-2 ${
                          activeSubCategory == item?.id ? "active" : ""
                        }`}
                        onClick={() => handleSubCategory(item?.id)}
                      >
                        <span>{item?.name}</span>
                        {/* <span className="games-count">{matchedItems?.length}</span> */}
                      </li>
                    );
                  })
                : league?.map((item, index) => (
                    <li
                      key={`sports_sub_categories${index}`}
                      className={`d-flex align-items-center gap-2 ${
                        activeSubCategory == item?.id ? "active" : ""
                      }`}
                      onClick={() => handleSubCategory(item?.id)}
                    >
                      <span>{item?.name}</span>
                      {/* <span className="games-count">0</span> */}
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-fluid">
        {/* Sport item area start */}
        <div>
          <div className="sport-contents-area">
            <div className="main-slider-area-start mt-2">
              <CustomSlider images={sliders} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Image
                  src={"https://placehold.co/60x60"}
                  width={40}
                  height={40}
                  alt="Caregory/ Sub category name"
                  unoptimized
                  style={{
                    borderRadius: "50%",
                    padding: "5px",
                    background: "#1E263D",
                  }}
                />
                <h6 style={{ fontSize: "14px" }}>
                  {activeCategory &&
                    categories?.find((item) => item?.slug == activeCategory)
                      ?.name}{" "}
                  {activeSubCategory
                    ? `/ ${
                        league?.find((item) => item?.id == activeSubCategory)
                          ?.name
                      }`
                    : ""}
                </h6>
              </div>
            </div>
            <>
              {oddsLoading ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : activeCategory == "cricket" ? (
                odds?.map((odd, oddIndex) => (
                  <div className="col-md-3 mb-4" key={`bet_card_${oddIndex}`}>
                    <CricketBetCard
                      data={odd}
                      href={`/sports/game/${odd?.match?.id}?cat=${activeCategory}&sub=${activeSubCategory}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                      category={activeCategory}
                      subCategories={activeSubCategory}
                    />
                  </div>
                ))
              ) : (
                odds?.map((odd, oddIndex) =>
                    Array.isArray(odd.match) ? odd.match.map((item, index) => (
                        <div
                          className="col-md-3 mb-4"
                          key={`bet_card_${oddIndex}_${index}`}
                        >
                          <BetCardLive
                            data={item}
                            href={`/sports/game_/${item?.id}?cat=${activeCategory}&league=${odd?.id}&match=${item?.id}`}
                            category={activeCategory}
                            subCategories={activeSubCategory}
                          />
                        </div>
                      )) : (
                        <div
                          className="col-md-3 mb-4"
                          key={`bet_card_${oddIndex}`}
                        >
                          <BetCardLive
                            data={odd.match}
                            href={`/sports/game_/${odd?.id}?cat=${activeCategory}&league=${odd?.id}&match=${odd?.id}`}
                            category={activeCategory}
                            subCategories={activeSubCategory}
                          />
                        </div>
                      )
                )
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sports;
