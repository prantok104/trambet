import WarningCard from './../../../components/Warning';
import AlertCard from './../../../components/AlertCard';
import Image from 'next/image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useCallback, useEffect, useState } from 'react';
import { tramcardClaimService, tramcards } from '@/services/tramcardService';
import dayjs from 'dayjs';
import { notify } from '@/components/Helper';
import Loader from '@/components/Loader';
import { useUserData } from '@/components/Context/UserDataProvider/UserProvider';
const Tramcard = () => {
  const { setUserProMuted } = useUserData();
  const [tramcard, setTramcard] = useState({});
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  // Tramcard fetch
  const effect = useCallback(async () => {
    await fetchTramcard();
  }, [muted]);
  const fetchTramcard = async () => {
    setLoading(true)
    const responseData = await tramcards();
    if (responseData?.status == true) {
      setTramcard(responseData?.data);
      setLoading(false)
    }else{
      console.log("Something went wrong.")
      setLoading(false)
    }
  };

  useEffect(() => {
    effect();
  }, [effect]);

  // Calculate progress based on rules
  const rules = ["rule_1", "rule_2", "rule_3", "rule_4"];
  const progressBarValue = rules.reduce((carry, rule) => {
    return carry + (tramcard[rule] !== "0" ? 1 : 0);
  }, 0);
  const progressPercentage = progressBarValue * 25;



  // Tramcard claim
  const handleClaimTramcard = async () => {
    setLoading(true);
    const responseData = await tramcardClaimService();
    if(responseData?.status == true){
      setMuted((prevState) => !prevState);
      notify("success", responseData?.user_message);
      setUserProMuted((prevState) => !prevState);
      setLoading(false)
    }else{
      console.log("Something went wrong");
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            {Number(tramcard?.amount) > 0 ? (
              <>
                <div className="col-md-12">
                  <div className="tramcard-area-start mb-4">
                    <div className="mb-2">
                      <AlertCard
                        message="Congratulations! You got a tramcard, Enjoy the game."
                        bg="linear-gradient(86.37deg, #d062ff 2.96%, #7bb0ff 99.68%),linear-gradient(90deg, #ed6ea0 0%, #ec8c69 100%)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="tramcard-image">
                    <Image
                      src="https://trambet.smshagor.com/core/public/storage/event/tramcard/1710409203.png"
                      alt="Tramcard"
                      width="350"
                      height="230"
                      quality={100}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid #1E263D",
                        padding: "5px",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="tramcard-rules-area p-4 df-border df-radius">
                    <h5>Rules</h5>
                    <div
                      className="rules-contents"
                      dangerouslySetInnerHTML={{ __html: tramcard?.rules }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-4 mt-4">
                  <div className="tramcard-claim-area text-center d-flex flex-column justify-content-center align-items-center p-4 df-border bg-shadow df-radius">
                    <div className="tramcard-balance">
                      <b>Balance: </b> {Number(tramcard?.amount).toFixed(2)}{" "}
                      {tramcard?.currency}
                    </div>
                    <div className="tramcard-valid-time">
                      Valid: {tramcard?.duration_text}
                    </div>
                    {tramcard?.duration_text != "Life time" ? (
                      <div className="tramcard-valid-time">
                        Date:{" "}
                        {dayjs(tramcard?.valid_time).format(
                          "DD MMM, YYYY hh:mm:s a"
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {tramcard?.rule_1 != "0" &&
                      tramcard?.rule_2 != "0" &&
                      tramcard?.rule_3 != "0" &&
                      tramcard?.rule_4 != "0" &&
                      tramcard?.is_win != "0" && (
                        <button
                          onClick={handleClaimTramcard}
                          className="tramcard-claim-btn df-btn"
                        >
                          Claim Now ({Number(tramcard?.amount).toFixed(2)}{" "}
                          {tramcard?.currency})
                        </button>
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
                        You claim the tramcard amount when you have completed
                        100% progressbar and passed the all rules
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
                              tramcard?.rule_1 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Player can only use tram card in upcoming sport.
                          </li>
                          <li
                            className={
                              tramcard?.rule_2 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            If player use a tram card, multibet stake value will
                            be same as card value.
                          </li>
                          <li
                            className={
                              tramcard?.rule_3 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Each multibet bet must contain at least{" "}
                            {tramcard?.minimum_bet} selections.
                          </li>
                          <li
                            className={
                              tramcard?.rule_4 != "0"
                                ? "tramcard-follow-rule-completed"
                                : ""
                            }
                          >
                            Each selection of multibet must have odds of{" "}
                            {tramcard?.odds} or higher.
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
}
export default Tramcard;
