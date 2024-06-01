import React from 'react'
import ImageTitle from '@/components/ImageTitle'
import { useEffect, useState } from "react";
import { getTermsOfService} from "@/services/common";
const termsOfService = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [termsOfServiceData, setTermsOfServiceData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetchData() {
      const data = await getTermsOfService();
      // console.log("Fetched data:", data); // Log the fetched data
      setTermsOfServiceData(data);
    }
    fetchData();
  }, []);
  return (
    <div class="policy-page-content">
      <ImageTitle title={termsOfServiceData.title} />
      <div className="p-5">
        <div className="mb-5">
          <p dangerouslySetInnerHTML={{__html: termsOfServiceData.details}}/>
        </div>
      </div>
    </div>
  );
}

export default termsOfService