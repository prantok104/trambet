import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SearchSelectField";
import TextAreaField from "@/components/Form/TextAreaField";
import { Form as FormikForm, Formik } from "formik";
import React, { useRef } from "react";
import * as Yup from "yup";

const CreatePromotion = () => {
  const formikRef = useRef();

  const status = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("First name required").max(50),
    promocode: Yup.string().required("Last name required").max(50),
    attachments: Yup.string().required("Last name required").max(50),
    status: Yup.string().required("Last name required").max(50),
    description: Yup.string().required("Last name required").max(50),
  });
  const promocode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const initialValues = {
    title: "",
    promocode: promocode,
    attachments: "",
    status: "",
    description: "",
  };
  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      title: values?.title,
      promo_code: promocode,
      details : values?.description,
      status: values?.status,
      attachments: values?.attachments,
    };
    console.log(payload);
  };
  return (
    <Card>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        // className="form-data"
      >
        {({ values, touched, errors }) => (
          <FormikForm>
            <div className="row">
              <div className="col-md-6">
                <InputField label="Title*" name="title" />
              </div>
              <div className="col-md-6">
                <InputField label="Promo Code*" name="promocode" />
              </div>
              <div className="col-md-6 mt-2">
                <InputField label="Attachments" type="file" name="image" />
              </div>
              <div className="col-md-6 mt-2">
                <SelectField
                  label="Status*"
                  name="country"
                  options={status}
                />
              </div>
              <div className="col-md-12 mt-2">
                <TextAreaField label="Description" name="description" />
              </div>
              <div className="col-md-12 d-flex justify-content-end">
                <button type="submit" className="logout-btn">
                  SUBMIT
                </button>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Card>
  );
};

export default CreatePromotion;
