import { SearchHistory } from '../../hooks/useFetch';
import styles from './dropdown.module.css';

interface SearchDropdownProps {
  isVisible: boolean;
  recentSearches: SearchHistory[];
  onSearchSelect: (searchQuery: string) => void;
}

export const Dropdown = ({
  isVisible,
  recentSearches,
  onSearchSelect,
}: SearchDropdownProps) => {
  if (!isVisible) return null;

  return (
    <div className={styles.dropdown}>
      {recentSearches.length > 0 ? (
        recentSearches.map((search) => (
          <div
            key={search.id}
            onClick={() => onSearchSelect(search.search_query)}
            className={styles.dropdownItem}
          >
            {search.search_query}
          </div>
        ))
      ) : (
        <div className={styles.dropdownItem}>No recent searches</div>
      )}
    </div>
  );
};
