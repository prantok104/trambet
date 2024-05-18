import Card from "@/components/Card";
import NotificationTable from "@/models/Notifications";
import React, { useState } from "react";

const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    data: [
      {id: 1,  title: "Notification title qwe", date: "01 May, 2024", is_read: 1 },
      {id: 2,  title: "Notification title ewew", date: "01 May, 2024", is_read: 0 },
      {id: 11,  title: "Notification tiewerw wew wewetle", date: "01 May, 2024", is_read: 1 },
      {id: 174,  title: "Notification titl wewe e", date: "01 May, 2024", is_read: 1 },
      {id: 254,  title: "Notification titleweqww weqew dfgfbf", date: "01 May, 2024", is_read: 0 },
      {id: 352,  title: "Notification title", date: "01 May, 2024", is_read: 0 },
      {id: 745,  title: "Notification titdf shdfjks skfsdkfsckjs  skdfjsbfuiwiefw nsnnms cnksnkd le", date: "01 May, 2024", is_read: 0 },
    ],
  });
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    order_by: "DESC",
  });

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

  const handleAction = async (event, data) => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Card header="Notifications (10)">
            <NotificationTable
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

export default NotificationPage;
