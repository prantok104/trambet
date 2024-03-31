import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
const DepositHistory = ({
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
        name: "Gateway",
        selector: (row) => row?.year,
        sortable: true,
      },
      {
        name: "TRX. No.",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Amount",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Deposit No",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Status",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Initiated",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Details",
        selector: (row) => row?.year,
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
export default DepositHistory;
