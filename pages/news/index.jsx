import { useEffect, useState, React } from "react";
import ImageTitle from "@/components/ImageTitle";
import NewsCard from "@/components/News/NewsCard";
import { getAllNews } from "@/services/news";
import ConstantData from "@/components/ConstantData";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllNews();
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
            {newsData?.map((newsItem, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className="col-md-4">
                <NewsCard
                  key={index}
                  image={newsItem.image}
                  title={newsItem.title}
                  content={newsItem.details}
                  link={`news/${newsItem.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
