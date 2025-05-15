import { useState } from 'react'
import axios from 'axios'
import styles from './input.module.scss'

interface Ingredient {
  id: number
  name: string
  image: string
  amount?: number
  unit?: string
  nutrients?: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}

const Input = () => {
  const [query, setQuery] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.get(
        `http://localhost:3001/api/search?query=${encodeURIComponent(query)}`
      )
      setIngredients(response.data.results || [])
    } catch (err) {
      setError('Failed to fetch ingredient data. Please try again.')
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
          placeholder="Search for ingredients..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {ingredients.length > 0 && (
        <div className={styles.results}>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className={styles.foodItem}>
              <h3>{ingredient.name}</h3>
              {ingredient.image && (
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                  alt={ingredient.name}
                  className={styles.ingredientImage}
                />
              )}
              {ingredient.nutrients && (
                <div className={styles.nutrients}>
                  <p>
                    Calories: {Math.round(ingredient.nutrients.calories)} kcal
                  </p>
                  <p>Protein: {Math.round(ingredient.nutrients.protein)}g</p>
                  <p>Fat: {Math.round(ingredient.nutrients.fat)}g</p>
                  <p>Carbs: {Math.round(ingredient.nutrients.carbs)}g</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Input
