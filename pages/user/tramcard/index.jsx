import WarningCard from './../../../components/Warning';
import AlertCard from './../../../components/AlertCard';
import Image from 'next/image';
import ProgressBar from 'react-bootstrap/ProgressBar';
const Tramcard = () => {

   return (
     <div className="container">
       <div className="row">
         <div className="col-md-12">
           <WarningCard message="You have no tramcard" />
           <div className="tramcard-area-start mb-4">
             <div className="mb-2">
               <AlertCard
                 message="Congratulations! You got a tramcard, Enjoy the game."
                 bg="linear-gradient(86.37deg, #d062ff 2.96%, #7bb0ff 99.68%),linear-gradient(90deg, #ed6ea0 0%, #ec8c69 100%)"
               />
             </div>
           </div>
         </div>
            <div className="col-md-4">
               <div className="tramcard-image">
                 <Image
                   src="/breadcrumb.jpg"
                   alt="Tramcard"
                   width="350"
                   height="230"
                   quality={100}
                   style={{
                     width: "100%",
                     objectFit: "cover",
                     borderRadius: "12px",
                     border: "1px solid #1E263D",
                     padding: "5px",
                   }}
                 />
               </div>
             </div>
             <div className="col-md-8">
               <div className="tramcard-rules-area p-4 df-border df-radius">
                 <h5>Rules</h5>
                 <div className="rules-contents">
                   You can only use tram card in upcoming sport<br/> You use a tram
                   card, multibet stake value will be same as card value<br/> If You
                   win that multibet then initial card value will credited to
                   winning funds<br/> Each multibet bet must contain at least three
                   selections.<br/> Each selection of multibet must have odds of 1.80
                   or higher.
                 </div>
               </div>
             </div>

             <div className="col-md-4 mt-4">
               <div className="tramcard-claim-area text-center d-flex flex-column justify-content-center align-items-center p-4 df-border bg-shadow df-radius">
                  <div className='tramcard-balance'><b>Balance: </b> 500.00 BDT</div>
                  <div className="tramcard-valid-time">
                     Valid: Life time
                  </div>
                  <button className="tramcard-claim-btn df-btn">Claim Now  (500.00 BDT)</button>
               </div>
             </div>
               <div className="col-md-8 mt-4">
               <div className="tramcard-progress-area bg-shadow df-radius p-4">
                  <div className="tamcard-progress-bar">
                     <p className="mb-2" style={{fontSize:'14px', fontWeight: 600}}>You claim the tramcard amount when you have completed 100% progressbar and passed the all rules</p>
                     <ProgressBar min={0} max={100} animated now={80} variant="primary" label={`80%`} />

                     <div className="tramcard-follow-rules">
                        <ul className="m-3">
                           <li className="tramcard-follow-rule-completed">Player can only use tram card in upcoming sport.</li>
                           <li>If player use a tram card, multibet stake value will be same as card value.</li>
                           <li>Each multibet bet must contain at least 3 selections.</li>
                           <li>Each selection of multibet must have odds of 1.8 or higher.</li>
                        </ul>
                     </div>
                  </div>
               </div>

               </div>
       </div>
     </div>
   );
}
export default Tramcard;
