import ImageTitle from '@/components/ImageTitle'
import { useEffect, useState } from "react";
import { getPrivacyPolicy } from "@/services/common";

const privacyPolicy = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [privacyData, setPrivacyData] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function fetchData() {
            const data = await getPrivacyPolicy();
            console.log("Fetched data:", data); // Log the fetched data
            setPrivacyData(data);
        }
        fetchData();
    }, []);
  return (
    <div class="policy-page-content">
      <ImageTitle  title={privacyData.title} />
      <div className="p-5">
          <div className="mb-5">
              <h2>{privacyData.title}</h2>
              <p dangerouslySetInnerHTML={{__html: privacyData.details}}/>
          </div>
      </div>
    </div>
  )
}

export default privacyPolicy