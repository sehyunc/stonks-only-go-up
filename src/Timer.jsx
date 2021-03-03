import { Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import useTradingHours from './hooks/useTradingHours';

export default function Timer() {
  const { data, isLoading } = useTradingHours();
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
  const timeToClose = formatDistanceToNow(
    new Date(year, month - 1, date, 13, 0, 0),
    {
      includeSeconds: true,
    },
  );
  const timeToOpen = formatDistanceToNow(
    new Date(year, month - 1, parseInt(date) + 1, 6, 30, 0),
    {
      includeSeconds: true,
    },
  );
  // const isBeforeClose =
  //   compareAsc(new Date().now, new Date(year, month - 1, date, 13, 0, 0)) === 1;

  return (
    <>
      <Text fontSize="6xl">
        The market is {data?.isTheStockMarketOpen ? 'open' : 'closed'}
      </Text>
      <Text fontSize="6xl">
        {`There are ${
          data?.isTheStockMarketOpen ? timeToClose : timeToOpen
        } until market ${data?.isTheStockMarketOpen ? 'close' : 'open'}`}
      </Text>
    </>
  );
}
