import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import React from 'react'

const Deposit = () => {
  return (
    <div className="container-fluid">
      <Breadcrumb
        title="Deposits"
        path="Home => deposits"
      />

      <div className="mt-2">
         <Card header="History" className="text-right">
            
         </Card>
      </div>
    </div>
    
  );
}

export default Deposit