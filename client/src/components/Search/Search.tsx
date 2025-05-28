import { useState, useEffect, useRef } from 'react';
import styles from './search.module.css';
import { useFetch, Food } from '../../hooks/useFetch';
import { FoodCard } from '../FoodCard/FoodCard';
import { Dropdown } from '../Dropdown/Dropdown';
import { useClickOutside } from '../../hooks/useClickOutside';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setShowDropdown(false));

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
          <Dropdown
            isVisible={showDropdown}
            recentSearches={recentSearches}
            onSearchSelect={handleRecentSearchClick}
          />
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
