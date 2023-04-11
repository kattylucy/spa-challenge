import styled from "@emotion/styled";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useState } from "react";

interface DropdownComponentProps {
  onSelect: (selected: string) => void;
  options: string[];
}

const Placeholder = styled.span(({ theme: { colors } }) => ({
  color: colors.disabled,
}));

export const DropdownComponent = ({
  onSelect,
  options,
}: DropdownComponentProps) => {
  const [selected, setSelected] = useState<string>("");

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof selected>) => {
      setSelected(event.target.value as string);
      onSelect(event.target.value as string);
    },
    [onSelect]
  );

  return (
    <Select
      displayEmpty
      value={selected}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={(selected) => {
        if (!selected) {
          return <Placeholder>Order Type</Placeholder>;
        }

        return selected;
      }}
      sx={{ width: 200, height: "2.3rem" }}
    >
      {options.map((name) => (
        <MenuItem key={name} value={name}>
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  );
};
