import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";

const RegisterUser = ({
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
        name: "User Details",
        selector: (row) => row?.year,
        sortable: true,
      },
      {
        name: "Promo Code",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Percentage",
        selector: (row) => row?.year,
        sortable: false,
      },
      {
        name: "Register Date",
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

export default RegisterUser;
