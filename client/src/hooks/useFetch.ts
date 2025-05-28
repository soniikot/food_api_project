import { useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export interface Food {
  id: number;
  title: string;
  image: string;
  servings: number;
  nutrition: {
    nutrients: {
      amount: number;
    }[];
  };
}

export interface SearchHistory {
  id: number;
  search_query: string;
  search_date: string;
}

interface UseIngredientsReturn {
  foodData: Food[];
  loading: boolean;
  error: string;
  recentSearches: SearchHistory[];
  searchIngredients: (query: string) => Promise<void>;
  getRecentSearches: () => Promise<void>;
}

export function useFetch(): UseIngredientsReturn {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([]);

  const searchIngredients = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
      );
      setFoodData(response.data.results || []);
      await getRecentSearches();
    } catch (err) {
      setError('Failed to fetch ingredient data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecentSearches = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/recent-searches`);
      setRecentSearches(response.data);
    } catch (err) {
      console.error('Error fetching recent searches:', err);
    }
  }, []);

  return {
    foodData,
    loading,
    error,
    recentSearches,
    searchIngredients,
    getRecentSearches,
  };
}
