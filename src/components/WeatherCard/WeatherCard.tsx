import Image from 'next/image'
import styles from './Weather.module.scss'

interface WeatherCardProps {
  isLoading: any
  weatherData: any
}

export const WeatherCard = ({ isLoading, weatherData }: WeatherCardProps) => {
  //   const { country, name, region, tz_id } = weatherData?.location
  //   const { feelslike_f, humidty, wind_dir, wind_mph } = weatherData?.current
  //   const { code, icon, text } = weatherData?.current?.condition
  if (!weatherData) {
    return (
      <div>
        <p>no data</p>
      </div>
    )
  }
  return (
    <div className={styles.weatherCardContainer}>
      <h1>{weatherData?.location?.name}</h1>
      <p>{weatherData?.location?.region}</p>
      <p>{weatherData?.location?.tz_id}</p>
      <p>{weatherData?.location?.country}</p>
      {weatherData?.current?.condition?.icon && (
        <Image
          src={`https:${weatherData?.current?.condition?.icon}`}
          alt="weather"
          width="100"
          height="100"
        />
      )}
      <p>{weatherData?.current.feelslike_f}</p>
      <p>{weatherData?.current.humidty}</p>
      <p>{weatherData?.current.wind_dir}</p>
      <p>{weatherData?.current.wind_mph}</p>

      <p>{weatherData?.current?.condition.text}</p>
    </div>
  )
}
