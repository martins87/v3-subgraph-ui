import { useQuery, gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      mints {
        amount0
        amount1
      }
      burns {
        token0 {
          name
        }
        token1 {
          name
        }
        amount0
        amount1
        amountUSD
      }
      swaps {
        token0 {
          name
        }
        token1 {
          name
        }
        amount0
        amount1
      }
    }
  }
`;

const Transactions = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  console.log("[Transactions]:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>[Transactions] {data.transactions[0].id}</div>
    </>
  );
};

export default Transactions;
