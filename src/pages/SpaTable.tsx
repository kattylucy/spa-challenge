import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchOrders } from "src/app/requests/ordersRequest";
import { SearchInput } from "src/components/SearchInput";
import { ButtonComponent } from "src/components/Button";
import { Table } from "src/components/Table";
import { Modal } from "src/components/Modal";
import { Orders } from "src/app/types/OrdersTypes";
import { OrderTypeDropdown } from "./OrderTypeDrodpown";
import { CreateNewOrder } from "./CreateNewOrder";

interface TableProps {}

const TableHeader = styled.div(({ theme: { colors } }) => ({
  borderBottom: `1px solid ${colors.border}`,
  display: "flex",
  padding: 20,
  "& > button": {
    marginLeft: 20,
  },
  "& > button:nth-of-type(even)": {
    marginRight: 20,
  },
}));

const SpaTablePage = styled.div({
  display: "flex",
  flexDirection: "column",
});

export const SpaTable: React.FC<TableProps> = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const { data, loading, error } = useSelector(
    (state: { orders: Orders }) => state.orders
  );

  const onSelect = useCallback(
    (type: string) => {
      dispatch(fetchOrders(`/ByType?orderType=${type}`));
    },
    [dispatch]
  );

  const deleteOrders = useCallback(() => {
    // dispatch(deleteOrders(selectedOrders));
  }, [selectedOrders]);

  const toggleModal = useCallback(() => {
    setVisible((visible) => !visible);
  }, [setVisible]);

  const setOrderSelection = useCallback(
    (orders: Array<string>) => setSelectedOrders(orders),
    [setSelectedOrders]
  );

  useEffect(() => {
    dispatch(fetchOrders(""));
  }, [dispatch]);

  return (
    <SpaTablePage>
      <TableHeader>
        <SearchInput
          onChange={() => console.log("a")}
          placeholder="Customer Search"
        />
        <ButtonComponent
          icon={<AddIcon />}
          onClick={toggleModal}
          label="CREATE ORDER"
        />
        <ButtonComponent
          icon={<DeleteIcon />}
          label="DELETE SELECT"
          onClick={deleteOrders}
        />
        <OrderTypeDropdown onSelect={onSelect} />
      </TableHeader>
      <Table
        data={data}
        error={error}
        loading={loading}
        setData={setOrderSelection}
      />
      <Modal toggleModal={toggleModal} visible={visible}>
        <CreateNewOrder toggleModal={toggleModal} />
      </Modal>
    </SpaTablePage>
  );
};
