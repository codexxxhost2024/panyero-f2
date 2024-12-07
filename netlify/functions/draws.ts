import { Handler } from '@netlify/functions';
import { createClient } from '@libsql/client';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { format, isAfter } from 'date-fns';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

const DRAW_TIMES = [
  { id: '11am', time: '11:00', label: '11:00 AM Draw' },
  { id: '4pm', time: '16:00', label: '4:00 PM Draw' },
  { id: '9pm', time: '21:00', label: '9:00 PM Draw' }
];

const getPhilippineTime = () => {
  const now = new Date();
  return utcToZonedTime(now, 'Asia/Manila');
};

export const handler: Handler = async (event) => {
  try {
    // Get current Philippine time
    const phTime = getPhilippineTime();
    const currentTimeStr = format(phTime, 'HH:mm');

    // Filter available draw times
    const availableDraws = DRAW_TIMES.filter(draw => {
      const drawTime = zonedTimeToUtc(`${format(phTime, 'yyyy-MM-dd')} ${draw.time}`, 'Asia/Manila');
      return isAfter(drawTime, phTime);
    });

    // Get latest results
    const latestResults = await client.execute(`
      SELECT * FROM draw_results 
      ORDER BY draw_time DESC 
      LIMIT 1
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        availableDraws,
        latestResults: latestResults.rows[0] || null,
        currentTime: currentTimeStr
      })
    };
  } catch (error) {
    console.error('Error in draws function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};