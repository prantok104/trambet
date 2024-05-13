import AlertCard from "@/components/AlertCard";
import Card from "@/components/Card";
import { HttpClientCall } from "@/components/HTTPClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
const MobCashAgent = () => {
  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState([
    {
      id: 130,
      identity: "124571",
      address: "Guabari, Borobihanali-6250, Bagmara, Rajshahi",
      telegram_link: "t.me/prantomoly",
    },
    {
      id: 195,
      identity: "124588",
      address: "gazipur sadar kapasia bazar",
      telegram_link: "Marly102",
    },
    {
      id: 196,
      identity: "124589",
      address: "sylhet",
      telegram_link: "t.me/Bob_bp",
    },
    {
      id: 202,
      identity: "124595",
      address: "adf",
      telegram_link: "ad",
    },
  ]);

  const getAgents = async () => {
    const agents = await HttpClientCall({
      method: "GET",
      endpoint: `user/deposit/mob-cash/agent?admin_id=${search}`, // Change the endpoint its just demo purpose
      includeAuth: true,
      data: [],
    });

    if (agents) {
      setAgents(agents);
    }
  };

  useEffect(() => {
    if (search?.length > 3) {
      getAgents();
    }
  }, [search]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 mx-auto">
          <Card header="Mob Cash agent in your region">
            <AlertCard message="Recomanded Mob/Cash agents" />
            <div className="mt-3">
              <Form.Control
                type="text"
                name="search"
                placeholder="Search Agent by Agent ID"
                onChange={(e) => setSearch(e?.target?.value)}
              />

              <div className="show-agents-list">
                {agents?.map((item, index) => (
                  <Link
                    className="single-agent-for-deposit"
                    key={`mob-agent${index}`}
                    href={`https://${item?.telegram_link}`}
                  >
                    <span>Agent: {item?.identity}</span>
                    <span>address: {item?.address}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobCashAgent;
