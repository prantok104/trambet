import Promotion from "@/components/Affiliate/Promotions/Promotion";
import React from "react";
import AffiliatLayout from "../layout";
import { useEffect, useState } from "react";
import { getAllPromotions } from "@/services/affiliate";
const Promotions = () => {
    const [promoData, setPromoData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getAllPromotions();
            setPromoData(data);
        }
        fetchData();
    }, []);
  return (
    <AffiliatLayout>
      <Promotion promotions={promoData.promotions} promo={promoData.promo}/>
    </AffiliatLayout>
  );
};

export default Promotions;
