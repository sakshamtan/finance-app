import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setData } from '../redux/stockSlice';
import axios from 'axios';

const StockTable = () => {
  const symbol = useSelector((state: RootState) => state.stock.symbol);
  const data = useSelector((state: RootState) => state.stock.data);
  const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/fetchData');
    })

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`/api/stocks?symbol=${symbol}`);
        dispatch(setData(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5000);

    return () => clearInterval(interval);
  }, [symbol, dispatch]);

  return (

    <div className="relative overflow-x-auto">
    <table className='w-full text-sm text-left rtl:text-right text-white-500 '>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Price (inr)</th>
          <th scope="col" className="px-6 py-3">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 20).map((entry, index) => (
          <tr className="bg-white border-b" key={index}>
            <td className="px-6 py-4">{entry.price}</td>
            <td className="px-6 py-4">{new Date(entry.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default StockTable;
