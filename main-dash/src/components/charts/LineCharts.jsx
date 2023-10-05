import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Page A',
    value: 100,
  },
  {
    name: 'Page B',
    value: 100,
  },
  {
    name: 'Page C',
    value: 200,
  },
  {
    name: 'Page D',
    value: 400,
  },
  {
    name: 'Page E',
    value: 450,
  },
  {
    name: 'Page F',
    value: '100'
  },
];


function LineCharts() {
  return (
    <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  )
}

export default LineCharts