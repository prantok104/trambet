import { useRouter } from "next/router";
import Card from '@/components/Card'
import AlertCard from '@/components/AlertCard'
import Warning from '@/components/Warning'
import ListGroup from 'react-bootstrap/ListGroup';
const MakeDepositPage = () => {
  const router = useRouter();
  return <>
    <div className="container">
      <div className="row">
        <div className="col-md-9 mx-auto">
          <Card header="Payment system in your region">
            <AlertCard message="Recommended payment method"  />
            <h4 className="mt-4 mb-2">1. Make a Transfer</h4>
            <Warning message="Recommended payment method" style={{background: '#282F42'}} />
            <div>
              <ListGroup>
                <ListGroup.Item className="d-flex align-items-center justify-content-between">
                  <span>Bank Name</span>
                  <span>SureCash</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center justify-content-between">
                  <span>SureCash Wallet Number</span>
                  <span>3456788765</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center justify-content-between">
                  <span>SureCash Wallet Name</span>
                  <span>hasan-1</span>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <h4 className="mt-4 mb-2">2. Request a Deposit</h4>
            
          </Card>
        </div>
      </div>
    </div>
  </>;
};

export default MakeDepositPage;
