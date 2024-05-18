import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { API_HOST, notify } from "../Helper";
import axios from "axios";
import Image from "next/image";
import CricketPlayerDetails from "./CricketPlayerDetails";

const SquadsPlayerForCricket = ({ team, item = {} }) => {
  const [profileModal, setProfileModal] = useState(false);
  const [player, setPlayer] = useState({});
  const [loader, setLoader] = useState(true);
  const handleProfileShow = async (profileid) => {
    setProfileModal(true);
    setLoader(true);
    const endpoint = `${API_HOST}/cricket/profile?id=${profileid}&json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setPlayer(response?.data?.players?.player);
          setLoader(false);
        }
      })
      .catch((erros) => {
        notify("error", "Something went wrong.");
        setLoader(false);
      });
  };
  return (
    <div className="cricket-batsman-innig">
      <h6 className="df-font text-capitalize mb-2">{team}</h6>
      <table className="table table-responsive table-dark table-striped">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ODI</th>
            <th>Role</th>
            <th>T20</th>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>
          {item?.map((data, index) => (
            <tr key={`cricket_squads_${index}`}>
              <td>{++index}</td>
              <td>
                <span onClick={() => handleProfileShow(data?.name)}>
                  {data.id}
                </span>
              </td>
              <td>{data.odi ? "Yes" : "No"}</td>
              <td>{data.role}</td>
              <td>{data.t20 ? "Yes" : "No"}</td>
              <td>{data.test ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Registration modal area start */}
      <Modal
        show={profileModal}
        onHide={() => setProfileModal(false)}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Player Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CricketPlayerDetails loading={loader} data={player} />
        </Modal.Body>
      </Modal>
      {/* Registration modal area end */}
    </div>
  );
};

export default SquadsPlayerForCricket;
