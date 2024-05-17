import Slider from "@/components/Slider";
import FirstSlider from "@/public/sliders/first.png";
import SecondSlider from "@/public/sliders/second.png";
import ThreeSlider from "@/public/sliders/three.png";
import FourSlider from "@/public/sliders/four.png";
import PromoOne from "@/public/promo/1.png";
import PromoTwo from "@/public/promo/2.png";
import PromoThree from "@/public/promo/3.png";
import PromoFour from "@/public/promo/4.png";
import Link from "next/link";
import PromoCard from "@/components/PromoCard";
import { useEffect, useState } from "react";
import { HttpClientCall } from "@/components/HTTPClient";
import { Modal } from "react-bootstrap";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import HomePageCasino from "@/components/Casino/HomePageCasino";
import HomePageSports from "@/components/Sports/HomePageSports";
const Home = () => {
  const { setShowOneClickModal, showOneClickModal, userData } = useUserData()
  const images = [
    { name: "Slide one", src: FirstSlider },
    { name: "Slide two", src: SecondSlider },
    { name: "Slide three", src: ThreeSlider },
    { name: "Slide four", src: FourSlider },
  ];

  const promoCards = [
    { title: "Sports", sub_title: "Live Games 24/7", href: "/sports", image: PromoOne },
    { title: "Live Games", sub_title: "Free turnaments", href: "/sports/live", image: PromoFour },
    { title: "Upcoming Games", sub_title: "Over 250 sports", href: "/sports/upcoming", image: PromoThree },
    { title: "Casino", sub_title: "Over 3000 games", href: "/", image: PromoTwo },
    { title: "Live Casino", sub_title: "Live dealers", href: "/", image: PromoThree },
  ];
  const [sliders, setSliders] = useState([]);

  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("oneTimeUserData"));
    if (data) {
        setShowOneClickModal(true)
    }
  }, [])

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
            <div className="d-flex align-items-center justify-content-between gap-4">
              <div
                className="single-goal-section"
                style={{
                  background:
                    'url("/casino.png") no-repeat center center/cover',
                }}
              >
                <h1>Cashback up to 30% on casinos</h1>
                <Link href="/casino">Go to Casino</Link>
              </div>
              <div
                className="single-goal-section"
                style={{
                  background: 'url("/gift.png") no-repeat center center/cover',
                }}
              >
                <h1>Welcome bonus 300 BDT on registration</h1>
                <Link href="/casino">Registration</Link>
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

        {/* Sports area start */}
        <div className="mt-2">
          <HomePageSports />
        </div>
        {/* Sports area end */}

        {/* Live Casino area start */}
        <div className=" mt-2"><HomePageCasino /></div>
        {/* Live Casino area end */}

        {/* one click registration page area start */}
        <Modal
          show={showOneClickModal}
          onHide={() => {
            setShowOneClickModal(false);
            localStorage.removeItem("oneTimeUserData");
          }}
          backdrop="static"
          keyboard={false}
          className="login-page"
        >
          <Modal.Header closeButton>
            <Modal.Title>One Click User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Please Save this for your future use</h5>
            <h5 className="fw-bold my-2">
              Password: {userData?.one_time_pass}
            </h5>
            <h5 className="fw-bold">User Id: {userData?.user_id}</h5>
          </Modal.Body>
        </Modal>
        {/* one click registration end */}
      </div>
    </>
  );
};
export default Home;
