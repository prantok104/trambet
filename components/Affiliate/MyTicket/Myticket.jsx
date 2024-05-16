import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import Link from "next/link";

const Myticket = ({
  rows,
  isLoading,
  handlePageSizeChange,
  handlePageChange,
  page = {},
}) => {
  const columns = useMemo(
    () => [
      rowIndex(rows),
      {
        name: "Subject",
        selector: (row) => row?.subject,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => (
          <span
            class={`badge ${row?.status == "1" ? "bg-success" : "bg-danger"}`}
          >
            {row?.status == "1" ? "Open" : "Close"}
          </span>
        ),
        sortable: false,
      },
      {
        name: "Priority",
        selector: (row) => (
          <span
            class={`badge ${row?.status == "1" ? "bg-success" : "bg-danger"}`}
          >
            {row?.status == "1" ? "High" : "Low"}
          </span>
        ),
        sortable: false,
      },
      {
        name: "Last Reply",
        selector: (row) => row?.last_reply,
        sortable: true,
      },
      {
        name: "Action",
        selector: (row) => (
          <div className="d-flex justify-content-center gap-2">
            <Link href={`/user/support/ticket/message/${row?.ticket}`}>
              <button
                className="btn btn-primary btn-sm d-flex justify-content-center"
              >
                <RiComputerLine />
              </button>
            </Link>
          </div>
        ),
        sortable: false,
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
          data={rows}
          pagination
          paginationServer
          paginationTotalRows={rows?.total}
          onChangeRowsPerPage={handlePageSizeChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Myticket;
