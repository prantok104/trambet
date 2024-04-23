"use client";
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const SummeryTable = ({
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
        name: "Views",
        selector: (row) => row?.year,
        sortable: true,
      },
      {
        name: "Clicks",
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

export default SummeryTable;
