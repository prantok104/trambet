import Card from "@/components/Card";
import NotificationTable from "@/models/Notifications";
import { getNotifications } from "@/services/notification";
import React, { useCallback, useEffect, useState } from "react";

const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    order_by: "DESC",
  });
  const [muted, setMuted] = useState(true)

  const handlePageSizeChange = (pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize,
      };
    });
  };
  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
  };

  // API call
  const effect = useCallback(async () => {
    await fetchNotifications();
  }, [filter, muted]);

  const fetchNotifications = async () => {
    setIsLoading(true)
    const responseData = await getNotifications();
    if(responseData?.status_code === 200){
      setData(responseData?.data);
      setIsLoading(false);
    }else{
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    effect();
  }, [effect]);

  const handleAction = async (event, data) => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Card header="Notifications">
            <NotificationTable
              isLoading={isLoading}
              rows={data}
              handleAction={handleAction}
              handlePageSizeChange={handlePageSizeChange}
              handlePageChange={handlePageChange}
              setMuted={setMuted}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
