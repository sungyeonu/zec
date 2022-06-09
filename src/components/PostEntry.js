import {
  Box,
  chakra,
  Textarea,
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
} from '@chakra-ui/react';

import { useState } from 'react';
import QRCode from 'qrcode.react';
import URLSafeBase64 from 'urlsafe-base64';
import base64 from 'react-native-base64';
//const boardZaddr =
//  'zs1exqwtshqjatwm2ycwvp5vvk4s5ntzxnxju2qm2k4d53t72f8g3syqxhtwzxpum60vfvmk4fn4e6';

const boardZaddr =
  'zs14j8snu93pekhyraazwjfrn627dq4dpuhw0p52jvhg0vwefkl9pc6vt9xqmlh35ny8ajkgdtvedz';
const amount = 0.01;

export default function PostEntry() {
  const [text, setText] = useState('');

  return (
    <Flex
      minH={'10vh'}
      align={'center'}
      justify={'center'}
      //   bg={useColorModeValue('', 'gray.800')}
      marginBottom={{ base: 0, sm: 0 }}
    >
      <Container
        maxW={'4xl'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={3}
        direction={'column'}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={12}
          spacing={'12px'}
        >
          <FormControl>
            <FormLabel>
              {' '}
              Want your ad seen? Write your message and scan the QR code below:
            </FormLabel>
            <InputGroup>
              <Textarea
                placeholder="Enter your shielded message here"
                onChange={e => setText(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <QRCode
            bgColor={'#111111'}
            fgColor={'#ffffff'}
            style={{ display: 'inline-block', margin: '0 auto' }}
            includeMargin={true}
            size={128}
            value={`zcash:${boardZaddr}?amount=${amount}&memo=${base64.encode(
              `ZMC::${text}`
            )}`}
          />
        </Stack>

        <Text fontSize="xs">Current price to pin: {amount} ZEC</Text>
      </Container>
    </Flex>
  );
}
