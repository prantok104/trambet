import Card from "@/components/Card";
import AlertCard from "@/components/AlertCard";
import Warning from "@/components/Warning";
import ListGroup from "react-bootstrap/ListGroup";
import { Form as FormikForm, Formik } from "formik";
import InputField from "@/components/Form/InputField";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { notify } from "@/components/Helper";
import { getprovider, makeDeposit } from "@/services/transaction";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const MakeDepositPage = () => {
  const innerRef = useRef();
  const [initialValues, setInitialValues] = useState({
    amount: "",
    wallet_number: "",
    trx_id: "",
  });
  const [data, setData] = useState(null);
  const [provider, setProvider] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userDetails"));
    setUser(userData);
    const fetchData = async () => {
      const localData = JSON.parse(window.localStorage.getItem("deposit_payment"));
      setData(localData);
      try {
        setInitialValues({
          amount: localData?.amount,
          wallet_number: "",
          trx_id: "",
        });
        const dipositAgent = await getprovider({ provider: localData?.provider?.id });
        if (dipositAgent?.status === true) {
          setProvider(dipositAgent?.data[0]);
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
      }
    };
  
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    amount: Yup.number().required().min(100).max(20000),
    wallet_number: Yup.string().required("Wallet number is required"),
    trx_id: Yup.string().required("Transaction ID is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      agent : provider?.admin_id,
      provider : data?.provider?.id,
      payment_gateway : "local",
      amount : values?.amount,
      payment_number : values?.wallet_number,
      depositor_name : user?.firstname + " " + user?.lastname,
      transaction_id : values?.trx_id,
      samount : values?.amount,
      method_id : data?.provider?.id,
    };

    await makeDeposit(payload).then((res) => {
      // console.log(res);
      if (res.status === true) {
        // innerRef.current.resetForm();
        toast.success("Successfully deposit completed", {
          onClose: () => router.push("/"),
        });
        localStorage.removeItem("deposit_payment");

      } else {
        notify("error", res.response.data.message);
      }});
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <Card header="Payment system in your region">
              <AlertCard message="Recommended payment method" />
              <h4 className="mt-4 mb-2">1. Make a Transfer</h4>
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
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>{data?.provider?.name} Wallet Number</span>
                    <span>{provider?.mobile}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>{data?.provider?.name} Wallet Name</span>
                    <span>{provider?.wallet_name}</span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <h4 className="mt-4 mb-2">2. Request a Deposit</h4>
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
                          <InputField name="amount" disabled label="Amount*" />
                        </div>
                        <div className="col-md-12 mt-3">
                          <InputField
                            name="wallet_number"
                            label={`Your bKash wallet number`}
                          />
                        </div>

                        <div className="col-md-12 mt-3">
                          <InputField name="trx_id" label={`Transaction ID`} />
                        </div>

                        <div className="col-md-3 mt-3">
                          <button
                            type="submit"
                            className="df-btn df-bg df-radius df-border"
                          >
                            Make Payment
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
    </>
  );
};

export default MakeDepositPage;
