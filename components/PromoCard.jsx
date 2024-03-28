import Image from "next/image";
import Link from "next/link";
import React from "react";

const PromoCard = ({ title, subTitle, href, image }) => {
  return (
    <div className="single-promo-card">
      <Link
        href={href}
        className="d-flex align-items-center justify-content-between gap-2"
      >
        <div className="promo-card-left">
          <h4>{title}</h4>
          <h6>{subTitle}</h6>
        </div>
        <div className="promo-card-right">
          <Image src={image} alt={title} width={60} height={50} />
        </div>
      </Link>
    </div>
  );
};

export default PromoCard;
