import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaDiscord, FaReddit, FaShoppingBag, FaTwitter } from 'react-icons/fa';
import { Logo } from '../Logo';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo h={6} />
        <Text>© 2022 Zcash Users Group. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'ShoppingLink'}
            href={'https://www.bonfire.com/store/zcashu/'}
          >
            <FaShoppingBag />
          </SocialButton>
          <SocialButton
            label={'RedditLink'}
            href={'https://reddit.com/r/zcash/'}
          >
            <FaReddit />
          </SocialButton>
          <SocialButton
            label={'TwitterLink'}
            href={'https://twitter.com/zcashug'}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'DiscordLink'} href={'#'}>
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
