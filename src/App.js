import { Box, ChakraProvider, Text, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Table from './Table';
import Table2 from './SortTable';
import AppBar from './components/Navbar/AppBar';
import Footer from './Footer';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'https://cmc-api-backend.herokuapp.com/getFeed';
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <Box minH="100vh" justifyContent="center">
        <Table data={data} />
      </Box>
      <Box>
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
