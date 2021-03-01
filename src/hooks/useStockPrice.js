import { useQuery } from 'react-query';
import axios from 'axios';

const getPriceByTicker = async (ticker) => {
  const { data } = await axios.get(
    `quote-short/${ticker}?apikey=132985ed4e5ac41ab20c94d7a320d936`,
  );
  return data;
};

export default function useStockPrice(ticker) {
  return useQuery(['stockPrice', ticker], () => getPriceByTicker(ticker), {
    enabled: ticker.length > 2,
  });
}
