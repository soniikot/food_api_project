import { useState } from 'react'
import axios from 'axios'
import styles from './input.module.scss'

interface FoodItem {
  food: {
    label: string
    nutrients: {
      ENERC_KCAL: number
      PROCNT: number
      FAT: number
      CHOCDF: number
    }
  }
}

const Input = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.get(
        `http://localhost:3001/api/food/search?query=${encodeURIComponent(
          query
        )}`
      )
      setResults(response.data.hints || [])
    } catch (err) {
      setError('Failed to fetch food data. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((item, index) => (
            <div key={index} className={styles.foodItem}>
              <h3>{item.food.label}</h3>
              <div className={styles.nutrients}>
                <p>
                  Calories: {Math.round(item.food.nutrients.ENERC_KCAL)} kcal
                </p>
                <p>Protein: {Math.round(item.food.nutrients.PROCNT)}g</p>
                <p>Fat: {Math.round(item.food.nutrients.FAT)}g</p>
                <p>Carbs: {Math.round(item.food.nutrients.CHOCDF)}g</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Input
