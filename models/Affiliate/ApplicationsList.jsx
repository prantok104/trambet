
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
        selector: (row) => `${new Date(row.created_at).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        })}`,
        sortable: false,
      },
      {
        name: "Description",
        selector: (row) => row?.description,
        sortable: false,
      },
      {
        name: "Website",
        selector: (row) => row?.website,
        sortable: false,
      },

      {
        name: "Status",
        selector: (row) => {
          const statusMap = {
            0: 'Pending',
            1: 'Approve',
            2: 'Reject',
          };
        
          return statusMap[row?.status];
        },
        sortable: false,
      },
      // {
      //   name: "Action",
      //   selector: (row) => row?.date,
      //   sortable: false,
      // },
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
