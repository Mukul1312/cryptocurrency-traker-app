import React, {useEffect} from 'react'
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css'

import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News } from './components';

const App = () => {

  let location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
     
  }, [location.pathname])
  
  return (  
    <>
      <div className='app'>
          <div className='navbar'>
              <Navbar location={location} />
          </div>
          <div className='main'>
            <Layout>
              <div className='routes'>
                <Routes>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                  <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                  <Route path='/news' element={<News />} />
                </Routes>
              </div>
            </Layout>  
            <div className='footer'>
              <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
                CryptoVerse <br />
                All Rights Reserved
              </Typography.Title>
              <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/news'>News</Link>
              </Space>
            </div>
          </div>
      </div>
    </>
  );
}

export default App