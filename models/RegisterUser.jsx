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
        name: "User ID",
        selector: (row) => row?.better_user?.user_id,
        sortable: true,
      },
      {
        name: "Promo Code",
        selector: (row) => row?.promo?.promo_code,
        sortable: false,
      },
      {
        name: "Percentage",
        selector: (row) => row?.promo?.promo_percentage + "%",
        sortable: false,
      },
      {
        name: "Register Date",
        selector: (row) => `${new Date(row?.better_user?.created_at).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        })}`,
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
