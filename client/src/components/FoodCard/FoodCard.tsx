import { Food } from 'hooks/useFetch';
import styles from './FoodCart.module.css';

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onClick }) => {
  return (
    <div key={food.id} className={styles.foodItem} onClick={onClick}>
      <div className={styles.foodInfo}>
        <h3 className={styles.foodTitle}>{food.title}</h3>
        <p>Calories: {Math.round(food.nutrition.nutrients[0].amount)} kcal</p>
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
