import { useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export interface Ingredient {
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

interface UseIngredientsReturn {
  foodData: Ingredient[]
  loading: boolean
  error: string
  searchIngredients: (query: string) => Promise<void>
}

export function useFetch(): UseIngredientsReturn {
  const [foodData, setFoodData] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchIngredients = async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.get(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`
      )
      setFoodData(response.data.results || [])
    } catch (err) {
      setError('Failed to fetch ingredient data. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    foodData,
    loading,
    error,
    searchIngredients
  }
}
