import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
import { useCountFetch } from '@/lib/Query/hooks/useRequest';

const LoginActivityChart = () => {
  const {count}=useCountFetch()
  console.log(count.count);
  
  
  const sampleData = [
    { day: 'prev4', count: 5 },
    { day: 'prev3', count: 8 },
    { day: 'prev2', count: 12 },
    { day: 'prev1', count: 7 },
    { day: 'prev', count: 10 },
    { day: 'yesterday', count: 3 },
    { day: 'today', count: count?.count},
  ];

  const chartData =  sampleData;
  

  const days = chartData.map(item => item.day);
  const counts = chartData.map(item => item.count);

  return (
    <Box style={{ width: '100%', height: "100%" }}>
      <BarChart
        xAxis={[{ 
          scaleType: 'band', 
          data: days,
          label: 'Day of Week'
        }]}
        series={[
          {
            data: counts,
            label: 'Logined users',
            color: '#ff9999',
            valueFormatter: (value) => `${value} logins`,
          },
        ]}
        
        tooltip={{ trigger: 'item' }}
        height={350}
      />
    </Box>
  );
};

export default LoginActivityChart;