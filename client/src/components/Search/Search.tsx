import { useState } from 'react'
import styles from './search.module.css'
import { useFetch, Ingredient } from '../../hooks/useFetch'
import { FoodCart } from '../FoodCart/FoodCart'

const Input = () => {
  const [query, setQuery] = useState('')
  const { foodData, loading, error, searchIngredients } = useFetch()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
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
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {foodData.length > 0 && (
        <div className={styles.results}>
          {foodData.map((ingredient: Ingredient) => (
            <FoodCart key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Input
