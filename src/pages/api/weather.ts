import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const API_KEY = process.env.API_KEY
    const BASE_URL = process.env.BASE_URL
    const city = req.query.city as string

    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&api=no`
      )
      const data = response.data
      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      res.status(500).json({ error: 'Failed to fetch weather data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
