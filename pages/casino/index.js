import ImageTitle from "@/components/ImageTitle";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import casinos from '@/assets/casino.json'
import Image from "next/image";
import WarningCard from "@/components/Warning";
import Loader from "@/components/Loader";
const index = () => {
const [casinoData, setCasinoData] = useState(casinos);
const [filteredCasino, setFilteredCasino] = useState(casinos);
const [activeItem, setActiveItem] = useState('all');
const [loading, setloading] = useState(false);
 let filterTimeout;
// const getCasinoData = async () => {
//   try {
//     const response = await axios.get(
//       "https://trambet.smshagor.com/user/casino/get-casino"
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch casino data");
//     }
//     const data = await response.json();
//     setCasinoData(data); // Update state with fetched data
//   } catch (error) {
//     console.error("Error fetching casino data:", error);
//   }
// };

// useEffect(() => {
//   getCasinoData();
// }, []);

  const handleLabel = (title) => {
    setActiveItem(title);
    setloading(true);
     clearTimeout(filterTimeout);
      filterTimeout = setTimeout(() => {
        if (title !== "all") {
          const updatedFilteredCasinoData = {
            ...filteredCasino,
            content: {
              ...filteredCasino.content,
              gameList: filteredCasino.content.gameList.filter(
                (item) => item?.title === title
              ),
            },
          };
          setloading(false);
          setCasinoData(updatedFilteredCasinoData);
        } else {
          setloading(false);
          setCasinoData(filteredCasino);
        }
      }, 1500);
  }

  return (
    <>
      <ImageTitle title="Live Casino" />
      {loading ? (
        <Loader />
      ) : (
        <div className="casino-area-start">
          <div className="casino-menu-area">
            <ul className="casino-menu">
              <li
                className={`casino-item ${activeItem == "all" ? "active" : ""}`}
                onClick={() => handleLabel("all")}
              >
                <Image
                  src={`https://trambet.smshagor.com/assets/providers/providers_icons/rubyplay.png`}
                  alt={"all"}
                  width={24}
                  height={24}
                />
                <span>All</span>
              </li>
              {casinoData?.content?.gameTitles?.map((item, index) => (
                <li
                  key={`single-label${index}`}
                  className={`casino-item ${
                    activeItem == item ? "active" : ""
                  }`}
                  onClick={() => handleLabel(item)}
                >
                  <Image
                    src={`https://trambet.smshagor.com/assets/providers/providers_icons/${item}.png`}
                    alt={""}
                    width={24}
                    height={24}
                  />
                  <span>{item?.replace(/_/g, " ")}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="casino-all-data">
            {casinoData?.content?.gameList?.length > 0 ? (
              casinoData?.content?.gameList?.map((item) => (
                <div
                  className="casino-item-data"
                  style={{ background: `url(${item?.img})` }}
                  key={item?.id}
                >
                  <span>{item?.name}</span>
                  <div>
                    <button className="play-btn">Play</button>
                  </div>
                </div>
              ))
            ) : (
              <WarningCard message="Have no casino game found!" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default index;
