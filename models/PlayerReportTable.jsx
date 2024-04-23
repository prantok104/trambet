"use client"
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const PlayerReportTable = ({
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
          name: "Website ID	",
          selector: (row) => row?.year,
          sortable: true,
        },
        {
            name: "Website",
            selector: (row) => row?.year,
            sortable: false,
          },
        {
          name: "SubId",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Player ID",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Registration Date",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Country",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Currency",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Sum of all deposit",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Company Profit Total",
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
}

export default PlayerReportTable