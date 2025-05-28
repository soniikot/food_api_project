import { Food } from 'hooks/useFetch';
import styles from './FoodCart.module.css';

interface FoodCardProps {
  food: Food;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div key={food.id} className={styles.foodItem}>
      <div className={styles.foodInfo}>
        <h3 className={styles.foodTitle}>{food.title}</h3>
        <p>
          Calories: {food.nutrition.nutrients[0].amount} kcal per{' '}
          {food.servings} servings
        </p>
      </div>
      {food.image && (
        <div className={styles.imageContainer}>
          <img
            src={`${food.image}`}
            alt={food.title}
            className={styles.ingredientImage}
          />
        </div>
      )}
    </div>
  );
};
