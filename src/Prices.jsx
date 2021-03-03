import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useStockPrice from './hooks/useStockPrice';

const percentages = [0.35, 0.3, 0.25, 0.2, 0.15, 0.1];

export default function Prices() {
  const [price, setPrice] = useState('');
  const [ticker, setTicker] = useState('');
  const [percentage, setPercentage] = useState(0.3);
  const { data, isLoading } = useStockPrice(ticker);

  const isSafe = percentage < 0.25;

  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box borderRadius="10px" p={10} bg="gray.900">
        <Heading>Stocks Info</Heading>
        <Input
          value={ticker}
          onChange={(v) => setTicker(v.target.value.toUpperCase())}
          variant="filled"
          placeholder="Ticker"
          bg={'gray.800'}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          maxW="25%"
        />
        {!isLoading && data && data[0] ? (
          <Stat>
            <StatLabel>{ticker}</StatLabel>
            <StatNumber>{data[0].price}</StatNumber>
            <StatHelpText>Stock Price</StatHelpText>
          </Stat>
        ) : null}
      </Box>

      <Box borderRadius="10px" p={10} bg="gray.900">
        <Heading>Options Info</Heading>
        <NumberInput
          value={price}
          onChange={(v) => setPrice(v)}
          variant="filled"
          bg={'gray.800'}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          maxW="25%"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <ButtonGroup size="sm" isAttached variant="outline">
          {percentages.map((p) => (
            <Button mr="-px" onClick={() => setPercentage(p)}>{`${
              p * 100
            }%`}</Button>
          ))}
        </ButtonGroup>
        {price ? (
          <Stat>
            <StatLabel>{percentage * 100}%</StatLabel>
            <StatNumber>
              ${Math.round((price - percentage * price) * 100) / 100}
            </StatNumber>
            <Badge colorScheme={isSafe ? 'green' : 'red'}>
              {isSafe ? 'safe' : 'risky'}
            </Badge>
          </Stat>
        ) : null}
        {/* <HStack>
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
        </HStack> */}
      </Box>
    </SimpleGrid>
  );
}
