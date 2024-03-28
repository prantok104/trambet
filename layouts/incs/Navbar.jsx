import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHomeAlt,
  faSpinner,
  faForward,
  faTableTennis,
  faGift,
  faChargingStation,
  faGamepad,
  faTvAlt,
  faMaskVentilator,
} from "@fortawesome/free-solid-svg-icons";
const navItems = [
  { icon: faHomeAlt, name: "Home", href: "/" },
  { icon: faSpinner, name: "Live", href: "/sports/live" },
  { icon: faForward, name: "Upcoming", href: "/sports/upcoming" },
  { icon: faTableTennis, name: "Sports", href: "/sports" },
  { icon: faGift, name: "Promotions", href: "/promotions" },
  { icon: faChargingStation, name: "Casino", href: "/casino" },
  { icon: faChargingStation, name: "Live Casino", href: "/casino/live" },
  { icon: faGamepad, name: "Games", href: "/games" },
  { icon: faMaskVentilator, name: "Aviator", href: "/aviator" },
  { icon: faTvAlt, name: "Live TV Game", href: "/live-tv-game" },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="bg-shadow nav-bar-area d-flex align-items-center justify-content-between">
      <ul className="main-menu-bar">
        {navItems?.map((item) => {
          return (
            <li>
              <Link
                href={`http://localhost:3000${item?.href}`}
                className={router.pathname === item?.href ? "active" : ""}
                replace
              >
                <FontAwesomeIcon icon={item?.icon} /> {item?.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link href="/" className="more-link">
        {" "}
        More
      </Link>
    </div>
  );
};

export default Navbar;
