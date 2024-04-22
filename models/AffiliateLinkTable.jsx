"use client"
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { FaCopy } from "react-icons/fa";

const AffiliateLinkTable = ({
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
          name: "Website",
          selector: (row) => row?.year,
          sortable: true,
        },
        {
            name: "Status",
            selector: (row) => <span class="badge bg-success">Active</span>,
            sortable: false,
          },
        {
          name: "Landing Page",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "SubId",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Generated link	",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Currency",
          selector: (row) => row?.year,
          sortable: false,
        },
        {
          name: "Action",
          selector: (row) => (
            <FaCopy className="text-primary"/>
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

export default AffiliateLinkTable