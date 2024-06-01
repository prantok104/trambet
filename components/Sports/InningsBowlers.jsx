import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { API_HOST, notify } from '../Helper';
import CricketPlayerDetails from './CricketPlayerDetails';

const InningsBowlers = ({data = []}) => { 
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
    <div className="cricket-bowlers-innig">
      <h6 className="df-font text-capitalize mb-2">Bowlers statistics</h6>
      <table className="table table-responsive table-dark table-striped">
        <thead>
          <tr>
            <th>Bowler</th>
            <th>Overs</th>
            <th>Maidens</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Dots</th>
            <th>No Balls</th>
            <th>Wides</th>
            <th>Economy Rate</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? (
            data?.map((data, index) => (
              <tr key={`innings_bowlers_${index}`}>
                <td>
                  <span onClick={() => handleProfileShow(data?.profileid)}>
                    {data.bowler}
                  </span>
                </td>
                <td>{data.o}</td>
                <td>{data.m}</td>
                <td>{data.r}</td>
                <td>{data.w}</td>
                <td>{data.dots}</td>
                <td>{data.nb}</td>
                <td>{data.wd}</td>
                <td>{data.er}</td>
              </tr>
            ))
          ) : (
            <tr key={`innings_bowlers_1`}>
              <td>
                <span onClick={() => handleProfileShow(data?.profileid)}>
                  {data.bowler}
                </span>
              </td>
              <td>{data.o}</td>
              <td>{data.m}</td>
              <td>{data.r}</td>
              <td>{data.w}</td>
              <td>{data.dots}</td>
              <td>{data.nb}</td>
              <td>{data.wd}</td>
              <td>{data.er}</td>
            </tr>
          )}
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
}

export default InningsBowlers