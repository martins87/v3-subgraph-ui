import { FC, useEffect } from "react";
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
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { reduceAddress, truncate } from "../utils";
import { GET_TRANSACTIONS } from "../dataModels";

const headerTitles: string[] = [
  "Tx Hash",
  "Timestamp",
  "From",
  "Total Value",
  "Action",
  "Token 0",
  "Amount",
  "Token 1",
  "Amount",
];

export type TransactionData = {
  id: string;
  timestamp: string;
  burns: any;
  mints: any;
  swaps: any;
};

export type ReducedCellProps = {
  value: string;
  size: number;
};

const ReducedCellData: FC<ReducedCellProps> = ({ value, size }) => {
  return (
    <TableCell>
      <Tooltip title={value} placement="top">
        <Box>{truncate(value, size)}</Box>
      </Tooltip>
    </TableCell>
  );
};

const TxRow: FC<TransactionData> = ({ timestamp, burns, mints, swaps }) => {
  let actionDescription: string = "";
  let action = null;
  if (burns.length > 0) {
    action = burns;
    actionDescription = "Burn";
  } else if (swaps.length > 0) {
    action = swaps;
    actionDescription = "Swap";
  } else if (mints.length > 0) {
    action = mints;
    actionDescription = "Mint";
  }
  let fromAddress: string = action[0].origin;
  let totalValue: string = action[0].amountUSD;
  let token0: string = action[0].token0.name;
  let token1: string = action[0].token1.name;
  let amount0: string = action[0].amount0;
  let amount1: string = action[0].amount1;

  //   console.log("action:", action);

  return (
    <>
      <TableCell>{timestamp}</TableCell>
      <TableCell>
        <Link href={"https://etherscan.io/tx/" + fromAddress}>
          {reduceAddress(fromAddress)}
        </Link>
      </TableCell>
      <TableCell>${(+totalValue).toFixed(2)}</TableCell>
      <TableCell>{actionDescription}</TableCell>
      <ReducedCellData value={token0} size={14} />
      <ReducedCellData value={amount0} size={10} />
      <ReducedCellData value={token1} size={14} />
      <ReducedCellData value={amount1} size={10} />
    </>
  );
};

// https://info.uniswap.org/#/
const Transactions = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  //   console.log("[Transactions]:", data);

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
              {data.transactions.map((tx: TransactionData) => (
                <TableRow
                  key={tx.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={"https://etherscan.io/tx/" + tx.id}>
                      {reduceAddress(tx.id)}
                    </Link>
                  </TableCell>
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

export default Transactions;
