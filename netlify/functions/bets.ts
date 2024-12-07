import { Handler } from '@netlify/functions';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

export const handler: Handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case 'POST':
        const { combination, drawTime, amount } = JSON.parse(event.body || '{}');
        
        await client.execute({
          sql: `INSERT INTO bets (combination, draw_time, amount) VALUES (?, ?, ?)`,
          args: [combination, drawTime, amount]
        });

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Bet placed successfully' })
        };

      case 'GET':
        const result = await client.execute('SELECT * FROM bets ORDER BY created_at DESC');
        
        return {
          statusCode: 200,
          body: JSON.stringify(result.rows)
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};