// components/BarChart.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null); // Tham chiếu đến thẻ canvas

  useEffect(() => {
    const ctx = chartRef.current;
    // Khởi tạo biểu đồ
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
          'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
          'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        datasets: [{
          label: '# of Votes',
          data: [108000000, 119000000, 118000000, 7890000, 90000000, 118000000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup khi unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div className='w-full border border-gray-300 rounded-xl p-4 shadow-md bg-white'>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default BarChart;
