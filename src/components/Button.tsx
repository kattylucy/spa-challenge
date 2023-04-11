import Button from "@mui/material/Button";
import styled from "@emotion/styled";

interface ButtonComponentProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  variant: any;
}

export const ButtonComponent = ({
  disabled,
  icon,
  label,
  onClick,
  variant,
}: ButtonComponentProps) => {
  const withIcon = !!icon ? icon : undefined;
  return (
    <Button
      disabled={disabled}
      disableElevation
      onClick={onClick}
      startIcon={withIcon}
      variant={variant}
    >
      {label}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  variant: "contained",
};
