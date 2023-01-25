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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { GET_TOP_POOLS } from "../queries";
import { PoolData } from "../dataModels";
import { formatUSD, timeDiff } from "../utils";

const headerTitles: string[] = ["Pool", "TVL", "Volume 24H", "Time"];

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
        <Grid container sx={{ marginTop: "2rem", marginBottom: "-2.5rem" }}>
          <Grid item sx={{ flex: 1 }}>
            <Typography fontWeight="bold" color="#606060">
              Top Pools
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleReload}
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
            >
              Reload data
            </Button>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            margin: "3rem",
            marginLeft: 0,
            background: "#E8E8E8",
            borderRadius: "1rem",
          }}
        >
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headerTitles.map((title: string, index: number) => (
                  <TableCell key={title + index}>
                    <Typography fontWeight="bold" color="#606060">
                      {title}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "#E8E8E8" }}>
              {data.pools.map((pool: PoolData) => (
                <TableRow
                  key={pool.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      href={"https://info.uniswap.org/#/pools/" + pool.id}
                      underline="none"
                      target="_blank"
                      rel="noopener"
                    >
                      <Typography color="rgb(252, 7, 125)">
                        {pool.token0.symbol}/{pool.token1.symbol}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography color="#606060">
                      {formatUSD(+pool.totalValueLockedUSD)}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography color="#606060">
                      {formatUSD(+pool.poolDayData[0].volumeUSD)}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography color="#606060">
                      {timeDiff(new Date(), +pool.poolDayData[0].date)}
                    </Typography>
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
