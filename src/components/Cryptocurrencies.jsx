import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10: 100;
  const {data: cryptoList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    const filteredData = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData)

  }, [cryptoList, searchTerm])
  

  if(isFetching) return <Loader />;


  return (
    <>
      {!simplified && (
        <div className="search-crypto">
        <Input placeholder="Search Cryptocurrencies" onChange={e => setSearchTerm(e.target.value)} />
      </div>
      )}
      
      <Row  gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
            <Col  xs={20} sm={16} md={12} lg={8} xl={4} className="crypto-card" key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>
                    Daily Change: 
                    <span style={{color: currency.change.includes('-') ? 'red' : 'green'}}>
                      {millify(currency.change)}%
                    </span>
                  </p>
                </Card>
              </Link>
            </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies