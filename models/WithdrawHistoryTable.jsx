"use client"
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const WithdrawHistoryTable = ({
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
        name: "Currency",
        selector: (row) => row?.year,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Payout",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Revenue",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Balance",
        selector: (row) => <span class="badge bg-warning">Active</span>,
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

export default WithdrawHistoryTable;
