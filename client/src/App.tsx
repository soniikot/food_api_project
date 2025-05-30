import { Search } from './components/Search/Search';
import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Recipe Search</h1>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.subtitle}>
          Enter the ingredients you have and we find you three least calories
          recipe in our database
        </p>
        <Search />
      </main>
    </div>
  );
};
