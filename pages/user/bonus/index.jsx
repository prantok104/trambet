import WarningCard from "./../../../components/Warning";
import AlertCard from "./../../../components/AlertCard";
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useCallback, useEffect, useState } from "react";
import { bonusClaimService, bonuslog } from "@/services/BonusServices";
import dayjs from "dayjs";
import { notify } from "@/components/Helper";
import Loader from "@/components/Loader";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import { useSelector } from "react-redux";
const BonusCard = () => {
  const { setUserProMuted } = useUserData();
  const [bonus, setBonus] = useState({});
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const userData = user;

  // Tramcard fetch
  const effect = useCallback(async () => {
    await fetchBonus();
  }, [muted]);


  const fetchBonus = async () => {
    setLoading(true);
    const responseData = await bonuslog();
    if (responseData?.status == true) {
      setBonus(responseData?.data);
      setLoading(false);
    } else {
      setLoading(false);
      notify('error', 'Something went wrong')
    }
  };

  useEffect(() => {
    effect();
  }, [effect]);

//   Calculate progress based on rules
let progressPercentage = 0;
if(bonus?.active){
     const rules = ["rule_1", "rule_2", "rule_3", "rule_4"];
     const progressBarValue = rules.reduce((carry, rule) => {
       return carry + (bonus?.active[rule] !== "0" ? 1 : 0);
     }, 0);
   progressPercentage = progressBarValue * 25;
}

  // Tramcard claim
  const handleClaimBonus = async () => {
    setLoading(true);
    const responseData = await bonusClaimService();
    if (responseData?.status == true) {
      setMuted((prevState) => !prevState);
      notify("success", responseData?.user_message);
      setUserProMuted((prevState) => !prevState);
      setLoading(false);
    } else {
      setLoading(false);
      notify("error", "Something went wrong");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            {Number(bonus?.active?.initial_amount) > 0 ? (
              <>
                <div className="col-md-12">
                  <div className="tramcard-area-start mb-4">
                    <div className="mb-2">
                      <AlertCard
                        message={`Congratulations! You have an active ${bonus?.active?.type} bonus`}
                        bg="linear-gradient(86.37deg, #8833ad 2.96%, #03204a 99.68%), linear-gradient(90deg, #ed6ea0 0%, #ec8c69 100%)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="tramcard-rules-area p-4 df-border df-radius">
                    <h5>Rules</h5>
                    <div className="rules-contents">
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          Player can only use this amount in upcoming sport.
                        </li>
                        <li>Player use this bonus only for multibet.</li>
                        <li>
                          Each multibet bet must contain at least 3 selections.
                        </li>
                        <li>
                          Each selection of multibet must have odds of 1.8 or
                          higher.
                        </li>
                        <li>Minimum rollover 3 times</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <div className="tramcard-claim-area text-center d-flex flex-column justify-content-center align-items-center p-4 df-border bg-shadow df-radius">
                    <div className="tramcard-balance">
                      <b>Balance: </b>{" "}
                      {Number(bonus?.active?.initial_amount).toFixed(2)}{" "}
                      {bonus?.active?.currency}
                    </div>
                    <div className="tramcard-valid-time">
                      Valid: {bonus?.active?.duration_text}
                    </div>
                    {bonus?.active?.duration_text != "Life time" ? (
                      <div className="tramcard-valid-time">
                        Date:{" "}
                        {dayjs(bonus?.active?.valid_time).format(
                          "DD MMM, YYYY hh:mm:s a"
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {bonus?.active?.rule_1 != "0" &&
                      bonus?.active?.rule_2 != "0" &&
                      bonus?.active?.rule_3 != "0" &&
                      bonus?.active?.rule_4 != "0" &&
                      bonus?.active?.rule_5 != "0" && (
                        <>
                          {userData?.kv != "1" ? (
                            <Link
                              className="df-btn df-bg"
                              href="/user/kyc-verification"
                            >
                              KYC Verification
                            </Link>
                          ) : (
                            <button
                              onClick={handleClaimBonus}
                              className="tramcard-claim-btn df-btn"
                            >
                              Claim Now (
                              {Number(bonus?.active?.initial_amount).toFixed(2)}{" "}
                              {bonus?.active?.currency})
                            </button>
                          )}
                        </>
                      )}
                  </div>
                </div>
                <div className="col-md-8 mt-4">
                  <div className="tramcard-progress-area bg-shadow df-radius p-4">
                    <div className="tamcard-progress-bar">
                      <p
                        className="mb-2"
                        style={{ fontSize: "14px", fontWeight: 600 }}
                      >
                        You claim the bonus amount when you have completed 100%
                        progressbar and passed the all rules
                      </p>
                      <ProgressBar
                        min={0}
                        max={100}
                        animated
                        now={progressPercentage}
                        variant="success"
                        label={`${progressPercentage}%`}
                      />

                      <div className="tramcard-follow-rules">
                        <ul className="m-3">
                          <li
                            className={
                              bonus?.active?.rule_1 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Player can only use this amount in upcoming sport.
                          </li>
                          <li
                            className={
                              bonus?.active?.rule_2 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Player use this bonus only for multibet.
                          </li>
                          <li
                            className={
                              bonus?.active?.rule_3 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Each multibet bet must contain at least 3
                            selections.
                          </li>
                          <li
                            className={
                              bonus?.active?.rule_4 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Each selection of multibet must have odds of 1.8 or
                            higher.
                          </li>
                          <li
                            className={
                              bonus?.active?.rule_5 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Minimum rollover 3.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-12">
                <WarningCard message="You have no tramcard" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default BonusCard;
