import DataTable, {createTheme} from 'react-data-table-component';
import React from 'react';
import Spinner from "react-bootstrap/Spinner";

createTheme('dark', {
  background: {
    default: 'transparent',
  },
});

//Custom style
const customStyles = {
    rows: {
        style: {
            '&:not(:last-child)': {
                borderBottom: 'none'
            },
            '&:nth-of-type(even)': {
                backgroundColor: '#303b58',
            },
            minHeight: '37px',
            fontSize:11
        }
    },
    headCells: {
        style: {
            backgroundColor: '#303B58',
            fontSize: '11px',
            color: '#fff',
            padding: '4px 20px',
            borderBottom: 'none'
        }
    }
};

export default function DataTableComponent({ ...config }) {
    return (
      <div
        suppressHydrationWarning={true}
      >
        <DataTable
          progressComponent={
            <div sx={{ height: "100px" }} suppressHydrationWarning={true}>
              <Spinner animation="border" variant="success" />
            </div>
          }
          {...config}
          customStyles={customStyles}
          paginationRowsPerPageOptions={
            config?.paginationRowsPerPageOptions ?? [
              10, 15, 20, 25, 50, 75, 100, 200, 300, 400, 500,
            ]
          }
          theme={'dark'}
        />
      </div>
    );
}