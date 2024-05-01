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
        selector: (row) => row?.currency,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row?.date,
        sortable: false,
      },
      {
        name: "Payout",
        selector: (row) => row?.payout,
        sortable: false,
      },
      {
        name: "Revenue",
        selector: (row) => row?.revenue,
        sortable: false,
      },
      {
        name: "Balance",
        selector: (row) => row?.balance,
        sortable: false,
      },
      {
        name: "Status",
        selector: (row) => <span dangerouslySetInnerHTML={{ __html: row?.status }} ></span>,
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
