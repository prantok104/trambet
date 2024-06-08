import React, { useCallback, useEffect, useState } from "react";
import { API_HOST, SEASON, notify } from "../Helper";
import axios from "axios";
import FeaturedCard from "../Bets/FeaturedCard";
import FeaturedSportsCard from "../Bets/FeaturedSportsCard";
import { Spinner } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import jsondata from "@/public/sports.json";
const HomePageSports = ({ withMatch = false }) => {
  const [odds, setOdds] = useState([]);
  const [oddsLoading, setOddsLoading] = useState(true);
  const [sportLoading, setSportLoading] = useState(true);
  const [sports, setSports] = useState(jsondata);

  var defaultSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 676,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var defaultmatchSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 676,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const effect = useCallback(async () => {
    await fetchSportsData();
  }, []);

  const fetchSportsData = async () => {
    await axios
      .get(`${API_HOST}/cricket/schedule1?json=1`)
      .then((response) => {
        const modify = response?.data?.fixtures?.category?.filter(
          (item) =>
            item?.match?.matchinfo?.info[0]?.value != "" ||
            item?.match?.odds != null
        );

        setOdds(modify?.slice(0, 35));
        setOddsLoading(false);
      })
      .catch((error) => {
        // notify("error", "No Cricket match found.");
        setOdds([]);
      });
  };

  useEffect(() => {
    effect();
  }, [effect]);

  // Call API for Football
 const fetchFootballSportsData = useCallback(async () => {
   try {
     setSportLoading(true);
     const response = await axios.get(
       `${API_HOST}/getodds/soccer?cat=football_10&league=1002&json=1`
     );
     console.log(response.data);
     setSports(response.data);
   } catch (error) {
     console.error("Error fetching football sports data:", error);
   } finally {
     setSportLoading(false);
   }
 }, []);

 useEffect(() => {
   fetchFootballSportsData();
 }, [fetchFootballSportsData]);

  return (
    <div>
      <div className="row">
        {oddsLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            {!withMatch ? (
              <>
                <h5 className="font-14 mb-3 mt-3">Featured games</h5>
                <Slider
                  {...defaultSettings}
                  className="space-item-slider arrow-insider"
                >
                  {odds?.map((odd, oddIndex) => (
                    <div className="col-md-3" key={`bet_card_${oddIndex}`}>
                      <div style={{ margin: "0 5px" }}>
                        <FeaturedCard
                          data={odd}
                          href={`/sports/game/${odd?.match?.id}?cat=cricket&sub=${odd?.id}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                          category={"cricket"}
                          subCategories={""}
                          bg="/cricket_featured.png"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            ) : (
              <>
                <h5 className="font-14 mb-4">Live Games</h5>
                <Slider
                  {...defaultmatchSettings}
                  className="space-item-slider arrow-insider"
                >
                  {odds?.map((odd, oddIndex) => {
                    return (
                      !odd?.match?.matchinfo?.info[0]?.value && (
                        <div className="col-md-3" key={`bet_card_${oddIndex}`}>
                          <div style={{ margin: "0 5px" }}>
                            <FeaturedCard
                              data={odd}
                              href={`/sports/game/${odd?.match?.id}?cat=cricket&sub=${odd?.id}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                              category={"cricket"}
                              subCategories={""}
                              bg="/cricket1.jpg"
                              overlap="overlap"
                            />
                          </div>
                        </div>
                      )
                    );
                  })}
                </Slider>

                <h5 className="font-14 mt-3 mb-3">Pre Matches</h5>
                <Slider
                  {...defaultmatchSettings}
                  className="space-item-slider arrow-insider"
                >
                  {odds?.map((odd, oddIndex) => {
                    return (
                      !odd?.match?.matchinfo?.info[0]?.value && (
                        <div className="col-md-3" key={`bet_card_${oddIndex}`}>
                          <div style={{ margin: "0 5px" }}>
                            <FeaturedCard
                              data={odd}
                              href={`/sports/game/${odd?.match?.id}?cat=cricket&sub=${odd?.id}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                              category={"cricket"}
                              subCategories={""}
                              bg="/cricket1.jpg"
                              overlap="overlap"
                            />
                          </div>
                        </div>
                      )
                    );
                  })}
                </Slider>

                <h5 className="font-14 mt-3 mb-3">E-Sports</h5>
                {sportLoading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <Spinner />
                  </div>
                ) : (
                  <Slider
                    {...defaultmatchSettings}
                    className="space-item-slider arrow-insider"
                  >
                    {sports?.scores?.categories[0]?.matches?.map(
                      (_item, oddIndex) => {
                        return (
                          <>
                            <div key={`bet_card_${oddIndex}`}>
                              <div style={{ margin: "0 5px" }}>
                                <FeaturedSportsCard
                                  data={_item}
                                  href={`/sports/game_/${_item?.id}?cat=football_10&league=1002&match=${_item?.id}`}
                                  category={"football"}
                                  subCategories={"Nfl"}
                                  bg="/football.jpg"
                                  overlap="overlap"
                                />
                              </div>
                            </div>
                          </>
                        );
                      }
                    )}
                  </Slider>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageSports;
