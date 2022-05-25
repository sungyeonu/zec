import { Box, ChakraProvider, Text, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Converter from './components/Converter';
import Footer from './components/Footer';
import AppBar from './components/Navbar/AppBar';
import Table from './Table';
function App() {
  const [data, setData] = useState([]);
  const [lastRefreshedDate, setLastRefreshedDate] = useState();
  const timeOffset = Math.trunc(
    (new Date().getTime() - parseInt(lastRefreshedDate)) / 1000
  );

  useEffect(() => {
    const dataUrl = 'https://cmc-api-backend.herokuapp.com/getFeed';
    fetch(dataUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error));

    const dateUrl = 'https://cmc-api-backend.herokuapp.com/getLastRefreshed';
    fetch(dateUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/text' },
    })
      .then(res => res.text())
      .then(date => setLastRefreshedDate(date))
      .catch(error => console.log(error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <Converter data={data} timeOffset={timeOffset} />
      <Box marginX={{ md: 12 }}>
        <Table data={data} />
      </Box>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
