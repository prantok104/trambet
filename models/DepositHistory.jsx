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
        selector: (row) => row?.gateway,
        sortable: true,
      },
      {
        name: "Deposit No.",
        selector: (row) => row?.trx,
        sortable: false,
      },
      {
        name: "Amount",
        selector: (row) => row?.amount,
        sortable: false,
      },
      {
        name: "TRX. No.",
        selector: (row) => row?.deposit_no,
        sortable: false,
      },
      {
        name: "Status",
        selector: (row) => {
          if (row?.status === "1") {
            return 'Success';
          } else if (row?.status === "2") {
            return 'Pending';
          } else if (row?.status === "3") {
            return 'Cancel';
          } else {
            return 'Unknown status';
          }
        },
        sortable: false,
      },
      {
        name: "Initiated",
        selector: (row) => row?.initiated,
        sortable: false,
      },
      {
        name: "Details",
        selector: (row) => row?.details,
        sortable: false,
      },
    ],
    [rows]
  );

  // // console.log(rows?.paginationData?.totalItems);
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
            paginationTotalRows={rows?.paginationData?.totalItems}
            onChangeRowsPerPage={handlePageSizeChange}
            onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};
export default DepositHistory;
