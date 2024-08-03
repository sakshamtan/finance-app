import { useDispatch } from 'react-redux';
import { setSymbol } from '../redux/stockSlice';

const StockSelector = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(event.target.value));
  };

  return (
    <div className="relative overflow-x-auto m-8">
      <label htmlFor="stock">Choose a cryptocurrency:</label>
      <select className="border-b-2 border-gray-200 bg-gray-100" id="stock" onChange={handleChange}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="ripple">Ripple</option>
        <option value="litecoin">Litecoin</option>
        <option value="bitcoin-cash">Bitcoin Cash</option>
      </select>
    </div>
  );
};

export default StockSelector;
