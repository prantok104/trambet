import { getLiveCasinoData, getLiveCasinoOpenData } from '@/services/casino';
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../Loader';
import WarningCard from '../Warning';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import _ from 'lodash';
const HomePageCasino = () => {
   const router = useRouter();
   const [loading, setloading] = useState(false);
   const [loader, setLoader] = useState(true);
   const [casinoData, setCasinoData] = useState([]);

   const effect = useCallback(async () => {
      await fetchCasinoData();
   }, []);
  
   const fetchCasinoData = async () => {
      const data = await getLiveCasinoData();
      setCasinoData(data);
      setLoader(false);
   };

   useEffect(() => {
      effect() ;
   }, [effect])

   const handelPlayButtonClick = async (id, demo) => {
      setloading(true);
      const response = await getLiveCasinoOpenData({ id: id, demo: demo });
      if (response) {
         setloading(false);
         router.push(`/casino/play?url=${response.game.url}`);
      }
   }


  return (
    <>
    {loading ? <Loader /> : ''}
    <div className="my-3">
      <h5 className="font-14 mb-3">Live Casino</h5>
      <div className="casino-area-start">
        {loader ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <div className="casino-all-data">
            {casinoData?.content?.gameList?.length > 0 ? (
              <>
                {_.sampleSize(casinoData?.content?.gameList, 16)?.map((item) => (
                  <div
                    className="casino-item-data home-page-casino"
                    style={{
                      background: `url(${item?.img}) no-repeat center center/ cover, #1E263D`,
                    }}
                    key={item?.id}
                  >
                    <span>{item?.name}</span>
                    <div>
                      <button
                        className="play-btn"
                        onClick={() =>
                          handelPlayButtonClick(item?.id, item?.demo)
                        }
                      >
                        Play
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <WarningCard message="Have no casino game found!" />
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default HomePageCasino