import type { NextPage } from 'next';
import StockTable from '../components/StockTable';
import StockSelector from '../components/StockSelector';

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="m-8">Real-Time Cryptocurrency Prices</h1>
      <StockSelector />
      <StockTable />
    </div>
  );
};

export default Home;
