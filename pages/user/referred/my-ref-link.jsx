import Card from '@/components/Card'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader'
const MyRefLink = () => {
  const { user } = useSelector((state) => state.AuthReducer);

    const [copied, setCopied] = useState(false);
   const handleCopy = () => {
     navigator.clipboard.writeText(
       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}?reference=${user?.referal_link
         ?.split("/")
         .pop()}`
     );
     setCopied(true);
     setTimeout(() => {
       setCopied(false);
     }, 2000);
   };
  return (
    <>
    {!user ? <Loader /> : ''}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <Card header={"Referral Link"}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={`${
                    process.env.NEXT_PUBLIC_DOMAIN_NAME
                  }?reference=${user?.referal_link?.split("/").pop()}`}
                  readOnly
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary text-copy-btn"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                </div>
              </div>
              {copied && <div className="text-success mt-2">TEXT Copied!</div>}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRefLink