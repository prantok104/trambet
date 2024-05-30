import DataTableComponent from "@/components/DataTableComponent";
import React, { useMemo, useState } from "react";
import { rowIndex } from "@/components/Helper";
import { Button, Modal, Table } from "react-bootstrap";
const BetHistoryModel = ({
  rows,
  isLoading,
  handlePageSizeChange,
  handlePageChange,
  page = {},
}) => {
   const [showModal, setModal] = useState(false);
   const [data, setData] = useState({});
   const handleMultiBetShow = (row) => {
      setModal(true);
      setData(row)
   }

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
        minWidth: "120px",
      },
      {
        name: "Bet Number",
        selector: (row) => row?.bet_number,
        sortable: false,
        minWidth: "150px",
      },
      {
        name: "Bet Count",
        selector: (row) =>
          row?.type == "Single" ? (
            "1"
          ) : (
            <span
              style={{ color: "#9E8FFF", cursor: "pointer" }}
              onClick={() => handleMultiBetShow(row)}
            >
              {row?.bet_details?.length}
            </span>
          ),
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
        selector: (row) => row?.odds_name,
        sortable: false,
        minWidth: "120px",
      },
      {
        name: "Result time",
        selector: (row) => row?.result_time,
        sortable: false,
      },
      {
        name: "Status",
        selector: (row) => {
          switch (row?.status) {
            case "1":
              return "Win";
            case "2":
              return "Pending";
            case "3":
              return "Lose";
            case "4":
              return "Refunded";
            default:
              return "Unknown";
          }
        },
        sortable: false,
      },
    ],
    [rows]
  );

  return (
    <>
      <div>
        <div>
          <DataTableComponent
            title=""
            progressPending={isLoading}
            columns={columns}
            data={rows?.data}
            pagination
            paginationServer
            paginationTotalRows={rows?.pagination?.totalItems}
            onChangeRowsPerPage={handlePageSizeChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Bets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table table-dark">
            <thead>
              <tr>
                <th>Category</th>
                <th>League</th>
                <th>Team One</th>
                <th>Team two</th>
                <th>Odds</th>
                <th>Stake</th>
              </tr>
            </thead>
            <tbody>
              {data?.bet_details?.map((item, index) =>
                item?.details ? (
                  <tr key={index}>
                    <th>{JSON.parse(item?.details).category}</th>
                    <th>{JSON.parse(item?.details).league}</th>
                    <th>{JSON.parse(item?.details).team1}</th>
                    <th>{JSON.parse(item?.details).team2}</th>
                    <th>{JSON.parse(item?.details).odds}</th>
                    <th>{JSON.parse(item?.details).stake_amount}</th>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default BetHistoryModel;
