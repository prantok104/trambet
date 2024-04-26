import Card from '@/components/Card'
import React, { useState } from 'react'

const MyRefLink = () => {
    const [copied, setCopied] = useState(false);
   const handleCopy = () => {
     navigator.clipboard.writeText(
       "https://trambet.smshagor.com?reference=UYR6D77J2BWV"
     );
     setCopied(true);
     setTimeout(() => {
       setCopied(false);
     }, 2000);
   };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <Card header={"Referral Link"}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value="https://trambet.smshagor.com?reference=UYR6D77J2BWV"
                readOnly
              />
              <div className="input-group-append">
                <button className="btn btn-primary text-copy-btn" onClick={handleCopy}>
                  Copy
                </button>
              </div>
            </div>
            {copied && <div className="text-success mt-2">TEXT Copied!</div>}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MyRefLink