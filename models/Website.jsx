import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { FaEdit, FaTrash } from "react-icons/fa";

const Website = ({
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
        name: "Website Id",
        selector: (row) => row?.websiteId,
        sortable: true,
      },
      {
        name: "Website",
        selector: (row) => row?.website,
        sortable: false,
      },
      {
        name: "Status",
        selector: (row) => <span class={`badge ${row?.status == 1 ? 'bg-success' : 'bg-danger'}`}>{row?.status == 1 ? 'Active' : 'Inactive'}</span>,
        sortable: false,
      },
      {
        name: "Create At",
        selector: (row) => `${new Date(row.created_at).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        })}`,
        sortable: false,
      },
      {
        name: "Action",
        selector: (row) => (
          <div className="d-flex justify-content-center gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm d-flex justify-content-center"
            >
              <FaEdit />
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-sm d-flex justify-content-center"
            >
              <FaTrash />
            </button>
          </div>
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
};

export default Website;
