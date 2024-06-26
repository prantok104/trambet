import AlertCard from '@/components/AlertCard';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import React, { useEffect, useState } from 'react'
import ProviderCard from '@/components/Affiliate/Withdraw/ProviderCard';
import { notify } from '@/components/Helper';
import { getPaymentMethods } from '@/services/transaction';
import AffiliatLayout from "./../layout";
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
    <AffiliatLayout>
    <div className="container-fluid mb-2">
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
    </AffiliatLayout>
  );
}


export default Withdraw