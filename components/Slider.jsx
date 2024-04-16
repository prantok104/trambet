import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import ConstantData from "./ConstantData";
const CustomSlider = ({ images = [], settings = {} }) => {
  var defaultSettings = settings.hasOwnProperty("dots")
    ? settings
    : {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  const imageUrl = ConstantData.IMAGE_BASE_URL;
  return (
    <Slider {...defaultSettings}>
      {images?.map((item, index) => (
        <div className="single-slide-image" key={index}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={`${imageUrl}frontend/banner/${item?.data_values.image}`}
              alt={item?.id}
              layout="fill"
              sizes="100vw"
              // objectFit="cover"
              // placeholder={"blur"}
              // width={500}
              // height={300}
              // objectPosition="center"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
