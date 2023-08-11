interface InputProps {
  city?: string
  setCity?: any
  handleSearch?: any
}

export const Input = ({ city, setCity, handleSearch }: InputProps) => {
  const handleInputChange = (e: any) => setCity(e.target.value)

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city name..."
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
