import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const parseTime = time => {
  const d = new Date(time * 1000);
  return d;
};

const adBlock = ad => {
  return (
    <Container width={'lg'} id={1} margin={0} padding={0}>
      <Heading
        as={'h1'}
        fontSize={{ base: 'xl', sm: '2xl' }}
        mb={5}
        color="teal"
      >
        {ad.message}{' '}
      </Heading>
      <Text>Amount: {ad.amount}</Text>
      <Text color={'teal.400'}>
        Submitted {parseTime(ad.post_time).toLocaleString()}
      </Text>
    </Container>
  );
};
export default function AdsContainer({ ads }) {
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      padding={4}
    >
      <Container
        maxW={'6xl'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        padding={4}
      >
        <Flex dir="row" justify={'space-around'}>
          {adBlock(ads.at(-1))}
          <Center height="100px">
            <Divider orientation="vertical" />
          </Center>
          {adBlock(ads.at(-2))}
        </Flex>
      </Container>
    </Flex>
    // <Flex
    //   align={'center'}
    //   justify={'center'}
    //   bg={useColorModeValue('gray.50', 'gray.800')}
    //   padding={4}
    // >
    //   {ads?.map((ad, index) => (
    //     <Container
    //       maxW={'6xl'}
    //       bg={useColorModeValue('white', 'whiteAlpha.100')}
    //       boxShadow={'xl'}
    //       rounded={'lg'}
    //       p={6}
    //       direction={'column'}
    //       key={index}
    //       maxW={'sm'}
    //       bg="white"
    //       _dark={{ bg: 'whiteAlpha.100' }}
    //       boxShadow={'xl'}
    //       rounded={'lg'}
    //       p={6}
    //       direction={'column'}
    //     >
    //       <Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} mb={5}>
    //         {ad.message}
    //       </Heading>
    //       <Text>Amount: {ad.amount}</Text>
    //       <Text>Submitted {parseTime(ad.post_time).toLocaleString()}</Text>
    //     </Container>
    //   ))}
    // </Flex>
  );
}
