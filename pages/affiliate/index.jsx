
import Websites from "./websites";
import AffiliatLayout from "./layout";
import ItemCard from "@/components/Affiliate/ItemCard";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HttpClientCall } from "@/components/HTTPClient";
const Affiliate = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await HttpClientCall({
      endpoint: "affiliate",
      method: "GET",
      includeAuth: true,
      data: [],
    })
      .then((response) => {
        console.log(response);
        setData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  useEffect(() => {
    fetchData();
  }, []);

  const itemcards = [
    {
      icon: <FaEdit />,
      title: "minimum withdrawal amount 30$",
      content: `${(Number(data?.user?.withdrawal) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
      bg: "rgb(28 40 74)",
    },
    {
      icon: <FaEdit />,
      title: "Yesterday's Earning",
      content: `${(Number(data?.yestrdayEarn) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
      bg: "#2c5b66",
    },
    {
      icon: <FaEdit />,
      title: "Current Month",
      content: `${(Number(data?.currentMonthEarn) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
    },
    {
      icon: <FaEdit />,
      title: "30 Days",
      content: `${(Number(data?.thirtyDaysEarn) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
    },
    {
      icon: <FaEdit />,
      title: "Total",
      content: `${(Number(data?.totalEarn) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
    },
  ];
  return (
    <>
      <AffiliatLayout>
        <div className="affiliate-dashboard-card-area mb-2">
          <div className="row">
            {itemcards?.map((item) => (
              <div className="col-md-4">
                <ItemCard
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                  style={{ background: item?.bg }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <Websites /> */}
      </AffiliatLayout>
    </>
  );
};

export default Affiliate;
