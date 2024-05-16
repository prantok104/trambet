import React from 'react'
import ImageTitle from '@/components/ImageTitle'
import { useEffect, useState } from "react";
import { getRefundPolicy} from "@/services/common";
const refundPolicy = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refundPolicyData, setRefundPolicyData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetchData() {
      const data = await getRefundPolicy();
      // console.log("Fetched data:", data); // Log the fetched data
      setRefundPolicyData(data);
    }
    fetchData();
  }, []);
  return (
    <div class="policy-page-content">
      <ImageTitle title={refundPolicyData.title} />
      <div className="p-5">
        <div className="mb-5">
          <p>
           Sure, here is the refund policy for a sports betting platform in terms of sports betting:
          </p>
        </div>

          <div className="mb-5">
              <h2>{refundPolicyData.title}</h2>
              <p dangerouslySetInnerHTML={{__html: refundPolicyData.details}}/>
          </div>

      </div>
    </div>
  );
}

export default refundPolicy