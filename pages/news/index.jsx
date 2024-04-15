import React from 'react'
import ImageTitle from '@/components/ImageTitle'
import NewsCard from '@/components/NewsCard';
const NewsPage = () => {
  return (
    <div className="news-page-content">
      <ImageTitle title="News and Updates" />
      <div className="all-news  py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
               <NewsCard image="/breadcrumb.jpg" title="Donec orci lectus aliquam ut" content="Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent ta" link={'/news/first'} />
            </div>
            <div className="col-md-4">
               <NewsCard image="/breadcrumb.jpg" title="Donec orci lectus aliquam ut" content="Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent ta" link={'/news/first'} />
            </div>
            <div className="col-md-4">
               <NewsCard image="/breadcrumb.jpg" title="Donec orci lectus aliquam ut" content="Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent ta" link={'/news/first'} />
            </div>
            <div className="col-md-4">
               <NewsCard title="Donec orci lectus aliquam ut" content="Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent ta"  link={'/news/first'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage