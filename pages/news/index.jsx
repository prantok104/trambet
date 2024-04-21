import { useEffect, useState, React } from "react";
import ImageTitle from "@/components/ImageTitle";
import NewsCard from "@/components/News/NewsCard";
import { getAllNews } from "@/services/news";
import ConstantData from '@/components/ConstantData';

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const baseUrl = ConstantData.API_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      const data = await getAllNews();
      console.log("Fetched data:", data); // Log the fetched data
      setNewsData(data);
    }
    fetchData();
  }, []);
  return (
    <div className="news-page-content">
      <ImageTitle title="News and Updates" />
      <div className="all-news  py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {newsData?.map((newsItem, index) => (
                  <NewsCard key={index}
                            image={`${baseUrl}/newsItem.image`}
                            title={newsItem.title}
                            content={newsItem.details}
                            link={`news/${newsItem.id}`}

                  />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}