import React from 'react'
import LineChart from './LineChart';
import Card from '@/components/Card';

const RegistrationStatistic = ({chartData = []}) => {
// const chartData = [
//   {
//     name: "January",
//     value: 10,
//   },
//   {
//     name: "February",
//     value: 0,
//   },
//   {
//     name: "March",
//     value: 3,
//   },
//   {
//     name: "April",
//     value: 5,
//   },
//   {
//     name: "May",
//     value: 7,
//   },
//   {
//     name: "June",
//     value: 6,
//   },
//   {
//     name: "July",
//     value: 10,
//   },
//   {
//     name: "August",
//     value: 20,
//   },
//   {
//     name: "September",
//     value: 15,
//   },
//   {
//     name: "October",
//     value: 26,
//   },
//   {
//     name: "November",
//     value: 20,
//   },
//   {
//     name: "December",
//     value: 8,
//   },
// ];

  return (
    <Card header={"Registration Statistic"}>
      <LineChart header={"Registration Statistic"} chartData={chartData}  />
    </Card>
  );
}

export default RegistrationStatistic