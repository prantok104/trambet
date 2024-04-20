import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
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
        selector: (row) => row?.year,
        sortable: true,
      },
      {
        name: "Session ID",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Game name",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Action",
        selector: (row) => row?.year,
        sortable: false,
      }
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
    </div>
  );
};
export default CasinoHistory;
