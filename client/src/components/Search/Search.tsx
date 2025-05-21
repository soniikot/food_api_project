import { useState } from 'react'
import styles from './search.module.css'
import { useFetch, Food } from '../../hooks/useFetch'
import { FoodCard } from '../FoodCard/FoodCard'

export const Search = () => {
  const [query, setQuery] = useState('')
  const { foodData, loading, error, searchIngredients } = useFetch()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('foodData', foodData)
    await searchIngredients(query)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for ingredients..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {foodData.length > 0 && (
        <div className={styles.results}>
          {foodData.map((food: Food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  )
}
