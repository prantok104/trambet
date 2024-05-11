import Card from '@/components/Card';
import { useRouter } from 'next/router'
import React from 'react'

const CricketPlayer = () => {
   const route = useRouter();
   const {query:{player}} = route;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <Card header={'Player Information'}>
              <div className='row'>
                  <div className="col-md-4">
                    Info
                  </div>
                  <div className="col-md-8">
                    Details
                  </div>
              </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CricketPlayer