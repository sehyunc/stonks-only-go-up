import {
  Flex,
  Box,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useStockPrice from './hooks/useStockPrice';

const percentages = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35];

export default function Prices() {
  const [price, setPrice] = useState();
  const [ticker, setTicker] = useState('');
  const { data, isLoading } = useStockPrice(ticker);
  console.log('🚀 ~ file: Prices.jsx ~ line 23 ~ Prices ~ data', data);
  return (
    <>
      <Flex justify="space-between">
        <Box>
          <Input
            value={ticker}
            onChange={(v) => setTicker(v.target.value.toUpperCase())}
            maxW={32}
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
            onChange={(v) => setPrice(parseInt(v))}
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
                  return (
                    <Stat>
                      <StatLabel>{p * 100}%</StatLabel>
                      <StatNumber>${price - p * price}</StatNumber>
                      <StatHelpText>{p < 0.25 ? 'Risky' : 'Safe'}</StatHelpText>
                    </Stat>
                  );
                })
              : null}
          </HStack>
        </Box>
      </Flex>
    </>
  );
}
