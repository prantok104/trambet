import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
const CustomSlider = ({ images = [], settings = {} }) => {
  console.log(images);
  var defaultSettings = settings.hasOwnProperty("dots")
    ? settings
    : {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  return (
    <Slider {...defaultSettings}>
      {images?.map((item) => (
        <div className="single-slide-image">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={`${imageUrl}${item?.data_values.image}`}
              alt={item?.id}
              layout="fill"
              // objectFit="cover"
              // placeholder={"blur"}
              // width={500}
              // height={300}
              objectPosition="center"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
