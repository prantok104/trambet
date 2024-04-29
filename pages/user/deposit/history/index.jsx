import React,{useState,useRef, useEffect} from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import Card from '@/components/Card'
import DepositHistory from '@/models/DepositHistory'
import InputField from '@/components/Form/InputField'
import { Form as FormikForm, Formik } from 'formik'
import * as Yup from 'yup';
import { HttpClientCall } from "@/components/HTTPClient";
const History = () => {
  const innerRef = useRef()
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    page:1,
    per_page: 10,
    order_by:'DESC'
  });
  const [initialValues, setInitialValues] = useState({
    search : ''
  })
  const validationSchema = Yup.object({
      search: Yup.string()
   });
  const rows = {
    data: [
      {year: 40},
      {year: 20},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
      {year: 50},
    ], 
    current_page: 1,
    per_page: 10,
    total: 11
  }

  const handlePageSizeChange = (pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize
      };
    });
  };
  const handlePageChange = (page) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                page: page
            };
        });
    };

  const handleAction = async (event, data) => {

  }

  const handleSubmit =(values) => {
    
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    HttpClientCall({
      endpoint: `deposit/history/${filter.page}`,
      method: "GET",
      includeAuth: true,
      data: [],
    })
      .then((res) => {
        console.log(res);
        if (res) {
          setData(res);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

console.log(data)
  return (
    <div className="container-fluid">
      <Breadcrumb
        title="Deposit history"
        path="Home => deposit => deposit history"
      />
      <div className="mt-2">
        
        <Card header="History" filter={<div className="text-right">
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
                  <button className="df-btn py-1 reg-btn text-uppercase" onClick={handleSubmit}>search</button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>}>
          <DepositHistory
            isLoading={isLoading}
            rows={data}
            handleAction={handleAction}
            handlePageSizeChange={handlePageSizeChange}
            handlePageChange={handlePageChange}
          />
        </Card>
      </div>
    </div>
  );
}

export default History