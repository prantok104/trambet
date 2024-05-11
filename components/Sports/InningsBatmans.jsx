import Link from 'next/link';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { API_HOST, notify } from '../Helper';
import axios from 'axios';

const InningsBatmans = ({data = []}) => {
  const [profileModal, setProfileModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [player, setPlayer] = useState({});
  const handleProfileShow = async (profileid) => {
    setProfileModal(true);
    setLoader(true);
    const endpoint = `${API_HOST}/cricket/profile?id=${profileid}&json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setPlayer(
            response?.data
          );
          setLoader(false);
        }
      })
      .catch((erros) => {
        notify("error", "Something went wrong.");
        setLoader(false);
      }); 
  }

  return (
    <>
      <div className="cricket-batsman-innig">
        <h6 className="df-font text-capitalize mb-2">Batsmans statistics</h6>
        <table className="table table-responsive table-dark table-striped">
          <thead className="thead-light">
            <tr>
              <th>Batsman</th>
              <th>Runs</th>
              <th>4s</th>
              <th>6s</th>
              <th>Dots</th>
              <th>Strike Rate</th>
              <th>Dismissal Type</th>
              <th>Bat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => (
              <tr key={`innings_batmans_${index}`}>
                <td>
                  <span onClick={() => handleProfileShow(data?.profileid)}>
                    {data.batsman}
                  </span>
                </td>
                <td>{data.r}</td>
                <td>{data.s4}</td>
                <td>{data.s6}</td>
                <td>{data.dots}</td>
                <td>{data.sr}</td>
                <td>{data.dismissal_type}</td>
                <td>{data.bat ? "Yes" : "No"}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registration modal area start */}
      <Modal
        show={profileModal}
        onHide={() => setProfileModal(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Player Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          hi
        </Modal.Body>
      </Modal>
      {/* Registration modal area end */}
    </>
  );
}

export default InningsBatmans