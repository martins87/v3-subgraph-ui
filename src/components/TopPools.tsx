import { useQuery } from "@apollo/client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GET_TOP_POOLS } from "../dataModels";

const headerTitles: string[] = ["Pool", "TVL", "Volume 24H"];

type TokenSymbol = {
  symbol: string;
};

type PoolData = {
  id: string;
  totalValueLockedUSD: string;
  token0: TokenSymbol;
  token1: TokenSymbol;
};

const TopPools = () => {
  const { loading, error, data } = useQuery(GET_TOP_POOLS);

  // console.log("[Pools]:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleReload = () => {
    console.log("reloading data...");
  };

  return (
    <>
      <Container>
        <Box
          sx={{ marginTop: "2rem", marginBottom: "-2rem" }}
          textAlign={"center"}
        >
          <Button variant="contained" onClick={handleReload}>
            Reload data
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ margin: "3rem", marginLeft: 0 }}
        >
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headerTitles.map((title: string, index: number) => (
                  <TableCell key={title + index}>
                    <Typography variant="h6">{title}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.pools.map((pool: PoolData) => (
                <TableRow
                  key={pool.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      href={"https://info.uniswap.org/#/pools/" + pool.id}
                      target="_blank"
                      rel="noopener"
                    >
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {+pool.totalValueLockedUSD}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    ?
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TopPools;
