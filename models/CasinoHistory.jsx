import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo, useState } from "react";
import { notify, rowIndex } from "@/components/Helper";
import Loader from "@/components/Loader";
import { FaEye } from "react-icons/fa6";
import { Modal, Table } from "react-bootstrap";
import { getCasinoSession } from "@/services/casino";
const CasinoHistory = ({
  rows,
  isLoading,
  handlePageSizeChange,
  handlePageChange,
  page = {},
}) => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const columns = useMemo(
    () => [
      rowIndex(rows),
      {
        name: "Date time",
        selector: (row) => `${new Date(row.created_at).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })}`,
        sortable: true,
      },
      {
        name: "Session ID",
        selector: (row) => row?.session_id,
        sortable: false,
      },
      {
        name: "Game name",
        selector: (row) => row?.game_name,
        sortable: false,
      },
      {
        name: "Action",
        selector: (row) => (
          <>
            <button className="btn btn-sm btn-outline-primary" onClick={() => handleButtonClick(row?.session_id)}><FaEye /></button>
          </>
        ),
        sortable: false,
      }
    ],
    [rows]
  );
  const handleButtonClick = async (session_id) => {
    setShowModal(true);setLoading(true);
    const responseData = await getCasinoSession(session_id);
    if(responseData?.status){
      setDetails(responseData?.data);
      setLoading(false);
    }else{
      notify("error", "No data found right now.")
    }
  }
  return (
    <div>
      <div>
        <DataTableComponent
          title=""
          progressPending={isLoading}
          columns={columns}
          data={rows?.data}
          pagination
          paginationServer
          paginationTotalRows={rows?.total}
          onChangeRowsPerPage={handlePageSizeChange}
          onChangePage={handlePageChange}
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Casino Session history</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>BetInfo</th>
                <th>GameId</th>
                <th>GameName</th>
                <th>Before</th>
                <th>Bet</th>
                <th>Win</th>
                <th>Datetime</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : (
                details?.content?.log?.map((item, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{item?.id}</td>
                    <td>{item?.BetInfo}</td>
                    <td>{item?.gameId}</td>
                    <td>{item?.gameName}</td>
                    <td>{item?.before}</td>
                    <td>{item?.bet}</td>
                    <td>{item?.win}</td>
                    <td>{item?.dateTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CasinoHistory;
