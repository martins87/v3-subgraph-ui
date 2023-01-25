import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type PaginationProps = {
  paginate: any;
  totalRows: number;
  currentPage: number;
  rowsPerPage: number;
};

const Pagination: FC<PaginationProps> = ({
  paginate,
  totalRows,
  currentPage,
  rowsPerPage,
}) => {
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={1}>
      <Grid>
        <IconButton onClick={() => paginate(currentPage - 1)}>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid>
        <Typography
          sx={{
            display: "grid",
            alignItems: "center",
          }}
          color="#606060"
        >
          Page {currentPage} of {Math.ceil(totalRows / rowsPerPage)}
        </Typography>
      </Grid>
      <Grid></Grid>
      <IconButton onClick={() => paginate(currentPage + 1)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Grid>
  );
};

export default Pagination;
