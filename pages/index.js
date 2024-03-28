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
const Home = () => {
  const images = [
    { name: "Slide one", src: FirstSlider },
    { name: "Slide two", src: SecondSlider },
    { name: "Slide three", src: ThreeSlider },
    { name: "Slide four", src: FourSlider },
  ];

  const promoCards = [
    { title: "Live Game", sub_title: "Live Games 24/7", href: "/", image: PromoOne },
    { title: "Casino", sub_title: "Over 3000 games", href: "/", image: PromoTwo },
    { title: "Live Casino", sub_title: "Live dealers", href: "/", image: PromoThree },
    { title: "Crash", sub_title: "Free turnaments", href: "/", image: PromoFour },
    { title: "E-Sports", sub_title: "Over 250 sports", href: "/", image: PromoThree },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* Slider area start */}
        <div className="row">
          <div className="col-md-7">
            <div className="main-slider-area-start">
              <Slider images={images} />
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
              {promoCards?.map((item) => (
                <PromoCard
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
      </div>
    </>
  );
};
export default Home;
