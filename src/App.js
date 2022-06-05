import {
  Box,
  ChakraProvider,
  theme,
  Center,
  Text,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Converter from './components/Converter';
import Footer from './components/Footer';
import AppBar from './components/Navbar/AppBar';
import Table from './components/Table';
import PostEntry from './components/PostEntry';
import AdContainer from './components/AdContainer';
function App() {
  const [data, setData] = useState([]);
  const [lastRefreshedDate, setLastRefreshedDate] = useState();
  const [error, setError] = useState(false);
  const timeOffset = Math.trunc(
    (new Date().getTime() - parseInt(lastRefreshedDate)) / 1000
  );
  const [ad, setAd] = useState();

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

    const adUrl = 'https://cmc-api-backend.herokuapp.com/getMostRecentMessage';
    fetch(adUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/text' },
    })
      .then(res => res.text())
      .then(ad => setAd(ad))
      .then(console.log(ad))
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
            <AdContainer ad={ad} />
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
