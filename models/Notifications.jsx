"use client";
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo, useState } from "react";
import { rowIndex } from "@/components/Helper";
import { Modal } from "react-bootstrap";

const NotificationTable = ({
  rows,
  isLoading,
  handlePageSizeChange,
  handlePageChange,
  page = {},
}) => {

   const [modal, setModal] = useState(false);
   const [data, setData] = useState({});
   const handleNotification = (row) => {
      setModal(true);
      setData(row);
   }



  const columns = useMemo(
    () => [
      rowIndex(rows),
      {
        name: "Notification",
        selector: (row) => (
          <span
            style={{
              color: row?.is_read ? "#fff" : "#23B260",
              cursor: "pointer",
            }}
            onClick={() => handleNotification(row)}
          >
            {row?.title}
          </span>
        ),
        sortable: false,
        minWidth: "80%",
      },
      {
        name: "Date time",
        selector: (row) => row?.date,
        sortable: false,
        minWidth: "12%",
      },
    ],
    [rows]
  );

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
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="font-14">Notification</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{data?.title}</Modal.Body>
      </Modal>
    </div>
  );
};

export default NotificationTable;
