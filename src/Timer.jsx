import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import Countdown from 'react-countdown';
import { formatDistanceToNow, compareAsc } from 'date-fns';
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
  const isBeforeClose =
    compareAsc(new Date().now, new Date(year, month - 1, date, 13, 0, 0)) === 1;
  return (
    <>
      <Text>
        Is market open: {!isLoading && data ? data.isTheStockMarketOpen : null}
      </Text>
      <Text>Time until Market {isBeforeClose ? 'Close' : 'Open'}</Text>
      <Text>{isBeforeClose ? timeToClose : timeToOpen}</Text>
    </>
  );
}
