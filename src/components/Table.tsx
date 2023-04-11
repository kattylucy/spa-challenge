import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styled from "@emotion/styled";

interface Order {
  orderId: string;
  createdDate: string;
  createdByUserName: string;
  orderType: string;
  customerName: string;
}

interface TableProps {
  data: Order[];
  error: boolean;
  loading: string;
}

const TableWrapper = styled.div({
  width: "100%",
  "& > .MuiDataGrid-withBorderColor": {
    borderColor: "transparent",
    height: "50vh",
    fontWeight: 500,
  },
});

const columns: GridColDef[] = [
  { field: "orderId", headerName: "Order ID", width: 160 },
  { field: "createdDate", headerName: "Creation Date", width: 210 },
  { field: "createdByUserName", headerName: "Created By", width: 160 },
  { field: "orderType", headerName: "Order Type", width: 160 },
  { field: "customerName", headerName: "Customer", width: 160 },
];

export const Table = ({ data, error, loading, ...props }: TableProps) => {
  const rows = data.map((row) => ({ id: row.orderId, ...row }));

  if (loading) return <p>loading...</p>;

  return (
    <TableWrapper {...props}>
      <DataGrid rows={rows} columns={columns} checkboxSelection />
    </TableWrapper>
  );
};
