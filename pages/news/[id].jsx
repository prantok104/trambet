import ImageTitle from '@/components/ImageTitle'
import Image from 'next/image'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNewsDetails} from "@/services/news";
import { useRouter } from 'next/router';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import RecentNews from '@/components/News/RecentNews';
import {useEffect, useState} from "react";

const SingleNews = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log('Fetching details for news ID: ',id);
  const socialLinks = [
    {
      name: "facebook",
      icon: faFacebookF,
      href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftrambet.smshagor.com%2Fnews%2Fdonec-orci-lectus-aliquam-ut%2F34",
    },
    {
      name: "twitter",
      icon: faTwitter,
      href: "https://twitter.com/intent/tweet?text=Donec%20orci%20lectus%20aliquam%20ut%0Ahttps://trambet.smshagor.com/news/donec-orci-lectus-aliquam-ut/34",
    },
    {
      name: "linkedin",
      icon: faLinkedinIn,
      href: "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Ftrambet.smshagor.com%2Fnews%2Fdonec-orci-lectus-aliquam-ut%2F34&title=Donec orci lectus aliquam ut&summary=<div>Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nullam cursus lacinia erat. Phasellus a est. Praesent venenatis metus at tortor pulvinar varius.</div><div><br /></div><div>Praesent egestas tristique nibh. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Proin magna. Cras id dui. Phasellus blandit leo ut odio.</div><div><br /></div><div>Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce egestas elit eget lorem. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Praesent egestas neque eu enim. Nunc nulla.</div><div><br /></div><div>Pellentesque ut neque. Morbi nec metus. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.</div><div><br /></div><div>Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Sed aliquam ultrices mauris. Nullam sagittis. Nullam tincidunt adipiscing enim.</div>",
    },
    {
      name: "pinterest",
      icon: faPinterest,
      href: "http://pinterest.com/pin/create/button/?url=https%3A%2F%2Ftrambet.smshagor.com%2Fnews%2Fdonec-orci-lectus-aliquam-ut%2F34&amp;description=Donec orci lectus aliquam ut&amp;media=https://trambet.smshagor.com/assets/images/frontend/blog/64ab9caa6fc861688968362.jpg",
    },
  ];
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getNewsDetails(id);
      console.log("Fetched data:", data); // Log the fetched data
      setNewsData(data);
    }
    fetchData();
  }, [id]);
   return (
     <div className="single-news-content">
       <ImageTitle title="Read Full News" />
       <div className="single-news-area py-5">
         <div className="container">
           <div className="row">
             <div className="col-md-8">
               <div className="news-left-side">
                  <Image
                 src="/breadcrumb.jpg"
                 alt="image name"
                 width="400"
                 height="0"
                 quality="100"
                 style={{
                   height: "auto",
                   objectFit: "cover",
                   width: "100%",
                   borderRadius: "7px",
                 }}
               />
               <span className="news-times mt-2 d-block">24 Apr, 2024</span>
               <h2 className="my-4">Donec orci lectus aliquam ut</h2>
               <p>
                 Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum
                 eget, diam. Class aptent taciti sociosqu ad litora torquent per
                 conubia nostra, per inceptos hymenaeos. Nullam cursus lacinia
                 erat. Phasellus a est. Praesent venenatis metus at tortor
                 pulvinar varius.
               </p>
               <p>
                 Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum
                 eget, diam. Class aptent taciti sociosqu ad litora torquent per
                 conubia nostra, per inceptos hymenaeos. Nullam cursus lacinia
                 erat. Phasellus a est. Praesent venenatis metus at tortor
                 pulvinar varius.
               </p>
               <p>
                 Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum
                 eget, diam. Class aptent taciti sociosqu ad litora torquent per
                 conubia nostra, per inceptos hymenaeos. Nullam cursus lacinia
                 erat. Phasellus a est. Praesent venenatis metus at tortor
                 pulvinar varius.
               </p>

               <div className="news-social-share">
                 <h2>Share This Post</h2>
                 <div className="share-like">
                   {socialLinks?.map((item, index) => (
                     <Link title={item?.name} href={item?.href} target="_blank" key={`social-share${index}`}>
                       <FontAwesomeIcon icon={item?.icon} />
                     </Link>
                   ))}
                 </div>
               </div>
               </div>
             </div>
             <div className="col-md-4">
               <div className="recent-news-content-area">
                  <h2 className="recent-news-heading">Recent Updates</h2>
                  <RecentNews image={'/breadcrumb.jpg'} title={'In ac felis quis tortor'} time={'28 Apr, 2024'} />
                  <RecentNews image={'/breadcrumb.jpg'} title={'Nam pretium turpis et arcu'} time={'28 Apr, 2024'} />
                  <RecentNews image={'/breadcrumb.jpg'} title={'Phasellus viverra nulla ut metus'} time={'28 Apr, 2024'} />
                  <RecentNews image={'/breadcrumb.jpg'} title={'Phasellus viverra nulla ut metus'} time={'28 Apr, 2024'} />
                  <RecentNews image={'/breadcrumb.jpg'} title={'Phasellus viverra nulla ut metus'} time={'28 Apr, 2024'} />
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}
export default SingleNews