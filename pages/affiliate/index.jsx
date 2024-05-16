
import Websites from "./websites";
import AffiliatLayout from "./layout";
import ItemCard from "@/components/Affiliate/ItemCard";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HttpClientCall } from "@/components/HTTPClient";
import RegistrationStatistic from "@/components/Affiliate/Charts/RegistrationStatistic";
import EarningStatistic from "@/components/Affiliate/Charts/EarningStatistic";
import Loader from "@/components/Loader";
const Affiliate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    await HttpClientCall({
      endpoint: "affiliate",
      method: "GET",
      includeAuth: true,
      data: [],
    })
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }


  useEffect(() => {
    fetchData();
  }, []);

  const itemcards = [
    // {
    //   icon: <FaEdit />,
    //   title: "minimum withdrawal amount 30$",
    //   content: `${(Number(data?.user?.withdrawal) || 0).toFixed(2)} ${data?.user?.currency || ""}`,
    //   bg: "rgb(28 40 74)",
    // },
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
        {loading ? (
          <Loader />
        ) : (
          <div className="affiliate-dashboard-card-area mb-2">
            <div className="row">
              {itemcards?.map((item,idx) => (
                <div className="col-md-3" key={idx}>
                  <ItemCard
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                    style={{ background: item?.bg }}
                  />
                </div>
              ))}

              {/* registration statistic area start */}
              <div className="col-md-12">
                <RegistrationStatistic
                  chartData={
                    data?.promoCodeUserData
                      ? Object.entries(data?.promoCodeUserData).map(
                          ([month, value]) => ({
                            name: month,
                            value: value,
                          })
                        )
                      : []
                  }
                />
              </div>
              {/* registration statistic area end */}

              {/* Earning statistic area start */}
              <div className="col-md-12 mt-3">
                <EarningStatistic
                  chartData={
                    data?.affiliateCommisionData
                      ? Object.entries(data?.affiliateCommisionData).map(
                          ([date, value]) => ({
                            name: date,
                            value: value,
                          })
                        )
                      : []
                  }
                />
              </div>
              {/* Earning statistic area end */}
            </div>
          </div>
        )}

        {/* <Websites /> */}
      </AffiliatLayout>
    </>
  );
};

export default Affiliate;
