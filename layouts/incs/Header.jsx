import Image from "next/image";
import React, {  useContext, useEffect, useState } from "react";
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
  faFutbol,
  faBasketball,
  faBullseye,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import LoginPage from "@/components/Auth/Login";
import Clock from "@/components/Clock";
import { setLocal } from "@/components/Helper";
import { LanguageContext } from "@/components/Context/LanguageProvider";
import BetSlip from "@/components/Bets/BetSlip";
import { useLogout } from "@/components/Context/Context/Users/LogoutContext";
import { FaBars, FaClipboard, FaSignInAlt, FaTimes } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import { useRouter as useRouterChecker } from "next/router";
import { AuthUserLogout } from "@/store/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { notificationRead } from "@/services/notification";
const Header = () => {
  const dispatch = useDispatch();
  const routerCheck = useRouterChecker();
  const betSlipReducer = useSelector((state) => state.betSlipReducer);
  const { setUserProMuted } = useUserData();
  const {user} = useSelector((state) => state.AuthReducer);
  const userData =user;
  const [loginModal, setLoginModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [slipShow, setSlipShow] = useState(false);
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const handleRegistrationButton = () => {
    setRegistrationModal(true);
  };
  const router = useRouter()
  // language
  const language = useContext(LanguageContext);

  // Handle onChange data
  const handleOnChange = (event) => {
    // console.log(event.target.value);
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
    // console.log("click");
    localStorage.removeItem("userDetails")
    localStorage.removeItem("token")
    Cookies.remove("token")
    dispatch(AuthUserLogout(null));
    router.push("/auth/login")
  };

  const handleBetSlipToggle = (value) => {
    setSlipShow(value)
  }
  useEffect(() => {
    setSlipShow(betSlipReducer?.slip)
  }, [betSlipReducer]);


  const handleMobileMenu = () => {
    setMobileMenuToggle((prevState) => !prevState);
  }
  const handleMobileBetSlip = () => {
    setSlipShow((prevState) => !prevState)
  }
  const handleBetSlipToggleByLink = (e) => {
    e.preventDefault();
    setSlipShow((prevState) => !prevState)
  }

  const handleClaimBonus = () => {
      router.replace('/user/bonus')
  }

  const handleNotificationRefresh = async (id) => {
     const resposneData = await notificationRead(id);
    if(resposneData?.status){
      setUserProMuted(prevState => !prevState);
    }
  }

  return (
    <>
      <div className="header">
        {/* Claim registration bonus area start */}
        {userData?.is_welcome_message == "0" ? (
          <div className="claim-reg-bonus-area d-flex align-items-center justify-content-between flex-wrap">
            <h4>
              Congratulations on claiming your welcome bonus! Enjoy your rewards
            </h4>
            <button onClick={handleClaimBonus} className="df-btn df-bg">
              Claim Now
            </button>
          </div>
        ) : (
          ""
        )}
        {/* Claim registration bonus area end */}

        {/* Mobile menu area start */}
        <div className="mobile-menu-site">
          <div className="mobile-menu-area d-flex align-items-center justify-content-between bg-shadow px-2 py-2">
            <div className="mobile-logo">
              <Link href={"/"}>
                <Image src={Logo} alt="Logo" className="logo" />
              </Link>
            </div>

            <div className="mobile-auth-menus d-flex align-items-center gap-2">
              {userData && userData?.email_verified != 0 && (
                <ul className="droplist">
                  <li>
                    <div className="d-flex align-items-center gap-2 bettor-id-look">
                      {/* <div>+ {Number(userData?.balance).toFixed(2)}</div> */}
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
                        <Link href={"/"}>
                          Withdrawal: +{" "}
                          {Number(userData?.withdrawal).toFixed(2)}
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          Bonus: + {Number(userData?.bonus_account).toFixed(2)}
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          Tramcard: + {Number(userData?.tramcard).toFixed(2)}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
              {/* Notification area start */}
              {userData && userData?.email_verified != 0 && (
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
                              <Link
                                onClick={() =>
                                  handleNotificationRefresh(notification?.id)
                                }
                                key={index}
                                href={notification.url}
                              >
                                {notification.title}
                              </Link>
                            )
                          )
                        ) : (
                          <Link href={"/"}>No new notifications</Link>
                        )}
                      </li>
                      {userData.notifications?.latest.length > 0 ? (
                        <li>
                          {/* Condiiton will be chnaged it will more than 0 then show all notification */}
                          <Link href={"/user/notifications"}>
                            All notifications
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </li>
                </ul>
              )}
              {/* Notification area end */}

              {/* User profile area start */}
              {userData && userData?.email_verified != 0 && (
                <ul className="droplist">
                  <li>
                    <div className="d-flex align-items-center gap-2 bettor-id-look">
                      <div className="profile-look">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    </div>
                    <ul className="dropdown-menus">
                      <li>
                        <Link href={"/user/profile"}>My Profile</Link>
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
                        <Link href={"#"} onClick={handleBetSlipToggleByLink}>
                          Bet Slip
                        </Link>
                      </li>
                      <li>
                        <Link href={"/user/bet/history"}>Bet History</Link>
                      </li>
                      <li>
                        <Link href={"/user/casino-history"}>
                          Casino History
                        </Link>
                      </li>
                      <li>
                        <Link href={"/user/bonus"}>Bonues</Link>
                      </li>
                      <li>
                        <Link href={"/user/tramcards"}>Tramcard</Link>
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
              {userData && userData?.email_verified != 0 && (
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
                      {/* <li>
                        <Link href={"/"}>2FA Verification</Link>
                      </li> */}
                      {userData?.kv != "1" && (
                        <li>
                          <Link href={"/user/kyc-verification"}>
                            KYC Verification
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href={"/policy/privacy-policy"}>
                          Security and privacy
                        </Link>
                      </li>
                      <li className="sticky-link">
                        <Link
                          href={"/"}
                          className="d-flex align-items-center justify-content-between"
                        >
                          Support{" "}
                          <div>
                            <FontAwesomeIcon icon={faAngleDown} />
                          </div>
                        </Link>
                        <ul className="sticky-items">
                          <li>
                            <Link href={"/user/support"}>Open New Ticket</Link>
                          </li>
                          <li>
                            <Link href={"/user/support/tickets"}>
                              All Tickets
                            </Link>
                          </li>
                        </ul>
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

              <div className="mobile-menu d-flex flex-column">
                <div className="mobile-menu-icon text-end">
                  {mobileMenuToggle ? (
                    <FaTimes
                      onClick={handleMobileMenu}
                      style={{ fontSize: "25px" }}
                    />
                  ) : (
                    <FaBars
                      onClick={handleMobileMenu}
                      style={{ fontSize: "25px" }}
                    />
                  )}
                </div>
                <div
                  className="mobile-menu-content"
                  style={{ height: mobileMenuToggle ? "auto" : "0px" }}
                >
                  <Navbar />

                  <div className="mobile-footer-menu">
                    {userData && userData?.email_verified != 0 && (
                      <div className="user-id-show">ID: {userData.user_id}</div>
                    )}
                    <div className="mobile-selection">
                      <select
                        onChange={handleOnChange}
                        className="odds-selection"
                        defaultValue="d"
                      >
                        <option value="d">Decimal Odds</option>
                        {/* <option value="f">Fraction Odds</option>
                  <option value="a">American Odds</option> */}
                      </select>
                    </div>

                    <div className="header-timer">
                      <Clock />
                    </div>

                    <div className="mobile-selection">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!userData && (
            <div className="auth-part-area p-2 d-flex align-items-center justify-content-between gap-2">
              <>
                <button
                  className="df-btn bg-shadow login-btn d-flex align-items-center gap-2  df-bg"
                  onClick={handleLoginPageModal}
                >
                  <div>
                    <FaSignInAlt />
                  </div>
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
            </div>
          )}
        </div>
        {/* Mobile menu area end */}

        <div className="container-fluid wesite-menu">
          {/* Website menu area start */}
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
                  {/* <option value="f">Fraction Odds</option>
                  <option value="a">American Odds</option> */}
                </select>

                {userData && userData?.email_verified != 0 && (
                  <ul className="droplist">
                    <li>
                      <div className="d-flex align-items-center gap-2 bettor-id-look">
                        <div>+ {Number(userData?.balance).toFixed(2)}</div>
                        <div className="profile-look">
                          <div style={{ fontSize: 9 }}>BDT</div>
                        </div>
                      </div>
                      <ul className="dropdown-menus" style={{ width: "200px" }}>
                        <li>
                          <Link href={"/user/deposit"}>
                            Deposit: + {Number(userData?.balance).toFixed(2)}
                          </Link>
                        </li>
                        <li>
                          <Link href={"/user/bonus"}>
                            Bonus: +{" "}
                            {Number(userData?.bonus_account).toFixed(2)}
                          </Link>
                        </li>
                        <li>
                          <Link href={"/user/tramcards"}>
                            Tramcard: + {Number(userData?.tramcard).toFixed(2)}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}

                <div className="header-timer">
                  <Clock />
                </div>

                {/* Notification area start */}
                {userData && userData?.email_verified != 0 && (
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
                                <Link
                                  onClick={() =>
                                    handleNotificationRefresh(notification?.id)
                                  }
                                  key={index}
                                  href={notification.url}
                                  style={{
                                    color:
                                      notification?.is_read == "0"
                                        ? "#6a38e9"
                                        : "#000",
                                  }}
                                >
                                  {notification.title}
                                </Link>
                              )
                            )
                          ) : (
                            <Link href={"/"}>No new notifications</Link>
                          )}
                        </li>
                        {userData.notifications?.latest.length > 0 ? (
                          <li>
                            {/* Condiiton will be chnaged it will more than 0 then show all notification */}
                            <Link href={"/user/notifications"}>
                              All notifications
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                  </ul>
                )}
                {/* Notification area end */}

                {/* User profile area start */}
                {userData && userData?.email_verified != 0 && (
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
                          <Link href={"#"} onClick={handleBetSlipToggleByLink}>
                            Bet Slip
                          </Link>
                        </li>
                        <li>
                          <Link href={"/user/bet/history"}>Bet History</Link>
                        </li>
                        <li>
                          <Link href={"/user/casino-history"}>
                            Casino History
                          </Link>
                        </li>
                        <li>
                          <Link href={"/user/bonus"}>Bonues</Link>
                        </li>
                        <li>
                          <Link href={"/user/tramcards"}>Tramcard</Link>
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
                {userData && userData?.email_verified != 0 && (
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
                        {/* <li>
                          <Link href={"/"}>2FA Verification</Link>
                        </li> */}
                        {userData?.kv != "1" && (
                          <li>
                            <Link href={"/user/kyc-verification"}>
                              KYC Verification
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link href={"/policy/privacy-policy"}>
                            Security and privacy
                          </Link>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Support{" "}
                            <div>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/user/support"}>
                                Open New Ticket
                              </Link>
                            </li>
                            <li>
                              <Link href={"/user/support/tickets"}>
                                All Tickets
                              </Link>
                            </li>
                          </ul>
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
          {/* Website menu area end */}

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
      {routerCheck?.route !== "/sports/game/[game]" &&
      routerCheck?.route !== "/sports/game_/[game]" ? (
        <div
          className={`betslip-area-start  ${slipShow ? "mobile" : ""}`}
          style={{ height: slipShow ? "auto" : "25px" }}
        >
          <div
            className={`d-flex align-items-center justify-content-between bet-slip-top-header ${
              slipShow ? "mobile" : ""
            } `}
          >
            <h6 className="slip-header">Betslip </h6>
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
          <BetSlip />
        </div>
      ) : (
        ""
      )}
      {/* Bet slip area end */}

      {/* Mobile footer menu area start */}
      <div className="mobile-bar-menu">
        <div className="mobile-footer-menu-item d-flex align-items-center justify-content-between relative">
          <div className="single-footer-item">
            <Link
              href="/"
              className={routerCheck.pathname === "/" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faWifi} /> Main
            </Link>
          </div>
          <div className="single-footer-item">
            <Link
              href="/sports"
              className={routerCheck.pathname === "/sports" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faFutbol} /> Sports
            </Link>
          </div>
          <div
            className="single-footer-item"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "-14px",
            }}
          >
            <button
              onClick={handleMobileBetSlip}
              style={{ border: slipShow ? " 5px solid #1E263D" : "" }}
            >
              <FaClipboard /> Bet Slip
            </button>
          </div>
          <div className="single-footer-item">
            <Link
              href="/casino"
              className={routerCheck.pathname === "/casino" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faBullseye} /> Casino
            </Link>
          </div>
          <div className="single-footer-item">
            <Link
              href="/sports/live"
              className={
                routerCheck.pathname === "/sports/live" ? "active" : ""
              }
            >
              <FontAwesomeIcon icon={faBasketball} /> Live Games
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile footer menu area end */}
    </>
  );
};

export default Header;
