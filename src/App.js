import { Box, Center, ChakraProvider, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AdsContainer from './components/AdsContainer';
import ConverterContainer from './components/ConverterContainer';
import Footer from './components/Footer';
import AppBar from './components/Navbar/AppBar';
import PostEntry from './components/PostEntry';
import TableContainer from './components/TableContainer';

const URLS = {
  data: 'https://cmc-api-backend.herokuapp.com/getFeed',
  date: 'https://cmc-api-backend.herokuapp.com/getLastRefreshed',
  ads: 'https://cmc-api-backend.herokuapp.com/getAds',
};

function App() {
  const [data, setData] = useState([]);
  const [lastRefreshedDate, setLastRefreshedDate] = useState();
  const [error, setError] = useState(false);
  const [ads, setAds] = useState();
  const timeOffset = Math.trunc(
    (new Date().getTime() - lastRefreshedDate) / 1000
  );

  useEffect(() => {
    fetch(URLS.data, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => {
        setError(error);
        console.log(error);
      });

    fetch(URLS.date, {
      method: 'GET',
      headers: { 'Content-Type': 'application/text' },
    })
      .then(res => res.text())
      .then(date => setLastRefreshedDate(date))
      .catch(error => {
        setError(error);
        console.log(error);
      });

    fetch(URLS.ads, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(ads => setAds(ads))
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
            <ConverterContainer data={data} timeOffset={timeOffset} />
            <AdsContainer ads={ads} />
            <Box marginX={{ md: 12 }}>
              <TableContainer data={data} />
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
