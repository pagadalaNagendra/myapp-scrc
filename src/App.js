import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicArea() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
// export default App;


import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import Navbar from './components/navbar/navbar';
import './lineChart.css';

function LineChart() {
  const [Fruits, setFruits] = useState([]);
  const [Quantatiny, setQuantatiny] = useState([]);

  useEffect(() => {
    const sFruits = [];
    const sQuantatiny = [];

    const getFruitsData = async () => {
      const reqData = await fetch("http://127.0.0.1:5000/get-data");
      const resData = await reqData.json();
      console.log(resData);

      // Calculate average for repeated questions
      const fruitMap = new Map();
      const fruitAverageMap = new Map();

      for (let i = 0; i < resData.length; i++) {
        const question = resData[i].question;
        const answer = parseInt(resData[i].answer);

        if (fruitMap.has(question)) {
          const total = fruitMap.get(question) + answer;
          const count = fruitAverageMap.get(question) + 1;
          fruitMap.set(question, total);
          fruitAverageMap.set(question, count);
        } else {
          fruitMap.set(question, answer);
          fruitAverageMap.set(question, 1);
        }
      }

      fruitMap.forEach((total, question) => {
        sFruits.push(question);
        const average = total / fruitAverageMap.get(question);
        sQuantatiny.push(average);
      });

      setFruits(sFruits);
      setQuantatiny(sQuantatiny);
    };

    getFruitsData();
  }, []);

  return (
    <React.Fragment>
      <Navbar/>
      <div className="color">
        <h3>Welcome to line chart</h3>
        <Chart
          type="line"
          width={1500}
          height={620}
         
          series={[{ data: Quantatiny }]}
          options={{
            chart: {
              id: "line-chart",
            },
            xaxis: {
              categories: Fruits,
            },
            title: {
              text: "Fruits Line Chart",
            },
            noData: {
              text: "Empty Data",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default LineChart;