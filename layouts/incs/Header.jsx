import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";
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
import { HttpClientCall } from "@/components/HTTPClient";
import { getUserDetailsData } from "@/services/userAuthService";
import BetSlip from "@/components/Bets/BetSlip";
import { useLogout } from "@/components/Context/Context/Users/LogoutContext";
import { FaTimes } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import { useRouter as useRouterChecker } from "next/router";
const Header = () => {
  const routerCheck = useRouterChecker();
  const betSlipReducer = useSelector((state) => state.betSlipReducer);
  const { userData } = useUserData()
  const [loginModal, setLoginModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [slipShow, setSlipShow] = useState(false);
  const handleRegistrationButton = () => {
    setRegistrationModal(true);
  };
  const router = useRouter()
  // language
  const language = useContext(LanguageContext);

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


  const logout = useLogout();
  const handleLogout = () => {
    console.log("click");
    localStorage.removeItem("userDetails")
    localStorage.removeItem("token")
    Cookies.remove("token")
    router.push("/auth/login")
  };

  const handleBetSlipToggle = (value) => {
    setSlipShow(value)
  }
  useEffect(() => {
    setSlipShow(betSlipReducer?.slip)
  }, [betSlipReducer])

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="row d-flex align-items-center py-2">
            <div className="col-md-2">
              <Link href={"/"}>
                <Image src={Logo} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className="col-md-2">
              <Link href={"/promotions"} className="promotion">
                <div>
                  <FontAwesomeIcon icon={faGift} />
                </div>
                Promotion and Bonuses
              </Link>
            </div>
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <select
                  onChange={handleOnChange}
                  className="odds-selection"
                  defaultValue="d"
                >
                  <option value="d">Decimal Odds</option>
                  <option value="f">Fraction Odds</option>
                  <option value="a">American Odds</option>
                </select>

                {userData && (
                  <ul className="droplist">
                    <li>
                      <div className="d-flex align-items-center gap-2 bettor-id-look">
                        <div>+ {Number(userData?.balance).toFixed(2)}</div>
                        <div className="profile-look">
                          <div style={{ fontSize: 9 }}>BDT</div>
                        </div>
                      </div>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/"}>
                            Deposit: + {Number(userData?.balance).toFixed(2)}
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"}>Withdrawal: + {userData.data}</Link>
                        </li>
                        <li>
                          <Link href={"/"}>
                            Bonus: +{" "}
                            {Number(userData?.bonus_account).toFixed(2)}
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"}>Tramcard: + {userData.data}</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}

                <div className="header-timer">
                  <Clock />
                </div>

                {/* Notification area start */}
                {userData && (
                  <ul className="droplist">
                    <li>
                      <div>
                        <div className="profile-look notify-bell">
                          <FontAwesomeIcon
                            icon={faBell}
                            style={{ fontSize: 16 }}
                          />
                          <div className="notify-counter">
                            {userData.notifications?.total}
                          </div>
                        </div>
                      </div>
                      <ul className="dropdown-menus notifications-list">
                        <li className="d-flex align-items-center justify-content-between notify-head">
                          <div>Notifications</div>{" "}
                          <div>{userData.notifications?.total}</div>
                        </li>
                        <li>
                          {userData.notifications?.latest &&
                          userData.notifications?.latest.length > 0 ? (
                            userData.notifications?.latest.map(
                              (notification, index) => (
                                <Link key={index} href={notification.url}>
                                  {notification.title}
                                </Link>
                              )
                            )
                          ) : (
                            <Link href={"/"}>No new notifications</Link>
                          )}
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* Notification area end */}

                {/* User profile area start */}
                {userData && (
                  <ul className="droplist">
                    <li>
                      <div className="d-flex align-items-center gap-2 bettor-id-look">
                        <div>ID: {userData.user_id}</div>
                        <div className="profile-look">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                      </div>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/user/profile"}>My Profile</Link>
                        </li>
                        <li>
                          <Link href={"/user/otp-verify"}>OTP Verify</Link>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Deposit{" "}
                            <div>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/user/deposit/"}>Deposit Now</Link>
                            </li>
                            <li>
                              <Link href={"/user/deposit/history"}>
                                Deposit History
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Withdraw{" "}
                            <div>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/user/withdraw"}>Withdraw Now</Link>
                            </li>
                            <li>
                              <Link href={"/user/withdraw/history"}>
                                Withdraw History
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href={"/"}>Bet Slip</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Bet History</Link>
                        </li>
                        <li>
                          <Link href={"/user/casino-history"}>
                            Casino History
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"}>Bonues</Link>
                        </li>
                        <li>
                          <Link href={"/user/tramcard"}>Tramcard</Link>
                        </li>
                        <li>
                          <Link href={"/user/affiliate/applications-list"}>
                            Apply for Affiliate
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            // type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* User profile area end */}

                {/* User settings area start */}
                {userData && (
                  <ul className="droplist">
                    <li>
                      <div className="profile-look">
                        <FontAwesomeIcon icon={faGear} />
                      </div>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/user/change-password"}>
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"}>2FA Verification</Link>
                        </li>
                        <li>
                          <Link href={"/user/kyc-verification"}>
                            KYC Verification
                          </Link>
                        </li>
                        <li>
                          <Link href={"/policy/privacy-policy"}>
                            Security and privacy
                          </Link>
                        </li>
                        <li>
                          <Link href={"/user/support"}>Support</Link>
                        </li>
                        <li>
                          <Link href={"/affiliate"}>Affiliate Profile</Link>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Referral{" "}
                            <div>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/user/referred/my-ref-link"}>
                                Referred Link
                              </Link>
                            </li>
                            <li>
                              <Link href={"/"}>Referred Users</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* User settings area end */}

                {/* Language area start */}
                <select
                  onChange={handleLanguageOnChange}
                  className="odds-selection"
                  defaultValue={language}
                >
                  <option value="en" selected={language === "en"}>
                    English
                  </option>
                  <option value="bn" selected={language === "bn"}>
                    Bangla
                  </option>
                </select>
                {/* Language area end */}

                {!userData && (
                  <>
                    <button
                      className="df-btn bg-shadow login-btn"
                      onClick={handleLoginPageModal}
                    >
                      Login
                    </button>
                    <button
                      className="df-btn bg-shadow d-flex align-items-center gap-2 reg-btn"
                      onClick={handleRegistrationButton}
                    >
                      <div>
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                      Complete Registration
                    </button>
                  </>
                )}
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
        onHide={() => setLoginModal(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginPage setLoginModal={setLoginModal} />
        </Modal.Body>
      </Modal>
      {/* Login page area end */}
      {/* Registration modal area start */}
      <Modal
        show={registrationModal}
        onHide={() => setRegistrationModal(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration process</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-around register-area">
            <Link href="/auth/register" className="df-btn reg-btn">
              Full Registration
            </Link>
            <Link href={"/auth/one-click"} className="df-btn reg-btn one-click">
              One click registration
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* Registration modal area end */}
      {/* Bet slip area start */}
      {routerCheck?.route !== "/sports/game/[game]" ? <div
        className="betslip-area-start"
        style={{ height: slipShow ? "auto" : "25px" }}
      >
        <div className="d-flex align-items-center justify-content-between bet-slip-top-header">
          <h6 className="slip-header">Betslip</h6>
          <div className="slip-header-icons d-flex align-items-center gap-4">
            <BsArrowsFullscreen
              onClick={() => handleBetSlipToggle(true)}
              style={{ fontSize: 14 }}
            />
            <FaTimes
              onClick={() => handleBetSlipToggle(false)}
              style={{ fontSize: 15 }}
            />
          </div>
        </div>
        {router?.pathname}
        <BetSlip />
      </div> : ""}
      
      {/* Bet slip area end */}
    </>
  );
};

export default Header;
