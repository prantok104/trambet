"use client";
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo, useState } from "react";
import { rowIndex } from "@/components/Helper";
import { Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { notificationRead } from "@/services/notification";

const NotificationTable = ({
  rows,
  isLoading,
  handlePageSizeChange,
  handlePageChange,
  page = {},
  setMuted,
}) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});
  const [change, setChange] = useState(true);
  const handleNotification = async (row) => {
    setModal(true);
    await handleNotificationRead(row?.id);
    setMuted((prevState) => !prevState);
    setData(row);
  };

  const handleNotificationRead = async (id) => {
    const resposneData = await notificationRead(id);
  };

  const columns = useMemo(
    () => [
      rowIndex(rows),
      {
        name: "Notification",
        selector: (row) => (
          <span
            style={{
              color: row?.is_read != "0" ? "#fff" : "#23B260",
              cursor: "pointer",
            }}
            onClick={() => handleNotification(row)}
          >
            {row?.title}
          </span>
        ),
        sortable: false,
        minWidth: "75%",
      },
      {
        name: "Date time",
        selector: (row) => dayjs(row?.created_at).format("DD MMM, YYYY hh:mm"),
        sortable: false,
        minWidth: "15%",
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
