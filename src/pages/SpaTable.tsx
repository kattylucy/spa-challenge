import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchOrdersQuery } from "src/app/redux/api/ordersApi";
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
  const [visible, setVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<string>("");
  const { data, error, isLoading } = useFetchOrdersQuery(orderType);

  const onSelect = useCallback(
    (type: string) => {
      setOrderType(`/ByType?orderType=${type}`);
    },
    [setOrderType]
  );

  const deleteSelected = useCallback(async () => {}, [selectedOrders]);

  const toggleModal = useCallback(() => {
    setVisible((visible) => !visible);
  }, [setVisible]);

  const setOrderSelection = useCallback(
    (orders: Array<string>) => setSelectedOrders(orders),
    [setSelectedOrders]
  );

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
          onClick={deleteSelected}
        />
        <OrderTypeDropdown onSelect={onSelect} />
      </TableHeader>
      <Table
        data={data}
        error={error}
        loading={isLoading}
        setData={setOrderSelection}
      />
      <Modal toggleModal={toggleModal} visible={visible}>
        <CreateNewOrder toggleModal={toggleModal} />
      </Modal>
    </SpaTablePage>
  );
};
