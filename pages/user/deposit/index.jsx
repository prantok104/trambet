import AlertCard from '@/components/AlertCard';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import React from 'react'
import bKash from '@/public/providers/bkash.jpeg';
import rocket from '@/public/providers/rocket.jpg';
import ok from '@/public/providers/ok.png';
import mycash from '@/public/providers/mycash.png';
import ProviderCard from '@/components/Users/Deposit/ProviderCard';
const Deposit = () => {


 const providers = [
   { name: "bKash", image: bKash, min: 100, max: 2000 },
   { name: "rocket", image: rocket, min: 300, max: 20000 },
   { name: "ok", image: ok, min: 300, max: 20000 },
   { name: "mycash", image: mycash, min: 300, max: 20000 },
   { name: "bKash", image: bKash, min: 300, max: 20000 },
   { name: "rocket", image: rocket, min: 300, max: 20000 },
   { name: "ok", image: ok, min: 300, max: 20000 },
   { name: "mycash", image: mycash, min: 300, max: 20000 },
   { name: "bKash", image: bKash, min: 300, max: 20000 },
   { name: "rocket", image: rocket, min: 300, max: 20000 },
   { name: "ok", image: ok, min: 300, max: 20000 },
   { name: "mycash", image: mycash, min: 300, max: 20000 },
];


  return (
    <div className="container-fluid">
      <Breadcrumb
        title="Deposits"
        path="Home => deposits"
      />

      <div className="mt-2">
         <Card header="Payment system in your region">
            <AlertCard message='Recommended payment method' style={{background: '#282F42'}} />
            <div className="mt-2">
               <ProviderCard providers={providers} />
            </div>
         </Card>
      </div>
    </div>
    
  );
}


export default Deposit