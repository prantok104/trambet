import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaRegNewspaper, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

const menu = [
  {
    name: "Dashboard",
    link: "/",
    icon: <FaHome className="text-white" />,
    submenu: [],
  },
  {
    name: "Better Profile",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [],
  },
  {
    name: "Promo",
    icon: <FaHome className="text-white" />,
    link: "/",
    submenu: [
      {
        name: "All Promo",
        link: "/",
      },
      {
        name: " Create Promo",
        link: "/",
      },
    ],
  },
  {
    name: "Register Users",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [],
  },
  {
    name: "Website",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [],
  },
  {
    name: "Withdraw",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [
      {
        name: "Withdraw Now",
        link: "/",
      },
      {
        name: "Withdraw History",
        link: "/",
      },
    ],
  },
  {
    name: "Reports",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [
      {
        name: "Affiliate Link",
        link: "/",
      },
      {
        name: "Full Reports",
        link: "/",
      },
      {
        name: "Player Reports",
        link: "/",
      },
      {
        name: "Summery",
        link: "/",
      },
    ],
  },
  {
    name: "Support Ticket",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [
      {
        name: "Open New Ticket",
        link: "/",
      },
      {
        name: "My Ticket",
        link: "/",
      },
    ],
  },
  {
    name: "Account Settings",
    icon: <MdSettings className="text-white" />,
    link: "/",
    submenu: [
      {
        name: "Profile Setting",
        link: "/",
      },
      {
        name: "Change Password",
        link: "/",
      },
      {
        name: "2FA Security",
        link: "/",
      },
    ],
  },
];

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState("");

  const toggleCollapse = (menu) => {
    setIsCollapsed(isCollapsed == menu ? "" : menu);
  };

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-90">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
          id="menu"
        >
          {menu.map((menuItem, idx) => (
            <div key={idx} className="w-100">
              {menuItem.submenu.length > 0 ? (
                <li className="nav-item w-100">
                  <button
                    className="nav-link align-items-center px-0 d-flex justify-content-between w-100"
                    type="button"
                    onClick={() => toggleCollapse(menuItem?.name)}
                  >
                    <div className="d-flex align-items-center gap-1">
                      <FaRegNewspaper className="text-white" />
                      <span className="ms-1 d-none d-sm-inline text-white">
                        {menuItem?.name}
                      </span>
                    </div>
                    {isCollapsed === menuItem?.name ? (
                      <FaAngleUp className="text-white" />
                    ) : (
                      <FaAngleDown className="text-white" />
                    )}
                  </button>

                  <div
                    className={`collapse${
                      isCollapsed === menuItem?.name ? " show" : ""
                    }`}
                    id="menuCollapse"
                  >
                    <ul className="nav flex-column">
                      {menuItem?.submenu?.length > 0 &&
                        menuItem?.submenu?.map((submenuItem, idx) => (
                          <li className="nav-item" key={idx}>
                            <Link
                              href={submenuItem?.link}
                              className="nav-link text-white"
                            >
                              {submenuItem?.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menuItem?.link}
                    className="nav-link align-items-center px-0 d-flex"
                  >
                    {menuItem?.icon}
                    <span className="ms-1 d-none d-sm-inline text-white">
                      {menuItem?.name}
                    </span>
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
