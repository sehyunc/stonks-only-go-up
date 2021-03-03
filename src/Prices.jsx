import {
  Badge,
  Box,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useStockPrice from './hooks/useStockPrice';

const percentages = [0.35, 0.3, 0.25, 0.2, 0.15, 0.1];

export default function Prices() {
  const [price, setPrice] = useState();
  const [ticker, setTicker] = useState('');
  const { data, isLoading } = useStockPrice(ticker);

  return (
    <VStack align="left">
      <Box>
        <Input
          value={ticker}
          onChange={(v) => setTicker(v.target.value.toUpperCase())}
          variant="filled"
          placeholder="Enter a ticker"
          size="lg"
          maxW="10em"
        />
        {!isLoading && data ? (
          <Stat>
            <StatLabel>{ticker}</StatLabel>
            <StatNumber>{data[0].price}</StatNumber>
            <StatHelpText>Stock Price</StatHelpText>
          </Stat>
        ) : null}
      </Box>
      <Box>
        <NumberInput
          size="lg"
          maxW={32}
          value={price}
          onChange={(v) => setPrice(v)}
          variant="filled"
          maxW="10em"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <HStack>
          {price
            ? percentages.map((p) => {
                const isSafe = p < 0.25;
                return (
                  <>
                    <Stat>
                      <StatLabel>{p * 100}%</StatLabel>
                      <StatNumber>
                        ${Math.round((price - p * price) * 100) / 100}
                      </StatNumber>
                      <Badge colorScheme={isSafe ? 'green' : 'red'}>
                        {isSafe ? 'safe' : 'risky'}
                      </Badge>
                    </Stat>
                  </>
                );
              })
            : null}
        </HStack>
      </Box>
    </VStack>
  );
}
