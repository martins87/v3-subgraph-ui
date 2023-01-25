import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_TRANSACTIONS } from "../../queries";
import TransactionsTable from "./TransactionsTable";
import Pagination from "../Table/Pagination";

const Transactions = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, _] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginate = (pageNumber: number) => {
    let nextPage: number =
      pageNumber < 1
        ? 1
        : pageNumber > Math.ceil(data.transactions.length / rowsPerPage)
        ? Math.ceil(data.transactions.length / rowsPerPage)
        : pageNumber;
    setCurrentPage(nextPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleReload = () => console.log("reloading data...");

  return (
    <>
      <TransactionsTable
        transactions={data.transactions.slice(indexOfFirstRow, indexOfLastRow)}
      />

      <Pagination
        paginate={paginate}
        totalRows={data.transactions.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default Transactions;
