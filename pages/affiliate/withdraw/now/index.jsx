import Card from "@/components/Card";
import AlertCard from "@/components/AlertCard";
import Warning from "@/components/Warning";
import ListGroup from "react-bootstrap/ListGroup";
import { Form as FormikForm, Formik } from "formik";
import InputField from "@/components/Form/InputField";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { notify } from "@/components/Helper";
import { getprovider, storWithdraw } from "@/services/transaction";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AffiliatLayout from "./../../layout";
const MakeWithdrawPage = () => {
  const innerRef = useRef();
  const [initialValues, setInitialValues] = useState({
    amount: "",
  });
  const [data, setData] = useState(null);
  const [provider, setProvider] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userDetails"));
    setUser(userData);
    const fetchData = async () => {
      const localData = JSON.parse(window.localStorage.getItem("affiliate_withdraw_payment"));
      setData(localData);
      try {
        setInitialValues({
          amount: localData?.amount,
        });
        const withdrawAgent = await getprovider({
          provider: localData?.provider?.id,
        });
        if (withdrawAgent?.status === true) {
          setProvider(withdrawAgent?.data[0]);
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object({
    wallet_number: Yup.string().required("Wallet number is required")
  });

  const handleSubmit = async (values) => {
    const payload = {
      payment_gateway: "local",
      agent : provider?.admin_id,
      provider : data?.provider?.id,
      amount : values?.amount,
      phone: values?.wallet_number,
      samount : values?.amount,
      method_id : data?.provider?.id,
    };

    await storWithdraw(payload).then((res) => {
      if (res.status === true) {
        localStorage.removeItem("affiliate_withdraw_payment");
        localStorage.setItem("withdraw_submitted_data", JSON.stringify(res.data));
        router.push("/affiliate/withdraw/preview")
      } else if (res.response.status === 422) {
        Object.keys(res.response.data.errors).forEach((field) => {
          res.response.data.errors[field].forEach((errorMessage) => {
            notify("error", errorMessage);
          });
        });
      } else {
        notify("error", res.response.data.message);
      }
    });
  };

  return (
    <>
      <AffiliatLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <Card header="Withdraw method in your region">
                <AlertCard message="Recommended Mob/Cash agent method" />
                <h4 className="mt-4 mb-2">1. Make a Transaction</h4>
                <Warning
                  message="Recommended payment method"
                  style={{ background: "#282F42" }}
                />
                <div>
                  <ListGroup>
                    <ListGroup.Item className="d-flex align-items-center justify-content-between">
                      <span>Bank Name</span>
                      <span>{data?.provider?.name}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <h4 className="mt-4 mb-2">2. Request a Withdraw</h4>
                <div className="user-deposit-form">
                  <Formik
                    innerRef={innerRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    {({ values, touched, errors }) => (
                      <FormikForm>
                        <div className="row">
                          <div className="col-md-12">
                            <InputField
                              name="amount"
                              disabled
                              label="Amount*"
                            />
                          </div>
                          <div className="col-md-12 mt-3">
                            <InputField
                              name="wallet_number"
                              label={`Withdrawl ${data?.provider?.name} Wallet Number`}
                            />
                          </div>

                          <div className="col-md-3 mt-3">
                            <button
                              type="submit"
                              className="df-btn df-bg df-radius df-border"
                            >
                              Request for Withdraw
                            </button>
                          </div>
                        </div>
                      </FormikForm>
                    )}
                  </Formik>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AffiliatLayout>
    </>
  );
};

export default MakeWithdrawPage;
