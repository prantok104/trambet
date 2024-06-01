import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Uefa from "@/public/casino/uefa.svg";
import Atp from "@/public/casino/atp.svg";
import Fiba from "@/public/casino/fiba.svg";
import Fifa from "@/public/casino/fifa.svg";
import Itf from "@/public/casino/itf.svg";
import Nhl from "@/public/casino/nhl.svg";
import Ufc from "@/public/casino/ufc.svg";
import Wta from "@/public/casino/wta.svg";
import TawkTo from "next-tawkto";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "facebook", icon: faFacebookF, href: "/" },
    { name: "twitter", icon: faTwitter, href: "/" },
    { name: "linkedin", icon: faLinkedinIn, href: "/" },
    { name: "instagram", icon: faInstagram, href: "/" },
  ];

  // Tawk to chat 
  useEffect(() => {
      var tawk = new TawkTo('65b49c278d261e1b5f587405', '1hl4o3ved')
  }, [])

  return (
    <>
      <footer className="footer-area-start">
        <div className="container-fluid">
          <div className="row pb-4">
            <div className="col-md-3">
              <h4>About us</h4>
              <p>
                Welcome to our sports betting platform. Explore a wide array of
                thrilling sports events and bet on your favorite teams to win
                big. Our user-friendly interface ensures a seamless experience,
                with secure transactions.
              </p>
            </div>
            <div className="col-md-3">
              <h6>Usefull Link</h6>
              <ul className="footer-menu">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/news">News and Updates</Link>
                </li>
                <li>
                  <Link href="/contact">Contacts</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Company Policy</h6>
              <ul className="footer-menu">
                <li>
                  <Link href="/policy/privacy-policy" >Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/policy/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/policy/refund-policy">Refund Policy</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>24/7 support</h6>
              <p>Contact us if you still have any questions</p>
            </div>
          </div>

          <div className="row d-flex align-items-center py-4 media-link-area">
            <div className="col-md-3">
              <div className="social-media-link d-flex align-items-center gap-2">
                {socialLinks?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    title={item?.name}
                    className={item?.name}
                  >
                    <FontAwesomeIcon icon={item?.icon} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              <div className="casino-images-list d-flex align-items-center justify-content-between gap-2">
                <Image src={Uefa} alt="Uefa" />
                <Image src={Atp} alt="Atp" />
                <Image src={Fiba} alt="Fiba" />
                <Image src={Fifa} alt="Fifa" />
                <Image src={Itf} alt="Itf" />
                <Image src={Nhl} alt="Nhl" />
                <Image src={Ufc} alt="Ufc" />
                <Image src={Wta} alt="Wta" />
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center py-4 media-link-area">
            <div className="col-md-12">
              <div className="provider-images-list d-flex align-items-center justify-content-between gap-1">
                <Link href="/">
                  <Image src={Uefa} alt="Uefa" />
                </Link>
                <Link href="/">
                  <Image src={Atp} alt="Atp" />
                </Link>
                <Link href="/">
                  <Image src={Fiba} alt="Fiba" />
                </Link>
                <Link href="/">
                  <Image src={Fifa} alt="Fifa" />
                </Link>
                <Link href="/">
                  <Image src={Itf} alt="Itf" />
                </Link>
                <Link href="/">
                  <Image src={Nhl} alt="Nhl" />
                </Link>
                <Link href="/">
                  <Image src={Ufc} alt="Ufc" />
                </Link>
                <Link href="/">
                  <Image src={Wta} alt="Wta" />
                </Link>
                <Link href="/">
                  <Image src={Uefa} alt="Uefa" />
                </Link>
                <Link href="/">
                  <Image src={Atp} alt="Atp" />
                </Link>
                <Link href="/">
                  <Image src={Fiba} alt="Fiba" />
                </Link>
                <Link href="/">
                  <Image src={Fifa} alt="Fifa" />
                </Link>
                <Link href="/">
                  <Image src={Itf} alt="Itf" />
                </Link>
                <Link href="/">
                  <Image src={Nhl} alt="Nhl" />
                </Link>
                <Link href="/">
                  <Image src={Ufc} alt="Ufc" />
                </Link>
                <Link href="/">
                  <Image src={Wta} alt="Wta" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center py-4 media-link-area">
            <div className="col-md-12">
              <div className="provider-images-list d-flex align-items-center justify-content-between gap-1">
                Copyright © {currentYear} Tram Bet All right reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
