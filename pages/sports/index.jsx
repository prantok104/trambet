import BetCard from '@/components/Bets/BetCard';
import { HttpClientCall } from '@/components/HTTPClient';
import CustomSlider from '@/components/Slider';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import { FaFootballBall, FaBasketballBall } from 'react-icons/fa';


const sports_categories = [
  {
    name: "Football",
    slug: "football",
    icon: <FaFootballBall />,
    count: 10,
    sub_categories: [
      {
        name: "Premier League",
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 10,
        slug: "football_premier_league",
      },
      {
        name: "Champions League",
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
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
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
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
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
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
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
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
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 6,
        slug: "basketball_nba",
      },
      {
        name: "EuroLeague",
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
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
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 8,
        slug: "cricket_test_cricket",
      },
      {
        name: "ODI Cricket",
        image: "https://trambet.smshagor.com/assets/images/league/65b44d2b59bd21706315051.jpg",
        count: 6,
        slug: "cricket_odi_cricket",
      },
    ],
  },
];


const Sports = () => {
   const [categories, setCategories] = useState(sports_categories);
   const [filterCategory, setFilterCategory] = useState(sports_categories[0])
   const [activeCategory, setActiveCategory] = useState("american_football");
   const [activeSubCategory, setActiveSubCategory] = useState("");
   const [sliders, setSliders] = useState([]);
   
   const handleCategory = (slug) => {
      setActiveCategory(slug);
      const filteredCategory = categories?.filter((item) => item.slug === slug);

      const filterCategory = filteredCategory.length > 0 ? filteredCategory[0] : {};
      setFilterCategory(filterCategory);
   };
   const handleSubCategory = (slug) => {
     setActiveSubCategory(slug);
   };

   const sliderEffect = useCallback(async() => {
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
   }

   useEffect(() => {
     sliderEffect();
   }, [sliderEffect]);

  
   const testLoop = ['1','2','3','4','5','6','7','8','9']

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
                <span className="games-count">{item?.count}</span>
                {item?.icon}
                {item?.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="sport-sub-categories px-2">
          <ul className="sports-sub-category">
            {filterCategory?.sub_categories?.map((item, index) => (
              <li
                key={`sports_sub_categories${index}`}
                className={`d-flex align-items-center gap-2 ${
                  activeSubCategory == item?.slug ? "active" : ""
                }`}
                onClick={() => handleSubCategory(item?.slug)}
              >
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={20}
                  height={20}
                />
                <span>{item?.name}</span>
                <span className="games-count">{item?.count}</span>
              </li>
            ))}
          </ul>
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
              {testLoop?.map((item, index) => (
                <div className="col-md-3 mb-4" key={`bet_card_${index}`}>
                  <BetCard />
                </div>
              ))}
            </>
          </div>
        </div>
        {/* Sport item area end */}
      </div>
    </>
  );
}

export default Sports