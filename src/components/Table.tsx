import { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";
import { Order } from "src/app/types/OrdersTypes";

interface TableProps {
  data: Array<Order> | undefined;
  error: boolean | null;
  loading: boolean;
  setData: (orders: Array<string>) => void;
}

const TableWrapper = styled.div({
  width: "100%",
  "& > .MuiDataGrid-withBorderColor": {
    borderColor: "transparent",
    height: "50vh",
    fontWeight: 500,
  },
});

const Loader = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "10%",
});

const columns: GridColDef[] = [
  { field: "orderId", headerName: "Order ID", width: 160 },
  { field: "createdDate", headerName: "Creation Date", width: 210 },
  { field: "createdByUserName", headerName: "Created By", width: 160 },
  { field: "orderType", headerName: "Order Type", width: 160 },
  { field: "customerName", headerName: "Customer", width: 160 },
];

export const Table = ({
  data,
  error,
  loading,
  setData,
  ...props
}: TableProps) => {
  const rows = data?.map((row) => ({ id: row.orderId, ...row }));

  const handleSelectionModelChange = useCallback(
    (selection: any) => {
      setData(selection);
    },
    [setData]
  );

  return (
    <TableWrapper {...props}>
      {!data || loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <DataGrid
          columns={columns}
          checkboxSelection
          loading={Boolean(loading)}
          rows={rows}
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      )}
    </TableWrapper>
  );
};
