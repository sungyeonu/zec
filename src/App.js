import { Box, ChakraProvider, theme, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Converter from './components/Converter';
import Footer from './components/Footer';
import AppBar from './components/Navbar/AppBar';
import Table from './Table';
import PostEntry from './components/PostEntry';

function App() {
  const [data, setData] = useState([]);
  const [lastRefreshedDate, setLastRefreshedDate] = useState();
  const [error, setError] = useState(false);
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
      .catch(error => {
        setError(error);
        console.log(error);
      });

    const dateUrl = 'https://cmc-api-backend.herokuapp.com/getLastRefreshed';
    fetch(dateUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/text' },
    })
      .then(res => res.text())
      .then(date => setLastRefreshedDate(date))
      .catch(error => {
        setError(error);
        console.log(error);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <>
        {!error ? (
          <>
            <Converter data={data} timeOffset={timeOffset} />
            <Box marginX={{ md: 12 }}>
              <Table data={data.slice(0, 40)} />
            </Box>
            <Box marginY={12}>
              <PostEntry />
            </Box>
          </>
        ) : (
          <Center height={'90vh'}>
            <h1> Oops... There is an error!</h1>
          </Center>
        )}
      </>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
