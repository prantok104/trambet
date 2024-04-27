import Image from 'next/image';
import React, { useState } from 'react'
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
   
   const handleCategory = (slug) => {
      setActiveCategory(slug);
      const filteredCategory = categories?.filter((item) => item.slug === slug);

      const filterCategory = filteredCategory.length > 0 ? filteredCategory[0] : {};
      setFilterCategory(filterCategory);
   };
   const handleSubCategory = (slug) => {
     setActiveSubCategory(slug);
   };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sports category area start */}
        <div className="col-md-12">
          <div className="sports-main-menu-area">
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
        </div>
        {/* Sports category area end */}
        {/* Spotrs sub category area start */}
        <div className="col-md-3 col-lg-2">
          <div className="sport-sub-categories">
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
        {/* Spotrs sub category area end */}
      </div>
    </div>
  );
}

export default Sports