import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
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
  return (
    <Slider {...defaultSettings}>
      {images?.map((item) => (
        <div className="single-slide-image">
          <Image
            src={item?.src}
            alt={item?.name}
            placeholder={"blur"}
            width={"100%"}
            height={300}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
