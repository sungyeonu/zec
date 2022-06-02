import React from 'react';
import { Image } from '@chakra-ui/react';
import lightLogo from './zmc_black.png';
import darkLogo from './zmc_white.png';
import { useColorModeValue } from '@chakra-ui/react';
export const Logo = props => {
  const logo = useColorModeValue(lightLogo, darkLogo);

  return <Image src={logo} {...props} />;
};
