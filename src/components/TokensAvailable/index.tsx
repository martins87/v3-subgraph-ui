import { useState } from "react";
import { useQuery } from "@apollo/client";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";

import { GET_TOKENS_AVAILABLE } from "../../queries";
import TokensTable from "./TokensTable";

const TokensAvailable = () => {
  const { loading, error, data } = useQuery(GET_TOKENS_AVAILABLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, _] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginate = (pageNumber: number) => {
    let nextPage: number =
      pageNumber < 1
        ? 1
        : pageNumber > Math.ceil(data.tokens.length / rowsPerPage)
        ? Math.ceil(data.tokens.length / rowsPerPage)
        : pageNumber;
    setCurrentPage(nextPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <TokensTable
        tokens={data.tokens.slice(indexOfFirstRow, indexOfLastRow)}
      />

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
            Page {currentPage} of {Math.ceil(data.tokens.length / rowsPerPage)}
          </Typography>
        </Grid>
        <Grid></Grid>
        <IconButton onClick={() => paginate(currentPage + 1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default TokensAvailable;
