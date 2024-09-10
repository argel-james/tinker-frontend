import React, { useEffect, useState } from 'react';
import BusStopService from '../services/BusStops';

const BusStops = () => {
  const [busStopsData, setBusStopsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    BusStopService.getBusStopCount()
      .then(data => {
        setBusStopsData(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const getIconForValue = (value) => {
    if (isNaN(value) || value === undefined || value === null) {
      return '💋'; // If value is NaN or doesn't exist
    }
    const intValue = parseInt(value, 10);
    if (intValue >= 0 && intValue <= 7) {
      return <svg className="inline w-6 h-6 stroke-green-500"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>; // Value between 0 and 7
    } else if (intValue >= 8 && intValue <= 14) {
      return <svg className="inline w-6 h-6 stroke-orange-500"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>; // Value between 8 and 14
    } else if (intValue >= 15) {
      return <svg className="inline w-6 h-6 stroke-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>; // Value 15 or greater
    }
  };

  if (loading) return <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white"><p>Loading bus stops...</p></div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white"><p>Error loading bus stops: {error.message}</p></div>;
  if (!busStopsData) return <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white"><p>No data available</p></div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-2xl px-4 sm:px-6 md:px-8 lg:px-10">
        <table className="table-auto border-collapse border border-gray-200 dark:border-gray-700 w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bus Stop</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {Object.entries(busStopsData || {}).map(([stop, count], index) => (
              <tr key={index} className="border-t border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2">{stop}</td>
                <td className="px-4 py-2">
                  {count} {getIconForValue(count)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusStops;
