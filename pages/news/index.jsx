import React from 'react'
import ImageTitle from '@/components/ImageTitle'
import NewsCard from '@/components/News/NewsCard';
import {getAllNews} from '@/services/news'
const NewsPage = () => {
  const get = getAllNews();
console.log(get);
  return (
    <div className="news-page-content">
      <ImageTitle title="News and Updates" />
      <div className="all-news  py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
               <NewsCard data={getAllNews} image="/breadcrumb.jpg" title="Donec orci lectus aliquam ut" content="Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent ta" link={'/news/first'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage