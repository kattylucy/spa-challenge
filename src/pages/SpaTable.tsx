import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useFetchOrdersQuery,
  useDeleteOrdersMutation,
} from "src/app/redux/api/ordersApi";
import { toast } from "react-toastify";
import { SearchInput } from "src/components/SearchInput";
import { ButtonComponent } from "src/components/Button";
import { Table } from "src/components/Table";
import { Modal } from "src/components/Modal";
import { Order } from "src/app/types/OrdersTypes";
import { OrderTypeDropdown } from "./OrderTypeDrodpown";
import { CreateNewOrder } from "./CreateNewOrder";

interface TableProps {}

const TableHeader = styled.div(({ theme: { colors, device } }) => ({
  borderBottom: `1px solid ${colors.border}`,
  display: "flex",
  padding: 20,
  "& > button": {
    marginLeft: 20,
  },
  "& > button:nth-of-type(even)": {
    marginRight: 20,
  },
  [`@media ${device.tablet}`]: {
    flexDirection: "column",
    "& > button": {
      margin: "12px 0px",
    },
    "& > button:nth-of-type(even)": {
      marginRight: 0,
      marginTop: 0,
    },
    ".MuiOutlinedInput-root": {
      width: "100%",
    },
  },
}));

const SpaTablePage = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Loader = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "10%",
});

export const SpaTable: React.FC<TableProps> = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<string>("");
  const { data, isError, isLoading } = useFetchOrdersQuery(orderType);
  const [orders, setOrders] = useState<Order[] | undefined>([]);

  const [deleteOrders] = useDeleteOrdersMutation();

  useEffect(() => {
    setOrders(data || []);
  }, [data, setOrders]);

  const onSelect = useCallback(
    (type: string) => {
      setOrderType(`/ByType?orderType=${type}`);
    },
    [setOrderType]
  );

  const deleteSelected = useCallback(async () => {
    try {
      await deleteOrders(selectedOrders);
      toast.success("Orders deleted.");
    } catch (error) {
      toast.error("Something went wrong while deleting your order.");
    }
  }, [selectedOrders]);

  const toggleModal = useCallback(() => {
    setVisible((visible) => !visible);
  }, [setVisible]);

  const setOrderSelection = useCallback(
    (orders: Array<string>) => setSelectedOrders(orders),
    [setSelectedOrders]
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (value === "") {
        setOrders(data);
      } else {
        const filtered = (orders as Order[]).filter((order: Order) => {
          return order.customerName.toLowerCase().includes(value);
        });
        setOrders(filtered);
      }
    },
    [data, orders]
  );

  return (
    <SpaTablePage>
      <TableHeader>
        <SearchInput onChange={handleSearch} placeholder="Customer Search" />
        <ButtonComponent
          icon={<AddIcon />}
          onClick={toggleModal}
          label="CREATE ORDER"
        />
        <ButtonComponent
          icon={<DeleteIcon />}
          label="DELETE SELECT"
          onClick={deleteSelected}
        />
        <OrderTypeDropdown onSelect={onSelect} />
      </TableHeader>
      {!isLoading ? (
        <Table
          data={orders || []}
          error={isError}
          loading={isLoading}
          setData={setOrderSelection}
        />
      ) : (
        <Loader>
          <CircularProgress />
        </Loader>
      )}
      <Modal toggleModal={toggleModal} visible={visible}>
        <CreateNewOrder toggleModal={toggleModal} />
      </Modal>
    </SpaTablePage>
  );
};
