import Image from "next/image";
import React, { useContext, useState } from "react";
import Logo from "@/public/logo.png";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGift,
  faAngleDown,
  faGear,
  faBell,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import LoginPage from "@/components/Auth/Login";
import Clock from "@/components/Clock";
import { setLocal } from "@/components/Helper";
import { LanguageContext } from "@/components/Context/LanguageProvider";
const Header = () => {
  const [loginModal, setLoginModal] = useState(false);

  // language
  const language = useContext(LanguageContext);
  console.log(language);

  // Handle onChange data
  const handleOnChange = (event) => {
    console.log(event.target.value);
  };

  // handle langugae on change
  const handleLanguageOnChange = (event) => {
    const lang = event?.target.value;
    setLocal("language", lang);
  };
  // handle Login Modal
  const handleLoginPageModal = () => {
    setLoginModal(true);
  };
  const handleLoginClose = () => {
    setLoginModal(false);
  };

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row d-flex align-items-center py-2">
            <div className="col-md-2">
              <Link href={"/"}>
                <Image src={Logo} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className="col-md-2">
              <Link href={"/promotions"} className="promotion">
                <span>
                  <FontAwesomeIcon icon={faGift} />
                </span>
                Promotion and Bonuses
              </Link>
            </div>
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <select onChange={handleOnChange} className="odds-selection">
                  <option value="d">Decimal Odds</option>
                  <option value="f">Fraction Odds</option>
                  <option value="a">American Odds</option>
                </select>

                <ul className="droplist">
                  <li>
                    <div className="d-flex align-items-center gap-2 bettor-id-look">
                      <span>+ 000.00</span>
                      <span className="profile-look">
                        <span style={{ fontSize: 9 }}>BDT</span>
                      </span>
                    </div>
                    <ul className="dropdown-menus">
                      <li>
                        <Link href={"/"}>Deposit: + 000.00</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Withdrawal: + 000.00</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Bonus: + 000.00</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Tramcard: + 000.00</Link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <div className="header-timer">
                  <Clock />
                </div>

                <ul className="droplist">
                  <li>
                    <div>
                      <span className="profile-look notify-bell">
                        <FontAwesomeIcon
                          icon={faBell}
                          style={{ fontSize: 16 }}
                        />
                        <span className="notify-counter">2</span>
                      </span>
                    </div>
                    <ul className="dropdown-menus notifications-list">
                      <li className="d-flex align-items-center justify-content-between notify-head">
                        <span>Notifications</span> <span>2</span>
                      </li>
                      <li>
                        <Link href={"/Profile"}>
                          Congratulations! You have to got a new tramcard for
                          Life time
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul className="droplist">
                  <li>
                    <div className="d-flex align-items-center gap-2 bettor-id-look">
                      <span>ID: 12345678</span>
                      <span className="profile-look">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <ul className="dropdown-menus">
                      <li>
                        <Link href={"/user/profile"}>My Profile</Link>
                      </li>
                      <li className="sticky-link">
                        <Link
                          href={"/Profile"}
                          className="d-flex align-items-center justify-content-between"
                        >
                          Deposit{" "}
                          <span>
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </Link>
                        <ul className="sticky-items">
                          <li>
                            <Link href={"/Profile"}>Deposit Now</Link>
                          </li>
                          <li>
                            <Link href={"/Profile"}>Deposit History</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="sticky-link">
                        <Link
                          href={"/Profile"}
                          className="d-flex align-items-center justify-content-between"
                        >
                          Withdraw{" "}
                          <span>
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </Link>
                        <ul className="sticky-items">
                          <li>
                            <Link href={"/Profile"}>Withdraw Now</Link>
                          </li>
                          <li>
                            <Link href={"/Profile"}>Withdraw History</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Bet Slip</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Bet History</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Casino History</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Bonues</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Tramcard</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Apply for Affiliate</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Logout</Link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul className="droplist">
                  <li>
                    <span className="profile-look">
                      <FontAwesomeIcon icon={faGear} />
                    </span>
                    <ul className="dropdown-menus">
                      <li>
                        <Link href={"/user/profile"}>Change Password</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>2FA Verification</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Security and privacy</Link>
                      </li>
                      <li>
                        <Link href={"/Profile"}>Support</Link>
                      </li>
                      <li className="sticky-link">
                        <Link
                          href={"/Profile"}
                          className="d-flex align-items-center justify-content-between"
                        >
                          Referral{" "}
                          <span>
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </Link>
                        <ul className="sticky-items">
                          <li>
                            <Link href={"/Profile"}>Referred Link</Link>
                          </li>
                          <li>
                            <Link href={"/Profile"}>Referred Users</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>

                <select
                  onChange={handleLanguageOnChange}
                  className="odds-selection"
                >
                  <option value="en" selected={language === "en"}>
                    English
                  </option>
                  <option value="bn" selected={language === "bn"}>
                    Bangla
                  </option>
                </select>

                <button
                  class="df-btn bg-shadow login-btn"
                  onClick={handleLoginPageModal}
                >
                  Login
                </button>
                <button class="df-btn bg-shadow d-flex align-items-center gap-2 reg-btn">
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Complete Registration
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Navbar />
            </div>
          </div>
        </div>
      </div>

      {/* Login page area start */}
      <Modal
        show={loginModal}
        onHide={handleLoginClose}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginPage />
        </Modal.Body>
      </Modal>
      {/* Login page area end */}
    </>
  );
};

export default Header;
