import React, {useState, useRef, useEffect, useCallback} from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../../layout";
import AffiliateLink from "@/models/AffiliateLink";
import {getAffiliateLink} from "@/services/affiliate";
import SelectField from "@/components/Form/SelectField";
import { Button } from "react-bootstrap";
import { notify } from "@/components/Helper";

const AffiliateLinks = () => {
    const innerRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
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
    const effect = useCallback(async() => {
      await fetchData();
    }, [filter]);

    const fetchData = async () => {
      setIsLoading(true);
      const responseData = await getAffiliateLink(filter);
      if(responseData?.status == true){
        setData(responseData)
        setIsLoading(false)
      }
      else{
        notify("error", responseData?.data?.error);
      }
    }

    useEffect(() => {
      effect();
    }, [effect]);


    // const fetchData = async (page) => {
    //     setIsLoading(true);
    //     await getAffiliateLink(page, perPage,searchData).then((res) => {
    //         if (res) {
    //             setData(res.websiteList);
    //             setTotalRows(res?.paginationData?.totalItems);
    //         }
    //     }).then(() => {
    //         setIsLoading(false);
    //     });
    // };
    const handleSubmit = (values) => {
        // if(values.search != null){
        //     setSearchData({ search: values.search });
        //     fetchData(1);
        // }
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

    // useEffect(() => {
    //     fetchData(1);
    // }, []);


    const generateInit = {
      website: "",
      currency: "",
      campaign: "",
      landingpage: "",
      subid: "",
    };

    const generateValid = Yup.object({

    })

    const handleGenerateLink = (values) => {

    }

    
    const handleAction = async (event, data) => {};

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
                    <div className="row">
                      <div className="col-md-4">
                        <SelectField
                          name="website"
                          options={[]}
                          label={"Website*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectField
                          name="currency"
                          options={[]}
                          label={"Currency*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectField
                          name="campaign"
                          options={[]}
                          label={"Campaign*"}
                        />
                      </div>
                      <div className="col-md-5 mt-2">
                        <InputField name="landingpage" label={"Landing Page"} />
                      </div>
                      <div className="col-md-4 mt-2">
                        <SelectField
                          name="subid"
                          options={[]}
                          label={"Sub ID"}
                        />
                      </div>
                      <div className="col-md-3 mt-3">
                        <Button className="df-btn df-bg mt-1">Generate Link</Button>
                      </div>
                    </div>
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
}

export default AffiliateLinks