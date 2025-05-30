import { Food } from 'hooks/useFetch';
import ReactHtmlParser from 'react-html-parser';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  food: Food;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ food }) => {
  return (
    <div className={styles.recipeCard}>
      <h1>{food.title}</h1>
      <img src={food.image} alt={food.title} className={styles.image} />
      <p>{ReactHtmlParser(food.summary)}</p>
    </div>
  );
};
