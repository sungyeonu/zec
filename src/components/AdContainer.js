import {
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Converter({ ad }) {
  return (
    <Flex
      minH={'20vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
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
          Ad from Zcash Group
        </Heading>

        <Text mt={2}>{ad}</Text>
      </Container>
    </Flex>
  );
}
