import { FC } from "react";

import Button from "@mui/material/Button";

type V3ButtonProps = {
  handleClick: any;
};

const V3Button: FC<V3ButtonProps> = ({ handleClick }) => {
  return (
    <Button
      sx={{
        background: "#E8E8E8",
        color: "#000",
        fontWeight: "bold",
        textTransform: "none",
        "&:hover": {
          background: "#000",
          color: "#E8E8E8",
        },
      }}
      variant="contained"
      onClick={handleClick}
      disabled={true}
    >
      Reload data
    </Button>
  );
};

export default V3Button;
