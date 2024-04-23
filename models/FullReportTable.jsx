"use client"
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const FullReportTable =  ({
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
          name: "Registrations",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "New depositors	",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Total deposit amount",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Bonus Amount",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Company Profit	",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Commission amount",
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

export default FullReportTable