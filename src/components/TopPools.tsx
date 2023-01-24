import { useQuery, gql } from "@apollo/client";

const GET_TOP_POOLS = gql`
  {
    pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
      totalValueLockedUSD
      id
    }
  }
`;

const TopPools = () => {
  const { loading, error, data } = useQuery(GET_TOP_POOLS);
  console.log("[TopPools]:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>[TopPools] {data.pools[0].id}</div>
    </>
  );
};

export default TopPools;
