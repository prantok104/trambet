import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { FaCopy } from "react-icons/fa";

const AffiliateLink = ({
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
        cell: (row) => row?.aff_website,
        sortable: false,
        minWidth: "200px",
      },
      {
        name: "Status",
        selector: (row) => (
          <span
            class={`badge ${row?.status == 1 ? "bg-success" : "bg-danger"}`}
          >
            {row?.status == 1 ? "Active" : "Inactive"}
          </span>
        ),
        sortable: false,
      },
      {
        name: "Landing Page",
        selector: (row) => row?.landing_page,
        sortable: false,
      },
      {
        name: "SubId",
        selector: (row) => row?.subid,
        sortable: false,
      },
      {
        name: "Generated link",
        cell: (row) => row?.linkgenarate,
        sortable: false,
        minWidth: "380px",
      },
      {
        name: "Currency",
        selector: (row) => row?.currency,
        sortable: false,
      },
      {
        name: "Action",
        selector: (row) => <FaCopy className="text-primary" />,
        sortable: false,
      },
    ],
    [rows]
  );
  // console.log(rows);
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

export default AffiliateLink;
