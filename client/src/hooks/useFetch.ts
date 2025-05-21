import { useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export interface Food {
  id: number
  title: string
  image: string
  servings: number
  nutrition: {
    nutrients: {
      amount: number
    }[]
  }
}

interface UseIngredientsReturn {
  foodData: Food[]
  loading: boolean
  error: string
  searchIngredients: (query: string) => Promise<void>
}

export function useFetch(): UseIngredientsReturn {
  const [foodData, setFoodData] = useState<Food[]>([])
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
