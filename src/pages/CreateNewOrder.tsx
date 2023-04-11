import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCreateOrderMutation } from "src/app/redux/api/ordersApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ButtonComponent } from "src/components/Button";
import { OrderTypeDropdown } from "./OrderTypeDrodpown";

interface CreateNewOrderProps {
  toggleModal: () => void;
}

const Label = styled.p({
  fontWeight: 500,
  margin: "0px 0px 4px 0px",
});

const InputWrapper = styled.div({
  margin: "14px 0px",
  ".MuiInputBase-root": {
    height: "2.3rem",
    padding: 0,
    width: "100%",
  },
  button: {
    marginRight: 0,
  },
});

const StyledTextField = styled(TextField)({
  width: "100%",
});

const Body = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
});

const Actions = styled(DialogActions)({
  padding: "0px 24px",
  marginBottom: 14,
  button: {
    width: "100%",
  },
});

export const CreateNewOrder = ({ toggleModal }: CreateNewOrderProps) => {
  const [createOrder] = useCreateOrderMutation();

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    createdByUserName: "Test",
    createdDate: "",
    orderType: "",
  });

  const disabled = Object.values(newOrder).some((value) => value === "");

  const create = useCallback(async () => {
    const id = uuid();
    try {
      await createOrder({ ...newOrder, orderId: id });
      toast.success("Order was created.", { autoClose: 9000 });
    } catch (error) {
      toast.error("Something went wrong while creating your order.");
    }

    toggleModal();
  }, [newOrder, toggleModal]);

  const update = useCallback((value: string | object | null, key: string) => {
    const newValue =
      key === "createdDate"
        ? format(new Date(value as string), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
        : value;
    setNewOrder((prev) => ({ ...prev, [key]: newValue }));
  }, []);

  return (
    <>
      <DialogTitle>Create New Order</DialogTitle>
      <Body>
        <InputWrapper>
          <Label>Customer Name</Label>
          <StyledTextField
            onChange={(e) => update(e.target.value, "customerName")}
            placeholder="Customer Name"
            type="text"
            variant="outlined"
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Order Type</Label>
          <OrderTypeDropdown onSelect={(type) => update(type, "orderType")} />
        </InputWrapper>
        <InputWrapper>
          <Label>Order Creation</Label>
          <DatePicker onChange={(date) => update(date, "createdDate")} />
        </InputWrapper>
      </Body>
      <Actions>
        <ButtonComponent
          onClick={toggleModal}
          label="Cancel"
          variant="outlined"
        />
        <ButtonComponent
          onClick={create}
          disabled={disabled}
          label="Create"
          variant="contained"
        />
      </Actions>
    </>
  );
};
