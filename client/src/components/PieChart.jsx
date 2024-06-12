import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ data }) => {
  const options = {
    title: {
      text: 'Aplikācijas',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Applications',
        type: 'pie',
        radius: '50%',
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  );
};

export default PieChart;
