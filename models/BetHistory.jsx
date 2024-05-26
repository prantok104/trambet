import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo } from "react";
import { rowIndex } from "@/components/Helper";
const BetHistoryModel = ({
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
        name: "Type",
        selector: (row) => row?.type,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row?.category,
        sortable: true,
      },
      {
        name: "Bet Number",
        selector: (row) => row?.bet_number,
        sortable: false,
      },
      {
        name: "League",
        selector: (row) => row?.leauge,
        sortable: false,
        minWidth: "150px",
      },
      {
        name: "Team One",
        selector: (row) => row?.team_one,
        sortable: false,
        minWidth: "150px",
      },
      {
        name: "Team Two",
        selector: (row) => row?.team_two,
        sortable: false,
        minWidth: "150px",
      },
      {
        name: "Stake",
        selector: (row) => row?.stake_amount,
        sortable: false,
      },
      {
        name: "Return",
        selector: (row) => row?.return_amount,
        sortable: false,
      },
      {
        name: "Odds",
        selector: (row) => row?.odds,
        sortable: false,
      },
      {
        name: "Odds Name",
        selector: (row) => row?.odd_name,
        sortable: false,
        minWidth: "120px",
      },
      {
        name: "Result time",
        selector: (row) => row?.result_time,
        sortable: false,
      },
      {
        name: "Stauts",
        selector: (row) => row?.status,
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
export default BetHistoryModel;
