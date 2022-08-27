import React from 'react';
import { Col, Row, Typography } from 'antd';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    // console.log(coinHistory)

    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    // console.log(coinPrice)
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
    }

    // console.log(coinTimestamp)

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
            {   
            label: 'Price In USD',
            data: coinPrice.reverse(),
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
            },
        ],
    };

    const priceChange = coinHistory?.data?.change;
    
  return (
    <>
        <Row className='chart-header'>
            <Typography.Title level={4} className="chart-title">Price Chart</Typography.Title>
            <Col className='price-container'>
                <Typography.Title level={5} style={{color: priceChange.includes('-') ? 'red' : 'green'}}>{priceChange}%</Typography.Title>
                <Typography.Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Typography.Title>
            </Col>
        </Row>
        <Line data={data}  />
    </>
  )
}

export default LineChart