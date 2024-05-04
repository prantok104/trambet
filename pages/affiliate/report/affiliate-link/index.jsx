import React, { useState, useRef, useEffect, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../../layout";
import AffiliateLink from "@/models/AffiliateLink";
import {
  getAffiliateCreateFormData,
  getAffiliateGenerateLink,
  getAffiliateLink,
} from "@/services/affiliate";
import SelectField from "@/components/Form/SelectField";
import { Button } from "react-bootstrap";
import { notify } from "@/components/Helper";
import Loader from "@/components/Loader";

const AffiliateLinks = () => {
  const innerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [muted, setMuted] = useState(false);

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    order_by: "DESC",
  });
  const [initialValues, setInitialValues] = useState({
    search: "",
  });
  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  // Data fetch
  const effect = useCallback(async () => {
    await fetchData();
  }, [filter, muted]);

  const fetchData = async () => {
    setIsLoading(true);
    const responseData = await getAffiliateLink(filter);
    if (responseData?.status_code == 200) {
      setData(responseData?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      notify("error", responseData?.data?.error);
    }
  };

  useEffect(() => {
    effect();
  }, [effect]);

  // Generate link
  const effectLink = useCallback(async () => {
    await fetchLink();
  }, []);
  const fetchLink = async () => {
    setLoader(true);
    const responseData = await getAffiliateCreateFormData();
    if (responseData?.status == true) {
      setFormData(responseData);
      setLoader(false);
    } else {
      setLoader(false);
      notify("error", responseData?.data?.error);
    }
  };
  useEffect(() => {
    effectLink();
  }, [effectLink]);

  const handleSubmit = (values) => {
    if (values.search != null) {
      setFilter((prevState) => ({
        ...prevState,
        search: values?.search,
      }));
    }
  };
  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize,
      };
    });
  };

  const generateInit = {
    website: "",
    currency: "",
    campaign: "",
    landingpage: "",
    subid: "",
  };

  const generateValid = Yup.object({
    website: Yup.string().required("Website is required."),
    currency: Yup.string().required("Currency is required."),
    campaign: Yup.string().nullable(),
    landingpage: Yup.string().nullable(),
  });

  const handleGenerateLink = async (values) => {
    const responseData = await getAffiliateGenerateLink(values);
    if (responseData?.status) {
      notify("success", responseData?.user_message);
      setMuted((prevState) => !prevState);
    } else {
      notify("error", responseData?.data?.error);
    }
  };

  const handleAction = async (event, data) => {
    // write code for copy the link
  };

  return (
    <AffiliatLayout>
      <div className="container-fluid">
        <Breadcrumb
          title="Affiliate Link"
          path="Home => affiliate => report => affiliate link"
        />
        <div className="mt-2">
          <Card header={"Generate Affiliate Link"}>
            <Formik
              innerRef={innerRef}
              initialValues={generateInit}
              validationSchema={generateValid}
              enableReinitialize
              onSubmit={handleGenerateLink}
            >
              {() => (
                <FormikForm>
                  {loader ? (
                    <Loader />
                  ) : (
                    <div className="row">
                      <div className="col-md-4">
                        <SelectField
                          name="website"
                          options={[
                            { label: "Choose Website", value: "" },
                            ...formData?.data?.websites?.map((item) => ({
                              label: item?.website,
                              value: `${item?.website} | ${item?.id}`,
                            })),
                          ]}
                          label={"Website*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectField
                          name="currency"
                          options={[
                            { label: "Choose currency", value: "" },
                            ...formData?.data?.currency?.map((item) => ({
                              label: item?.currency_code,
                              value: item?.currency_code,
                            })),
                          ]}
                          label={"Currency*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectField
                          name="campaign"
                          options={[
                            { label: "Choose one option", value: "" },
                            { label: "Asia-EU", value: "Asia-EU" },
                            { label: "Asia-US", value: "Asia-US" },
                            { label: "EU-US", value: "EU-US" },
                            { label: "EU-Africa", value: "EU-Africa" },
                            { label: "US-Africa", value: "US-Africa" },
                            { label: "Asia-Africa", value: "Asia-Africa" },
                          ]}
                          label={"Campaign*"}
                        />
                      </div>
                      <div className="col-md-5 mt-2">
                        <InputField name="landingpage" label={"Landing Page"} />
                      </div>
                      <div className="col-md-4 mt-2">
                        <SelectField
                          name="subid"
                          options={[
                            { label: "Choose one option", value: "" },
                            {
                              label: formData?.data?.promo?.promo_code,
                              value: formData?.data?.promo?.promo_code,
                            },
                          ]}
                          label={"Sub ID"}
                        />
                      </div>
                      <div className="col-md-3 mt-3">
                        <Button type="submit" className="df-btn df-bg mt-1">
                          Generate Link
                        </Button>
                      </div>
                    </div>
                  )}
                </FormikForm>
              )}
            </Formik>
          </Card>
        </div>

        <div className="mt-2">
          <Card
            header=""
            filter={
              <div className="text-right">
                <Formik
                  innerRef={innerRef}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ values }) => (
                    <FormikForm>
                      <div className="d-flex align-items-center gap-2 justify-content-end">
                        <InputField name="search" placeholder="Search" />
                        <button
                          className="df-btn py-1 reg-btn text-uppercase"
                          onClick={handleSubmit}
                        >
                          search
                        </button>
                      </div>
                    </FormikForm>
                  )}
                </Formik>
              </div>
            }
          >
            <AffiliateLink
              isLoading={isLoading}
              rows={data}
              handleAction={handleAction}
              handlePageSizeChange={handlePageSizeChange}
              handlePageChange={handlePageChange}
            />
          </Card>
        </div>
      </div>
    </AffiliatLayout>
  );
};

export default AffiliateLinks;
