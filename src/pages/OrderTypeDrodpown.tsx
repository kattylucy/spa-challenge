import { DropdownComponent } from "src/components/Dropdown";

interface OrderTypeDropdownProps {
  onSelect: (value: string, type?: string) => void;
}

const orderTypes = ["Standard", "ReturnOrder", "TransferOrder", "SaleOrder"];

export const OrderTypeDropdown = ({ onSelect }: OrderTypeDropdownProps) => {
  return <DropdownComponent onSelect={onSelect} options={orderTypes} />;
};
