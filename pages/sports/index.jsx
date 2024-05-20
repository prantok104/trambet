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

const Sports = () => {
  const categoriesData = [
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
      id: 2,
      name: "Baseball",
      slug: "baseball",
      restApi: 1,
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
  const [filterCategory, setFilterCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState();
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [sliders, setSliders] = useState([]);
  const [league, setLeague] = useState([]);
  const [loading, setLoading] = useState(true);
  const [odds, setOdds] = useState([]);
  const [oddsLoading, setOddsLoading] = useState(false);
  const [filterOddsCricket, setFilterOddsCricket] = useState([]);

  const handleSubCategory = (slug) => {
    setActiveSubCategory(slug);
    setOddsLoading(true);
    axios.get(`${API_HOST}/getodds/soccer?cat=${activeCategory}_10&league=${slug}&json=1`).then((response) => {
        setOdds(response?.data?.scores?.categories);
        setOddsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setOddsLoading(false);
      });
    if (activeCategory == "cricket") {
      setActiveSubCategory(slug);
      setOdds(filterOddsCricket?.filter(item => item?.id == slug))
    } else {
      setActiveSubCategory(slug);
      setOddsLoading(true);
      axios.get(`${API_HOST}/getodds/soccer?cat=${activeCategory}_10&league=${slug}&json=1`)
        .then((response) => {
          setOdds(response?.data?.scores?.categories);
          setOddsLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setOddsLoading(false);
        });
    }
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

  // const fetchCategory = async () => {

  // };

  const fetchLeague = async (data) => {
    setActiveCategory(data?.slug);

    let endpoint = `${API_HOST}/${data.slug}/leagues?json=1&season=${SEASON}`;

    axios
      .get(endpoint)
      .then((response) => {
        const stringData = JSON.stringify(response);
        const removeAt = stringData.replace(/@/g, "");
        const objectData = JSON.parse(removeAt);
        // // console.log(objectData?.data?.leagues?.league);
        if (
          objectData?.data?.leagues !== undefined &&
          objectData?.data?.leagues !== null
        ) {
          setLeague(objectData?.data?.leagues?.league);
        } else if (
          objectData?.data?.categories?.category === undefined ||
          objectData?.data?.categories?.category
        ) {
          setLeague(objectData?.data?.categories?.category);
        }
        setLoading(false);
      })
      .catch((error) => {
        notify("error", "No league found for this category");
        setLeague([]);
      });
    // // console.log(league);
  };

  const handleCategory = (slug) => {
    setActiveCategory(slug);setActiveSubCategory('');
    setLoading(true);
    let endpoint = `${API_HOST}/${slug}/leagues?json=1&season=${SEASON}`;
    if (slug == "cricket") {
      endpoint = `${API_HOST}/cricketfixtures/tours/tours?json=1&season=${SEASON}`;
    }

    // League fetch
    axios
      .get(endpoint)
      .then((response) => {
        if (slug == "cricket") {
          setLeague(response?.data?.fixtures?.category);
        } else {
          const stringData = JSON.stringify(response);
          const removeAt = stringData.replace(/@/g, "");
          const objectData = JSON.parse(removeAt);
          setFilterCategory(objectData);
          if (
            objectData?.data?.leagues !== undefined &&
            objectData?.data?.leagues !== null
          ) {
            setLeague(objectData?.data?.leagues?.league);
          } else if (
            objectData?.data?.categories?.category === undefined ||
            objectData?.data?.categories?.category
          ) {
            setLeague(objectData?.data?.categories?.category);
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        notify("error", "No league found for this category");
        setLeague([]);
      });

    // Upcoming game fetch only for cricket
    if (slug == "cricket") {
      setOddsLoading(true);
      axios
        .get(`${API_HOST}/cricket/schedule1?json=1`)
        .then((response) => {
          setOdds(response?.data?.fixtures?.category);
          setFilterOddsCricket(response?.data?.fixtures?.category);
          setOddsLoading(false);
        })
        .catch((error) => {
          notify("error", "No Cricket match found.");
          setOdds([]);
        });
    }
  };
  useEffect(() => {
    sliderEffect();
    setCategories(categoriesData);
    fetchLeague(categoriesData[0]);
  }, []);

  console.log(odds);

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
                onClick={() => handleCategory(item?.slug)}
              >
                <span className="games-count">{item?.length}</span>
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
                ?
                  league?.map((item, index) => {
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
                        <span className="games-count">{matchedItems?.length}</span>
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
                      <span className="games-count">0</span>
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
                  odd.matches?.map((item, index) => (
                    <div
                      className="col-md-3 mb-4"
                      key={`bet_card_${oddIndex}_${index}`}
                    >
                      <BetCard
                        data={item}
                        href={`/sports/game_/${item?.id}?cat=${activeCategory}&league=${odd?.id}&match=${item?.id}`}
                        category={activeCategory}
                        subCategories={activeSubCategory}
                      />
                    </div>
                  ))
                )
              )}
            </>
          </div>
        </div>
        {/* Sport item area end */}
      </div>
    </>
  );
};

export default Sports;
