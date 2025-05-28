import { useState, useEffect, useRef } from 'react';
import styles from './search.module.css';
import { useFetch, Food } from '../../hooks/useFetch';
import { FoodCard } from '../FoodCard/FoodCard';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    foodData,
    loading,
    error,
    recentSearches,
    searchIngredients,
    getRecentSearches,
  } = useFetch();

  useEffect(() => {
    getRecentSearches();
  }, [getRecentSearches]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    await searchIngredients(query);
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    setShowDropdown(false);
    searchIngredients(searchQuery);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchBox}>
        <div className={styles.searchInputContainer} ref={dropdownRef}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search for ingredients..."
            className={styles.searchInput}
          />
          {showDropdown && recentSearches.length > 0 && (
            <div className={styles.dropdown}>
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  onClick={() => handleRecentSearchClick(search.search_query)}
                  className={styles.dropdownItem}
                >
                  {search.search_query}
                </div>
              ))}
            </div>
          )}
        </div>
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
  );
};
