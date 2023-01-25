import { FC } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { timeDiff, formatUSD, priceChange } from "../../utils";
import { TokenData } from "../../dataModels";
import V3Button from "../Button";

const headerTitles: string[] = [
  "Name",
  "Price",
  "Price Change",
  "Volume 24H",
  "TVL",
  "Time",
];

const TCell: FC<any> = ({ element }) => {
  return (
    <TableCell component="th" scope="row">
      <Typography color="#606060">{element}</Typography>
    </TableCell>
  );
};

export const TokensTable: FC<any> = ({ tokens }) => {
  const handleReload = () => console.log("reloading data...");

  return (
    <>
      <Container>
        <Grid container sx={{ marginTop: "2rem", marginBottom: "-2.5rem" }}>
          <Grid item sx={{ flex: 1 }}>
            <Typography fontWeight="bold" color="#606060">
              Tokens Available
            </Typography>
          </Grid>
          <Grid item>
            <V3Button handleClick={handleReload} />
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
              {tokens.map((token: TokenData) => (
                <TableRow key={token.id}>
                  <TCell
                    element={
                      <Link
                        sx={{ color: "rgb(252, 7, 125)" }}
                        href={"https://info.uniswap.org/#/tokens/" + token.id}
                        underline="none"
                        target="_blank"
                        rel="noopener"
                      >
                        {token.name} ({token.symbol})
                      </Link>
                    }
                  />
                  <TCell element={formatUSD(+token.tokenDayData[0].priceUSD)} />
                  <TCell
                    element={priceChange(
                      +token.tokenDayData[0].open,
                      +token.tokenDayData[0].close
                    )}
                  />
                  <TCell
                    element={formatUSD(+token.tokenDayData[0].volumeUSD)}
                  />
                  <TCell element={formatUSD(+token.totalValueLockedUSD)} />
                  <TCell
                    element={timeDiff(new Date(), token.tokenDayData[0].date)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TokensTable;
