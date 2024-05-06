import ImageTitle from "@/components/ImageTitle";
import { useEffect, useState, React, useRef } from "react";
import Image from "next/image";
import WarningCard from "@/components/Warning";
import Loader from "@/components/Loader";
import { getLiveCasinoData, getLiveCasinoOpenData } from "@/services/casino";
import { useRouter } from "next/router";
export default function LiveCasino() {
  const [casinoData, setCasinoData] = useState();
  const [filteredCasino, setFilteredCasino] = useState();
  const [activeItem, setActiveItem] = useState("all");
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const casinoRef = useRef(null);
  const router = useRouter();
  let filterTimeout;
  useEffect(() => {
    setloading(true);
    async function fetchData() {
      const data = await getLiveCasinoData();
      setCasinoData(data);
      setFilteredCasino(data);
      setloading(false);
    }
    fetchData();
  }, []);


    useEffect(() => {
      if (!casinoRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      observer.observe(casinoRef.current);

      return () => {
        if (casinoRef.current) {
          observer.unobserve(casinoRef.current);
        }
      };
    }, [casinoRef.current]);


  const handleLabel = (title) => {
    setActiveItem(title);
    setPage(1);
    setloading(true);
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
      if (title !== "all") {
        const updatedFilteredCasinoData = {
          ...filteredCasino,
          content: {
            ...filteredCasino?.content,
            gameList: filteredCasino?.content?.gameList.filter(
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
    }, 0);
  };
  const handelPlayButtonClick = async (id, demo) => {
    setloading(true)
    const response = await getLiveCasinoOpenData({ id: id, demo: demo });
    if (response) {
      setloading(false)
      router.push(`/casino/play?url=${response.game.url}`);
    }
  };
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
              <>
                {casinoData?.content?.gameList?.slice(0, page *
                pageSize)?.map((item) => (
                <div
                  className="casino-item-data"
                  style={{ background: `url(${item?.img})` }}
                  key={item?.id}
                >
                  <span>{item?.name}</span>
                  <div>
                    <button
                      className="play-btn"
                      onClick={() =>
                        handelPlayButtonClick(item?.id, item?.demo)
                      }
                    >
                      Play
                    </button>
                  </div>
                </div>
                ))}
                <div ref={casinoRef} />
              </>
            ) : (
              <WarningCard message="Have no casino game found!" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
