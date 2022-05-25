// return convereted data
import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useState } from 'react';

const ConvertButton = ({ children, label }) => {
  return (
    <chakra.button
      border={'1px solid lightgray'}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'blackAlpha.100',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Converter({ data, timeOffset }) {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('Zcash');
  const [toCurrency, setToCurrency] = useState('USD');
  const [error, setError] = useState(false);

  function convertPrice(amount, fromCurrency, toCurrency) {
    let fromCurrencyUSD = 1;
    if (fromCurrency === 'USD') fromCurrencyUSD = 1;
    else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === fromCurrency)
          fromCurrencyUSD = data[i]['priceUSD'];
      }
    }

    let toCurrencyUSD = 1;
    if (toCurrency === 'USD') toCurrencyUSD = 1;
    else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === toCurrency) toCurrencyUSD = data[i]['priceUSD'];
      }
    }
    try {
      return (amount * fromCurrencyUSD) / toCurrencyUSD;
    } catch (error) {
      setError(error);
      return null;
    }
  }

  function fromCurrencyHandleChange(e) {
    setFromCurrency(e.target.value);
  }

  function toCurrencyHandleChange(e) {
    setToCurrency(e.target.value);
  }

  function handleButtonClick() {
    let temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <Flex
      minH={'40vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      marginBottom={{ base: 0, sm: 12 }}
    >
      <Container
        maxW={'4xl'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} mb={5}>
          Convert Zcash
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
          <FormControl>
            <FormLabel> Amount</FormLabel>
            <InputGroup>
              <Input
                placeholder="1"
                onChange={e => setAmount(parseInt(e.target.value))}
              />
            </InputGroup>
          </FormControl>

          <FormControl w={{ base: '100%' }}>
            <FormLabel htmlFor="to">From</FormLabel>
            <Select onChange={fromCurrencyHandleChange} value={fromCurrency}>
              <option value="USD">🇺🇸 USD - US Dollar</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Tether">Tether</option>
              <option value="BNB">BNB</option>
              <option value="Zcash">Zcash</option>
            </Select>
          </FormControl>

          <Box display="flex" alignItems={'flex-end'}>
            <FormControl w={{ base: '10%' }}>
              <ConvertButton label={'convert'}>
                <RepeatIcon color="blue.500" onClick={handleButtonClick} />
              </ConvertButton>
            </FormControl>
          </Box>

          <FormControl w={{ base: '100%' }}>
            <FormLabel htmlFor="to">To</FormLabel>
            <Select onChange={toCurrencyHandleChange} value={toCurrency}>
              <option value="USD">🇺🇸 USD - US Dollar</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Tether">Tether</option>
              <option value="BNB">BNB</option>
              <option value="Zcash">Zcash</option>
            </Select>
          </FormControl>
        </Stack>
        <Text mt={2}>
          {amount} {fromCurrency} ={' '}
          {convertPrice(amount, fromCurrency, toCurrency)} {toCurrency}
        </Text>
        <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}
        >
          Last updated on {timeOffset} seconds ago
        </Text>
      </Container>
    </Flex>
  );
}
