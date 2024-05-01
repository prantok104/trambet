
import Websites from "./websites";
import AffiliatLayout from "./layout";
import ItemCard from "@/components/Affiliate/ItemCard";
import { FaEdit, FaTrash } from "react-icons/fa";
const itemcards = [
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
    bg: "rgb(28 40 74)",
  },
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
    bg: "#2c5b66",
  },
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
  },
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
  },
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
  },
  {
    icon: <FaEdit />,
    title: "minimum withdrawal amount 30$",
    content: "0 USD | 0 Taka",
  },
];


const Affiliate = () => {
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
