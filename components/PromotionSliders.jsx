import React, { useCallback, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ConstantData from "./ConstantData";
import Slider from "react-slick";
import Image from "next/image";
import Loader from "./Loader";
const PromotionSliders = ({ images = [], settings = {} }) => {
  var defaultSettings = settings.hasOwnProperty("dots")
    ? settings
    : {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
      //   autoplay:true,
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
            breakpoint: 600,
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

  const imageUrl = ConstantData.BONUS_SHOW_ON_INDEX;

  return (
    <>
      {images?.length > 0 ? (
        <Slider {...defaultSettings} className="space-item-slider">
          {images?.map((item, index) => (
            <div className="single-slide-images" key={index}>
              <div
                style={{
                  position: "relative",
                  width: "98%",
                  height: "150px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={`${imageUrl}/${item?.image}`}
                  alt={item?.id}
                  fill={true}
                  quality={100}
                  style={{ objectFit: "fill",overflow: 'hidden' }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PromotionSliders;
