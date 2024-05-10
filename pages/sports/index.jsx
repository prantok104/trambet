"use client"
import BetCard from "@/components/Bets/BetCard";
import { HttpClientCall } from "@/components/HTTPClient";
import CustomSlider from "@/components/Slider";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaFootballBall, FaBasketballBall } from "react-icons/fa";
import axios from "axios";
import { API_HOST, SEASON, notify } from "@/components/Helper";
import Loader from "@/components/Loader";
import { Spinner } from "react-bootstrap";

const sports_categories = [
  {
    name: "Football",
    slug: "football",
    icon: <FaFootballBall />,
    count: 10,
    sub_categories: [
      {
        name: "Premier League",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 10,
        slug: "football_premier_league",
      },
      {
        name: "Champions League",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 20,
        slug: "football_champions_league",
      },
    ],
  },
  {
    name: "Rugby",
    slug: "rugby",
    icon: <FaFootballBall />,
    count: 25,
    sub_categories: [
      {
        name: "Six Nations",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 10,
        slug: "rugby_six_nations",
      },
    ],
  },
  {
    name: "Tennis",
    slug: "tennis",
    icon: <FaFootballBall />,
    count: 8,
    sub_categories: [
      {
        name: "Wimbledon",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 5,
        slug: "tennis_wimbledon",
      },
    ],
  },
  {
    name: "Golf",
    slug: "golf",
    icon: <FaFootballBall />,
    count: 10,
    sub_categories: [
      {
        name: "PGA Tour",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 3,
        slug: "golf_pga_tour",
      },
    ],
  },
  {
    name: "Basketball",
    slug: "basketball",
    icon: <FaBasketballBall />,
    count: 15,
    sub_categories: [
      {
        name: "NBA",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 6,
        slug: "basketball_nba",
      },
      {
        name: "EuroLeague",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 4,
        slug: "basketball_euroleague",
      },
    ],
  },
  {
    name: "Cricket",
    slug: "cricket",
    icon: <FaFootballBall />,
    count: 5,
    sub_categories: [
      {
        name: "Test Cricket",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 8,
        slug: "cricket_test_cricket",
      },
      {
        name: "ODI Cricket",
        image:
          "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 6,
        slug: "cricket_odi_cricket",
      },
    ],
  },
];

const Sports = () => {
  const categoriesData = [
    {
      id: 5,
      name: "Basketball",
      slug: "bsktbl",
    },
    {
      id: 16,
      name: "Soccer",
      slug: "soccernew",
    },
    {
      id: 17,
      name: "Tennis",
      slug: "tennis_scores",
    },
    {
      id: 6,
      name: "Hockey",
      slug: "hockey",
    },
    {
      id: 4,
      name: "Handball",
      slug: "handball",
    },
    {
      id: 7,
      name: "Volleyball",
      slug: "volleyball",
    },
    {
      id: 3,
      name: "Football",
      slug: "football",
    },
    {
      id: 2,
      name: "Baseball",
      slug: "baseball",
    },
    {
      id: 8,
      name: "Cricket",
      slug: "cricket",
    },
    {
      id: 9,
      name: "Rugby Union",
      slug: "rugby",
    },
    {
      id: 20,
      name: "Rugby League",
      slug: "rugbyleague",
    },
    {
      id: 10,
      name: "Boxing",
      slug: "boxing",
    },
    {
      id: 11,
      name: "Esports",
      slug: "esports",
    },
    {
      id: 12,
      name: "Futsal",
      slug: "futsal",
    },
    {
      id: 13,
      name: "MMA",
      slug: "mma",
    },
    {
      id: 21,
      name: "Table Tennis",
      slug: "table_tennis",
    },
    {
      id: 14,
      name: "Golf",
      slug: "golf",
    },
    {
      id: 15,
      name: "Darts",
      slug: "darts",
    },
  ];
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState(sports_categories[0]);
  const [activeCategory, setActiveCategory] = useState();
  const [activeSubCategory, setActiveSubCategory] = useState();
  const [sliders, setSliders] = useState([]);
  const [league, setLeague] = useState([]);
  const [loading, setLoading] = useState(true);
  const [odds, setOdds] = useState([]);
  const [oddsLoading, setOddsLoading] = useState(false)

  const handleSubCategory = (slug) => {
    setActiveSubCategory(slug);
    setOddsLoading(true);
    axios
      .get(
        `${API_HOST}/getodds/soccer?cat=${activeCategory}_10&league=${slug}&json=1`
      )
      .then((response) => {
        console.log(response?.data?.scores);
        setOdds(response?.data?.scores?.categories);
        setOddsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setOddsLoading(false);
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
        // console.log(objectData?.data?.leagues?.league);
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
    // console.log(league);
  };

  const handleCategory = (slug) => {
    setActiveCategory(slug);
    setLoading(true);
    let endpoint = `${API_HOST}/${slug}/leagues?json=1&season=${SEASON}`;
    if (slug == "cricket") {
      endpoint = `${API_HOST}/cricketfixtures/tours/tours?json=1&season=${SEASON}`;
    }
    axios
      .get(endpoint)
      .then((response) => {
        if(slug == 'cricket') { 
            setLeague(response?.data?.fixtures?.category);
        }else{
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
  };
  useEffect(() => {
    sliderEffect();
    setCategories(categoriesData);
    fetchLeague(categoriesData[0]);
  }, []);

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
              {league?.map((item, index) => (
                <li
                  key={`sports_sub_categories${index}`}
                  className={`d-flex align-items-center gap-2 ${
                    activeSubCategory == item?.id ? "active" : ""
                  }`}
                  onClick={() => handleSubCategory(item?.id)}
                >
                  {/* <Image
            src={item?.image}
            alt={item?.name}
            width={20}
            height={20}
          />  */}
                  <span>{item?.name}</span>
                  <span className="games-count">0</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-2">
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
                  Category Name/ sub category name
                </h6>
              </div>
            </div>
            <>
              {oddsLoading ? (
                <Loader />
              ) : (
                odds?.map((odd, oddIndex) =>
                  odd.matches?.map((item, index) => (
                    <div
                      className="col-md-3 mb-4"
                      key={`bet_card_${oddIndex}_${index}`}
                    >
                      <BetCard data={item} href="/sports/game/12" />
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
