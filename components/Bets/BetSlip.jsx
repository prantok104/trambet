import React, { useRef, useState } from 'react'
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import RadioField from '../Form/RadioField';
const BetSlip = () => {
   const innerRef = useRef(null);
   const [initialValues, setInitialValues] = useState({
      bet_type: "1",
      bet_balance_type: "1"
   });
   const validationSchema = Yup.object({
     bet_type: Yup.string().required(""),
     bet_balance_type: Yup.string().required(""),
   });

   


  return (
    <div className="betslip-container p-2 text-center">
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ values }) => (
          <FormikForm>
            <div className="bet-types-button mb-2 d-flex align-items-center gap-2 justify-content-center">
              <RadioField
                label="Single bet"
                id="single_bet"
                name="bet_type"
                value="1"
              />
              <RadioField
                label="Multiple bet"
                id="multiple_bet"
                name="bet_type"
                value="2"
              />
            </div>
            <div className="bet-types-button bet-balance-buttons d-flex align-items-center gap-2 justify-content-center">
              <RadioField
                label="Deposit (9000.00)"
                id="deposit_btn"
                name="bet_balance_type"
                value="1"
              />
              <RadioField
                label="Bonus (100.00)"
                id="bonus_btn"
                name="bet_balance_type"
                value="2"
              />
              <RadioField
                label="Tramcard (100.00)"
                id="tramcard_btn"
                name="bet_balance_type"
                value="3"
              />
            </div>
            {JSON.stringify(values)}
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default BetSlip