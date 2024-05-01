import AlertCard from '@/components/AlertCard';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import React, { use, useEffect, useState } from 'react'
import ProviderCard from '@/components/Users/Withdraw/ProviderCard';
import { notify } from '@/components/Helper';
import { getPaymentMethods } from '@/services/transaction';
const Withdraw = () => {

const [paymentMethod, setPaymentMethod] = useState([]);
const paymentMethodData = async () => {
  await getPaymentMethods().then((res) => {
    if(res.status === true){
      setPaymentMethod(res.data);
     } else {
       notify("error", res.response.data.message);
     }
  });
 }

  useEffect(() => {
    paymentMethodData();
  }, []);

  return (
    <div className="container-fluid">
      <Breadcrumb
        title="Withdraw"
        path="Home => Withdraw"
      />

      <div className="mt-2">
         <Card header="Payment system in your region">
            <AlertCard message='Recommended payment method'/>
            <div className="mt-2">
               <ProviderCard providers={paymentMethod} />
            </div>
         </Card>
      </div>
    </div>
    
  );
}


export default Withdraw