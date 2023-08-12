import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

interface Location {
  latitude: number
  longitude: number
}

interface GeoLocationHook {
  location: Location | null
  error: string | null
  refresh: () => void
}

export const useGeoLocation = (): GeoLocationHook => {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    setLocation(null)
    setError(null)
  }

  useEffect(() => {
    const storedLatitude = Cookies.get('latitude')
    const storedLongitude = Cookies.get('longitude')

    if (storedLatitude && storedLongitude) {
      setLocation({ latitude: +storedLatitude, longitude: +storedLongitude })
      return
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      Cookies.set('latitude', latitude.toString(), { expires: 1 })
      Cookies.set('longitude', longitude.toString(), { expires: 1 })
      setLocation({ latitude, longitude })
    }

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = 'An unknown error occurred'

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permission to access location was denied'
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable'
          break
        case error.TIMEOUT:
          errorMessage = 'The request to get location timed out'
          break
      }

      setError(errorMessage)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }, [])

  return { location, error, refresh }
}
