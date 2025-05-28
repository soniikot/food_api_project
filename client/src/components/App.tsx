import { Search } from './Search/Search';
import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles.container}>
      <Search />
    </div>
  );
};

export default App;
