import Card from "@/components/Card";
import CheckboxField from "@/components/Form/CheckboxField";
import InputField from "@/components/Form/InputField";
import ImageInputField from "@/components/Form/ImageInputField";
import { HttpClientCall } from "@/components/HTTPClient";
import Loader from "@/components/Loader";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { notify } from "@/components/Helper";
import { useRouter } from "next/router";
const KycVerification = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const innerRef = useRef();
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});
  const router = useRouter();
  const handleKycFormSubmit = async (values) => {
    setIsLoading(true);
    const data = {
      full_name: values?.full_name,
      document_number: values?.document_number,
      front_page_of_document: values?.front_page_of_document,
      back_page_of_documents: values?.back_page_of_documents,
      document_type: [],
    };
    if (values.document_type_0) {
      data.document_type.push("National Identity Card");
    }

    if (values.document_type_1) {
      data.document_type.push("Passport");
    }

    if (values.document_type_2) {
      data.document_type.push("License");
    }
    await HttpClientCall({
      method: "POST",
      endpoint: "kyc-submit",
      includeAuth: true,
      data: data,
      content_type: "multipart/form-data",
    })
      .then((res) => {
        if (res.status == true) {
          setIsLoading(false);
          notify("success", res?.user_message);
          router.replace("/user/profile")
        } else {
          setIsLoading(false);
          notify("error", res?.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const effect = useCallback(async () => {
    await fetchKycFormData();
  }, []);

  const fetchKycFormData = async () => {
    await HttpClientCall({
      method: "GET",
      endpoint: "kycform",
      includeAuth: true,
      data: {},
    })
      .then((res) => {
        if (res.status == true) {
          setFormData(res?.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    effect();
  }, [effect]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <Card
                header={
                  <>
                    <h6 className="text-uppercase">{`${formData?.act} Verification Form`}</h6>
                  </>
                }
              >
                <Formik
                  innerRef={innerRef}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={handleKycFormSubmit}
                >
                  {() => (
                    <Form encType="multipart/form-data">
                      <div className="row">
                        {formData?.form_data?.full_name?.label && (
                          <div className="col-md-12">
                            <InputField
                              name={formData?.form_data?.full_name?.label}
                              label={`${formData?.form_data?.full_name?.name}${
                                formData?.form_data?.full_name?.is_required ==
                                "required"
                                  ? "*"
                                  : ""
                              }`}
                              required={
                                formData?.form_data?.full_name?.is_required ==
                                "required"
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        )}

                        {formData?.form_data?.document_type?.type ==
                          "checkbox" && (
                          <>
                            <div className="col-md-12 mt-3">
                              <div className="mb-2">Document type*</div>
                              {formData?.form_data?.document_type?.options?.map(
                                (_item, index) => (
                                  <div className="col-md-12" key={index}>
                                    <CheckboxField
                                      name={`${formData?.form_data?.document_type?.label}_${index}`}
                                      label={_item}
                                      id={_item}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}
                        {formData?.form_data?.front_page_of_document?.label && (
                          <div className="col-md-12 mt-3">
                            <ImageInputField
                              name={
                                formData?.form_data?.front_page_of_document
                                  ?.label
                              }
                              label={`${
                                formData?.form_data?.front_page_of_document
                                  ?.name
                              }${
                                formData?.form_data?.front_page_of_document
                                  ?.is_required == "required"
                                  ? "*"
                                  : `(${formData?.form_data?.front_page_of_document?.is_required})`
                              }`}
                              required={
                                formData?.form_data?.front_page_of_document
                                  ?.is_required == "required"
                                  ? true
                                  : false
                              }
                              accept={`.jpg,.jpeg,.png.pdf`}
                              type={
                                formData?.form_data?.front_page_of_document
                                  ?.type
                              }
                            />
                          </div>
                        )}

                        {formData?.form_data?.back_page_of_documents?.label && (
                          <div className="col-md-12 mt-3">
                            <ImageInputField
                              name={
                                formData?.form_data?.back_page_of_documents
                                  ?.label
                              }
                              label={`${
                                formData?.form_data?.back_page_of_documents
                                  ?.name
                              }${
                                formData?.form_data?.back_page_of_documents
                                  ?.is_required == "required"
                                  ? "*"
                                  : `(${formData?.form_data?.back_page_of_documents?.is_required})`
                              }`}
                              required={
                                formData?.form_data?.back_page_of_documents
                                  ?.is_required == "required"
                                  ? true
                                  : false
                              }
                              accept={`.jpg,.jpeg,.png.pdf`}
                              type={
                                formData?.form_data?.back_page_of_documents
                                  ?.type
                              }
                            />
                          </div>
                        )}

                        {formData?.form_data?.document_number?.label && (
                          <div className="col-md-12 mt-3">
                            <InputField
                              name={formData?.form_data?.document_number?.label}
                              label={`${
                                formData?.form_data?.document_number?.name
                              }${
                                formData?.form_data?.document_number
                                  ?.is_required == "required"
                                  ? "*"
                                  : ""
                              }`}
                              required={
                                formData?.form_data?.document_number
                                  ?.is_required == "required"
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        )}
                        <div className="col-md-12 mt-3">
                          <button type="submit" className="df-btn df-bg">
                            Submit
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KycVerification;
