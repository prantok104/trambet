"use client";
import Slider from "@/components/Slider";
import PromotionSliders from "@/components/PromotionSliders";
import PromoOne from "@/public/promo/1.png";
import PromoTwo from "@/public/promo/2.png";
import PromoThree from "@/public/promo/3.png";
import PromoFour from "@/public/promo/4.png";
import Link from "next/link";
import PromoCard from "@/components/PromoCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { HttpClientCall } from "@/components/HTTPClient";
import { Modal } from "react-bootstrap";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import HomePageCasino from "@/components/Casino/HomePageCasino";
import HomePageSports from "@/components/Sports/HomePageSports";
import { useSelector } from "react-redux";
const Home = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const buttonRef = useRef(null);
  const { setShowOneClickModal, showOneClickModal, userData } = useUserData();
  const [sliders, setSliders] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const promoCards = [
    {
      title: "Sports",
      sub_title: "Live Games 24/7",
      href: "/sports",
      image: PromoOne,
    },
    {
      title: "Live Games",
      sub_title: "Free turnaments",
      href: "/sports/live",
      image: PromoFour,
    },
    {
      title: "Upcoming Games",
      sub_title: "Over 250 sports",
      href: "/sports/upcoming",
      image: PromoThree,
    },
    {
      title: "Casino",
      sub_title: "Over 3000 games",
      href: "/casino/live",
      image: PromoTwo,
    },
    {
      title: "Live Casino",
      sub_title: "Live dealers",
      href: "/casino/live",
      image: PromoThree,
    },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("oneTimeUserData"));
    if (data) {
      setShowOneClickModal(true);
    }
  }, []);

  useEffect(() => {
    async function fetchBannerData() {
      const banner = await HttpClientCall({
        method: "GET",
        endpoint: "frontend/banner",
        includeAuth: false,
        data: [],
      });

      if (banner) {
        setSliders(banner.data);
      }
    }
    fetchBannerData();
  }, []);

  // Text copy

  const handleCopy = (bettor, pass) => {
    const textCopy = `Bettor ID: ${bettor}\nPassword: ${pass}`;
    if (typeof navigator != "undefined") {
      navigator.clipboard
        .writeText(textCopy)
        .then(() => {
          if (buttonRef.current) {
            buttonRef.current.textContent = "Copied!"; // Success message
          }
        })
        .catch((err) => {
          console.error("Failed to copy text (Modern API):", err);
        });
    }
  };

  // Promotions slider area 
  
  const effect = useCallback(async () => {
    await fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const responseData = await HttpClientCall({
      method: "GET",
      endpoint: "front/promotions",
      includeAuth: false,
      data: [],
    });
    console.log(responseData);
    if(responseData?.code) {
      setPromotions(responseData?.data)
    }
  };


  useEffect(() => {
    effect();
  }, [effect]);


  return (
    <>
      <div className="container-fluid">
        {/* Slider area start */}
        <div className="row">
          <div className="col-md-7">
            <div className="main-slider-area-start">
              <Slider images={sliders} />
            </div>
          </div>

          <div className="col-md-5">
            <div className=" mobile-promo d-flex align-items-center justify-content-between gap-4">
              <div
                className="single-goal-section"
                style={{
                  background:
                    'url("/casino.png") no-repeat center center/cover',
                }}
              >
                <h1>Cashback up to 30% on casinos</h1>
                <Link href="/casino/live">Go to Casino</Link>
              </div>
              <div
                className="single-goal-section"
                style={{
                  background: 'url("/gift.png") no-repeat center center/cover',
                }}
              >
                <h1>Welcome bonus 300 BDT on registration</h1>
                {user ? "" : <Link href="/auth/register">Registration</Link>}
              </div>
            </div>
          </div>
        </div>
        {/* Slider area end */}

        {/* Promo card area start */}
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="all-promo-cards">
              {promoCards?.map((item, index) => (
                <PromoCard
                  key={index}
                  title={item.title}
                  subTitle={item.sub_title}
                  href={item.href}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Promo card area end */}

        {/* Homepage Slider for promotions area start */}
        <div className="promotions-slider-area my-2">
          <PromotionSliders images={promotions} />
        </div>
        {/* Homepage Slider for promotions area end */}

        {/* Sports area start */}
        <div className="mt-2">
          <HomePageSports />
        </div>
        {/* Sports area end */}

        {/* Live Casino area start */}
        <div className="col-md-6 mt-2">
          <HomePageCasino />
        </div>
        {/* Live Casino area end */}

        {/* one click registration page area start */}
        <Modal
          show={showOneClickModal}
          onHide={() => {
            setShowOneClickModal(false);
            localStorage.removeItem("oneTimeUserData");
          }}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>Please keep this message secure for your records</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="p-4 df-radius mb-2"
              style={{ background: "#090F1E" }}
            >
              <h6 className="mb-3 font-14">
                Bettor ID:{" "}
                <span className="mx-3 d-inline-block copy-text">
                  {userData?.user_id}
                </span>
              </h6>
              <h6 className="font-14">
                Password:
                <span className="mx-3 d-inline-block copy-text">
                  {userData?.one_time_pass}
                </span>
              </h6>
            </div>
            <div className="text-end">
              <button
                ref={buttonRef}
                onClick={() =>
                  handleCopy(userData?.user_id, userData?.one_time_pass)
                }
                className="df-btn df-bg"
              >
                COPY
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* one click registration end */}
      </div>
    </>
  );
};
export default Home;
