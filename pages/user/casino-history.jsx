import React,{useState,useRef, use, useEffect} from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import Card from '@/components/Card'
import CasinoHistory from '@/models/CasinoHistory'
import InputField from '@/components/Form/InputField'
import { Form as FormikForm, Formik } from 'formik'
import * as Yup from 'yup';
import { getCasinoHistory } from '@/services/casino'
const CasinoHistoryPage = () => {
  const innerRef = useRef()
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    page:1,
    per_page: 10,
    order_by:'DESC'
  });
  const [initialValues, setInitialValues] = useState({
    'search' : ''
  })
  const validationSchema = Yup.object({
      search: Yup.string()
   });




  const handleAction = async (event, data) => {

  }

  const handleSubmit =(values) => {
    
  }
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const fetchData = async (page) => {
    setIsLoading(true);
    await getCasinoHistory(page , perPage).then((res) => {
        if (res) {
          setData(res);
          setTotalRows(res?.paginationData?.totalItems);
        }
      }).then(() => {
        setIsLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setFilter((prevState) => {
        return {
            ...prevState,
            page: page
        };
    });
    fetchData(page);
};

const handlePageSizeChange = async(newPerPage, page) => {
  // setFilter((prevState) => {
  //   return {
  //     ...prevState,
  //     per_page: pageSize,
  //   };
  // });

  setIsLoading(true);
  await getCasinoHistory(page, newPerPage).then((response) => {
    if(response.status == true){
      setData(response)
      setTotalRows(response?.paginationData?.totalItems)
      setIsLoading(false)
    }
  }).then(() => {
    setIsLoading(false);
  });
};

useEffect(() => {
  fetchData(1)
}, [])

  return (
    <div className="container-fluid">
      <Breadcrumb
        title="Casino bet history"
        path="Home => user => casino bet history"
      />
      <div className="mt-2">
        
        <Card header="Bet History" filter={<div className="text-right">
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
          <CasinoHistory
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

export default CasinoHistoryPage;