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
import { Tooltip } from "@mui/material";

import {
  timeDiff,
  truncate,
  formatUSD,
  priceChange,
  reduceAddress,
} from "../../utils";
import { TransactionData } from "../../dataModels";
import V3Button from "../Button";

const headerTitles: string[] = [
  "Name",
  "Price",
  "Price Change",
  "Volume 24H",
  "TVL",
  "Time",
];

export type ReducedCellProps = {
  value: string;
  size: number;
};

const ReducedCellData: FC<ReducedCellProps> = ({ value, size }) => {
  return (
    <TableCell>
      <Tooltip title={value} placement="top">
        <Typography color="#606060">{truncate(value, size)}</Typography>
      </Tooltip>
    </TableCell>
  );
};

const TxRow: FC<TransactionData> = ({ id, timestamp, burns, mints, swaps }) => {
  let actionArray = null;
  let action: string = "";
  let conjunction: string = "and";
  if (burns.length > 0) {
    actionArray = burns;
    action = "Burn";
  } else if (swaps.length > 0) {
    actionArray = swaps;
    action = "Swap";
    conjunction = "for";
  } else if (mints.length > 0) {
    actionArray = mints;
    action = "Mint";
  }
  let fromAddress: string = actionArray[0].origin;
  let totalValue: string = actionArray[0].amountUSD;
  let token0: string = actionArray[0].token0.symbol;
  let token1: string = actionArray[0].token1.symbol;
  let amount0: string = actionArray[0].amount0;
  let amount1: string = actionArray[0].amount1;

  return (
    <>
      <TableCell component="th" scope="row">
        <Link href={"https://etherscan.io/tx/" + id} underline="none">
          <Typography color="rgb(252, 7, 125)">
            {`${action} ${token0} ${conjunction} ${token1}`}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={"https://etherscan.io/tx/" + fromAddress} underline="none">
          <Typography color="rgb(252, 7, 125)">
            {reduceAddress(fromAddress)}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography color="#606060">${(+totalValue).toFixed(2)}</Typography>
      </TableCell>
      <ReducedCellData value={token0 + " " + amount0} size={14} />
      <ReducedCellData value={token1 + " " + amount1} size={14} />
      <TableCell>
        <Typography color="#606060">
          {timeDiff(new Date(), timestamp)}
        </Typography>
      </TableCell>
    </>
  );
};

export const TransactionsTable: FC<any> = ({ transactions }) => {
  const handleReload = () => console.log("reloading data...");

  return (
    <>
      <Container>
        <Grid container sx={{ marginTop: "2rem", marginBottom: "-2.5rem" }}>
          <Grid item sx={{ flex: 1 }}>
            <Typography fontWeight="bold" color="#606060">
              Transactions
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
              {transactions.map((tx: TransactionData) => (
                <TableRow
                  key={tx.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TxRow
                    id={tx.id}
                    timestamp={tx.timestamp}
                    burns={tx.burns}
                    mints={tx.mints}
                    swaps={tx.swaps}
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

export default TransactionsTable;
