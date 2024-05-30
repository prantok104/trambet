import React, { useCallback, useEffect, useState } from "react";
import Card from "@/components/Card";
import Breadcrumb from "@/components/Breadcrumb";
import Myticket from "@/components/Users/Support/Myticket";
import { getMyTickets } from "@/services/support";
const Tickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    order_by: "DESC",
  });

  const effect = useCallback(async () => {
    await fetchData();
  }, [filter]);

  const fetchData = async () => {
    setIsLoading(true);
    await getMyTickets(filter?.page, filter?.per_page, '')
      .then((res) => {
        if (res) {
          setData(res);
          console.log(res);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    effect();
  }, [effect]);

   const handlePageChange = (page) => {
     setFilter((prevState) => {
       return {
         ...prevState,
         page: page,
       };
     });
   };

  const handlePageSizeChange = async (pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize,
      };
    });
  };

  const handleAction = (event, data) => {};


  return (
    <div className="container-fluid">
      <Breadcrumb title="My Tickets" path="Home => Supports => All Tickets" />
      <div className="row mt-2">
        <div className="col-md-10 mx-auto">
          <Card header={"Open New Ticket"}>
            <Myticket
              isLoading={isLoading}
              rows={data}
              handleAction={handleAction}
              handlePageSizeChange={handlePageSizeChange}
              handlePageChange={handlePageChange}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
