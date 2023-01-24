import { useQuery, gql } from "@apollo/client";

const GET_TOKENS_AVAILABLE = gql`
  {
    tokens(orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      name
      symbol
      totalValueLockedUSD
    }
  }
`;

const TokensAvailable = () => {
  const { loading, error, data } = useQuery(GET_TOKENS_AVAILABLE);
  console.log("[TokensAvailable]:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div>[TokensAvailable] {data.tokens[0].id}</div>;
};

export default TokensAvailable;
