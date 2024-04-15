import ImageTitle from '@/components/ImageTitle'
const SingleNews = () => {
   return (
      <div className="single-news-content">
          <ImageTitle title="Read Full News" />
          <div className="single-news-area py-5">
            <div className="container">
               <div className="row">
                     <div className="col-md-9">
                        single news content
                     </div>
                     <div className="col-md-3">
                        sidebar
                     </div>
                  </div>
               </div>
          </div>
      </div>
   )
}
export default SingleNews