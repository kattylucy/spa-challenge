import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface TextFieldProps {
  onChange: (value: string) => void;
  placeholder: string;
}

const StyledInputAdorment = styled(InputAdornment)(({ theme: { colors } }) => ({
  "& > button": {
    background: colors.secondary,
    borderRadius: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    height: "2.2rem",
    marginRight: 0,
    ":hover": {
      background: colors.secondary,
    },
    "& > svg": {
      color: "white",
    },
  },
}));

const StyledOutlineInput = styled(OutlinedInput)({
  paddingRight: 0,
  outline: "none",
  "& > input": {
    height: "1.2rem",
  },
});

export const SearchInput = ({
  onChange,
  placeholder,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState<string>("");

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const onSearch = useCallback(() => {
    onChange(value.toLowerCase());
  }, [value, onChange]);

  return (
    <StyledOutlineInput
      endAdornment={
        <StyledInputAdorment position="end">
          <IconButton onClick={onSearch} edge="end">
            <SearchIcon />
          </IconButton>
        </StyledInputAdorment>
      }
      id="filled-text-field"
      onChange={onInputChange}
      placeholder={placeholder}
      size="small"
      type="search"
      value={value}
      {...props}
    />
  );
};
