import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
import { RiComputerLine } from "react-icons/ri";
import Link from "next/link";
import dayjs from 'dayjs'
  const priority = [
    { name: "Low", value: 1, bg: "bg-danger" },
    { name: "Medium", value: 2, bg: "bg-warning" },
    { name: "High", value: 3, bg: "bg-primary" },
  ];
  const status = [
    { name: "Open", value: 0, bg: "bg-primary" },
    { name: "Answered", value: 1, bg: "bg-success" },
    { name: "Replied", value: 2, bg: "bg-primary" },
    { name: "Closed", value: 3, bg: "bg-danger" },
  ];

const Myticket = ({
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
        name: "Subject",
        selector: (row) => `[Ticket#${row?.ticket}] ${row?.subject}`,
        sortable: true,
        minWidth: "250px",
      },
      {
        name: "Status",
        selector: (row) => {
          const item = status?.find((_item) => _item.value == row?.status);
          return item ? (
            <span className={`badge ${item?.bg}`}>{item?.name}</span>
          ) : (
            ""
          );
        },
        sortable: false,
      },
      {
        name: "Priority",
        selector: (row) => {
          const item = priority?.find((_item) => _item.value == row?.priority);
          return item ? (
            <span className={`badge ${item?.bg}`}>{item?.name}</span>
          ) : (
            ""
          );
        },
        sortable: false,
      },
      {
        name: "Last Reply",
        selector: (row) => dayjs(row?.last_reply).format('DD MMM, YYYY hh:mm:s'),
        sortable: true,
      },
      {
        name: "Action",
        selector: (row) => (
          <div className="d-flex justify-content-center gap-2">
            <Link href={`/user/support/ticket/message/${row?.ticket}?page=user`}>
              <button className="btn btn-primary btn-sm d-flex justify-content-center">
                <RiComputerLine />
              </button>
            </Link>
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
          paginationTotalRows={rows?.paginationData?.totalItems}
          onChangeRowsPerPage={handlePageSizeChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Myticket;
