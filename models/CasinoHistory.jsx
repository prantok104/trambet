import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { FaEye } from "react-icons/fa6";
const CasinoHistory = ({
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
  const handleButtonClick = (session_id) => {
    console.log(session_id);
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
    </div>
  );
};
export default CasinoHistory;
