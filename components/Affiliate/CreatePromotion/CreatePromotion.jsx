import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SearchSelectField";
import TextAreaField from "@/components/Form/TextAreaField";
import { notify } from "@/components/Helper";
import { createPromoCode } from "@/services/affiliate";
import { Form as FormikForm, Formik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const CreatePromotion = () => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [promocode, setPromoCode] = useState(
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const router = useRouter();

  const status = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title required").max(50),
    attachments: Yup.array(),
    promocode: Yup.string().required("Promo Code required").max(50),
    status: Yup.object().required("Status required"),
    details: Yup.string().nullable(),
  });
  // const promocode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const initialValues = {
    title: "",
    promocode: promocode,
    attachments: "",
    status: "",
    description: "",
  };

  const handleSubmit = async (values) => {
    // console.log("🚀 ~ handleSubmit ~ values:", values)
    setIsLoading(true);
    const payload = {
      title: values?.title,
      promo_code: promocode,
      details: values?.description,
      status: values?.status?.value,
      attachments: values?.attachments,
    };

    await createPromoCode(payload)
      .then((res) => {
        if (res.status === true) {
          toast.success("Successfully Promocode Created", {
            onClose: () => {
              setPromoCode(null);
              formikRef.current.resetForm();
              router.push("/affiliate/promotions");
            },
          });
          setIsLoading(false);
        } else if (res.response.status === 422) {
          Object.keys(res.response.data.errors).forEach((field) => {
            res.response.data.errors[field].forEach((errorMessage) => {
              notify("error", errorMessage);
            });
          });
        } else {
          notify("error", res.response.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  return (
    <Card>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
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
                <InputField
                  label="Attachments"
                  type="file"
                  name="attachments"
                />
              </div>
              <div className="col-md-6 mt-2">
                <SelectField label="Status*" name="status" options={status} />
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
