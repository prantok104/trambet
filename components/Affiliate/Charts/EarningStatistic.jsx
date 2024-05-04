import Card from '@/components/Card';
import React from 'react'
import LineChart from './LineChart';

const EarningStatistic = () => {
   const chartData = [
     {
       name: "01-05-2024",
       value: 25,
     },
     {
       name: "02-05-2024",
       value: 14,
     },
     {
       name: "03-05-2024",
       value: 30,
     },
     {
       name: "04-05-2024",
       value: 18,
     },
     {
       name: "05-05-2024",
       value: 22,
     },
     {
       name: "06-05-2024",
       value: 35,
     },
     {
       name: "07-05-2024",
       value: 28,
     },
     {
       name: "08-05-2024",
       value: 20,
     },
     {
       name: "09-05-2024",
       value: 32,
     },
     {
       name: "10-05-2024",
       value: 15,
     },
     {
       name: "11-05-2024",
       value: 27,
     },
     {
       name: "12-05-2024",
       value: 23,
     },
     {
       name: "13-05-2024",
       value: 19,
     },
     {
       name: "14-05-2024",
       value: 29,
     },
     {
       name: "15-05-2024",
       value: 31,
     },
     {
       name: "16-05-2024",
       value: 26,
     },
     {
       name: "17-05-2024",
       value: 17,
     },
     {
       name: "18-05-2024",
       value: 21,
     },
     {
       name: "19-05-2024",
       value: 24,
     },
     {
       name: "20-05-2024",
       value: 33,
     },
     {
       name: "21-05-2024",
       value: 16,
     },
     {
       name: "22-05-2024",
       value: 34,
     },
     {
       name: "23-05-2024",
       value: 37,
     },
     {
       name: "24-05-2024",
       value: 40,
     },
     {
       name: "25-05-2024",
       value: 38,
     },
     {
       name: "26-05-2024",
       value: 36,
     },
     {
       name: "27-05-2024",
       value: 39,
     },
     {
       name: "28-05-2024",
       value: 41,
     },
     {
       name: "29-05-2024",
       value: 45,
     },
     {
       name: "30-05-2024",
       value: 42,
     },
     {
       name: "31-05-2024",
       value: 43,
     },
   ];

  return (
    <Card header={"Earning Statistic"}>
      <LineChart header={"Earning Statistic"} chartData={chartData} />
    </Card>
  );
}

export default EarningStatistic