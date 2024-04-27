
import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const ApplicationsList = ({
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
        name: "Application Date",
        selector: (row) => row?.date,
        sortable: false,
      },
      {
        name: "Description",
        selector: (row) => row?.description,
        sortable: false,
      },

      {
        name: "Status",
        selector: (row) => row?.status,
        sortable: false,
      },
      {
        name: "Action",
        selector: (row) => row?.date,
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
          
          paginationTotalRows={rows?.total}
          onChangeRowsPerPage={handlePageSizeChange}
          onChangePage={handlePageChange}
          
        />
      </div>
    </div>
  );
};

export default ApplicationsList;
