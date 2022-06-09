import {
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const parseTime = time => {
  const d = new Date(time * 1000);
  return d;
};
export default function AdsContainer({ ads }) {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      padding={4}
    >
      {ads?.map((ad, index) => (
        <Container
          key={index}
          maxW={'sm'}
          bg="white"
          _dark={{ bg: 'whiteAlpha.100' }}
          boxShadow={'xl'}
          rounded={'lg'}
          p={6}
          direction={'column'}
        >
          <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} mb={5}>
            {ad.message}
          </Heading>
          <Text>Amount: {ad.amount}</Text>
          <Text>Submitted {parseTime(ad.post_time).toLocaleString()}</Text>
        </Container>
      ))}
    </Flex>
  );
}
