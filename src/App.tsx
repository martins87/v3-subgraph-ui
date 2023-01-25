import Transactions from "./components/Transactions";
import TopPools from "./components/TopPools";
import TokensAvailable from "./components/TokensAvailable";

const App = () => {
  return (
    <>
      <TokensAvailable />
      <Transactions />
      <TopPools />
    </>
  );
};

export default App;
