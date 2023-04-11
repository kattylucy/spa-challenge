import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ButtonComponent } from "src/components/Button";
import { postOrder } from "src/app/requests/postOrder";
import { Order } from "src/app/types/OrdersTypes";
import { OrderTypeDropdown } from "./OrderTypeDrodpown";

interface CreateNewOrderProps {
  toggleModal: () => void;
}

export const CreateNewOrder = ({ toggleModal }: CreateNewOrderProps) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const [newOrder, setNewOrder] = useState<Order>({
    customerName: "",
    createdByUserName: "Test",
    createdDate: "",
    orderId: "",
    orderType: "",
  });

  const create = useCallback(() => {
    const id = uuid();
    dispatch(postOrder({ ...newOrder, orderId: id }));
    toggleModal();
  }, [newOrder, dispatch, postOrder]);

  const update = useCallback(
    (value: any, key: string) => {
      const newValue =
        key === "createdDate"
          ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
          : value;
      setNewOrder({ ...newOrder, [key]: newValue });
    },
    [newOrder]
  );

  return (
    <>
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="customerName"
          label="Customer Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            update(e.target.value, "customerName")
          }
          type="text"
          variant="standard"
        />
        <OrderTypeDropdown
          onSelect={(type: string) => update(type, "orderType")}
        />
        <DatePicker
          onChange={(date: object | null) => update(date, "createdDate")}
        />
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          onClick={toggleModal}
          label="Cancel"
          variant="outlined"
        />
        <ButtonComponent
          onClick={create}
          label="Create Order"
          variant="contained"
        />
      </DialogActions>
    </>
  );
};
