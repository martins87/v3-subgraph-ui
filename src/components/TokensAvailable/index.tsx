import { useState } from "react";
import { useQuery } from "@apollo/client";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { GET_TOKENS_AVAILABLE } from "../../queries";
import TokensTable from "./TokensTable";
import Pagination from "../Table/Pagination";

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

      <Pagination
        paginate={paginate}
        totalRows={data.tokens.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default TokensAvailable;
