import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { Input } from '@/components/Input/Input'
import { WeatherCard } from '@/components/WeatherCard/WeatherCard'
import { useGeoLocation } from '@/hooks/useGeoLocation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')
  const { location, error, refresh } = useGeoLocation()

  const handleLocationWeather = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/weatherCords?latitude=${location?.latitude}&longitude=${location?.longitude}`
      )
      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      } else {
        console.error('Error fetching weather data', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (location) {
      handleLocationWeather()
    }
  }, [location])

  const handleFetchWeather = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/weather?city=${city}`)
      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      } else {
        console.error('Error fetching weather data', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (city) {
      handleFetchWeather()
    }
  }

  return (
    <>
      <Head>
        <title>🌧 Another Weather App 😒</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Input city={city} setCity={setCity} handleSearch={handleSearch} />
        <WeatherCard isLoading={isLoading} weatherData={weatherData} />
      </main>
    </>
  )
}
