import AlertCard from '@/components/AlertCard';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import React, { use, useEffect, useState } from 'react'
import ProviderCard from '@/components/Users/Deposit/ProviderCard';
import { notify } from '@/components/Helper';
import { getPaymentMethods } from '@/services/transaction';
import Image from 'next/image';
import Link from 'next/link';
const Deposit = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    paymentMethodData().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <Breadcrumb title="Deposits" path="Home => deposits" />

      <div className="mt-2">
        <Card header="Payment system in your region">
          <AlertCard message="Recommended payment method" />
          <div className="mt-2">
            <ProviderCard providers={paymentMethod} />
          </div>
          <div className="mob-cash-agent-method mt-4">
            <AlertCard message="Recommended Mob/Cash agent method" />
            <div className="all-providers-card justify-content-start">
              <Link href={"/user/deposit/mob-cash-agent"}>
                <div className="single-providers-card">
                  <Image
                    src={"/cash-agent.png"}
                    alt={"Mobcash agent provider"}
                    width={250}
                    height={170}
                    style={{ objectFit: "cover", objectPosition: 'center' }}
                  />
                  <h6>Mob cash</h6>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


export default Deposit