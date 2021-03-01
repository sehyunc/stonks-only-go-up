import { useQuery } from 'react-query';
import axios from 'axios';

const getTradingHours = async () => {
  const { data } = await axios.get(
    `market-hours?apikey=132985ed4e5ac41ab20c94d7a320d936`,
  );
  return data;
};

export default function useTradingHours() {
  return useQuery(['tradingHours'], () => getTradingHours());
}
