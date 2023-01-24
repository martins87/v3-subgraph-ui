import { useQuery, gql } from "@apollo/client";

import { GET_TOKENS_AVAILABLE } from "../dataModels";

const TokensAvailable = () => {
  const { loading, error, data } = useQuery(GET_TOKENS_AVAILABLE);
  console.log("[TokensAvailable]:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div>[TokensAvailable] {data.tokens[0].id}</div>;
};

export default TokensAvailable;
