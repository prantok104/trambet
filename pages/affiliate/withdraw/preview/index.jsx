import { use, useState } from "react";
import AffiliatLayout from "./../../layout";
import Card from "@/components/Card";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { submitWithdraw } from "@/services/transaction";
import { notify } from "@/components/Helper";
const WithdrawPreview = () => {
  const [withdrawStorData, setWithdrawStorData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("withdraw_submitted_data"));
    // console.log(data);
    setWithdrawStorData(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      trx: withdrawStorData?.trx,
    };
    await submitWithdraw(payload).then((response) => {
      if (response?.status === true) {
        notify("success", response?.message);
        router.push("/affiliate/withdraw/history");
      } else {
        notify("error", response?.user_message);
      }
    });
  };

  return (
    <>
      <AffiliatLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <Card
                header={
                  "Withdraw Via " +
                  `${withdrawStorData?.method}` +
                  ". We have to pay " +
                  `${withdrawStorData?.phone}`
                }
              >
                <div>
                  <ListGroup>
                    <ListGroup.Item className="d-flex align-items-center justify-content-between">
                      <span>Bank Name</span>
                      <span>
                        {withdrawStorData?.amount} {withdrawStorData?.currency}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="col-md-3 mt-3">
                  <button
                    onClick={handleSubmit}
                    className="df-btn df-bg df-radius df-border"
                  >
                    Submit
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AffiliatLayout>
    </>
  );
};

export default WithdrawPreview;
