import Search from './components/Search/Search'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Food Search</h1>
        </div>
      </header>
      <main className={styles.main}>
        <Search />
      </main>
    </div>
  )
}

export default App
