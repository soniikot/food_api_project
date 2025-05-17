import { Ingredient } from 'hooks/useFetch'
import styles from './FoodCart.module.css'

interface FoodCartProps {
  ingredient: Ingredient
}

export const FoodCart = ({ ingredient }: FoodCartProps) => {
  return (
    <div key={ingredient.id} className={styles.foodItem}>
      <h3>{ingredient.name}</h3>
      {ingredient.image && (
        <img
          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
          alt={ingredient.name}
          className={styles.ingredientImage}
        />
      )}
      {ingredient.nutrients && (
        <div className={styles.nutrients}>
          <p>Calories: {Math.round(ingredient.nutrients.calories)} kcal</p>
          <p>Protein: {Math.round(ingredient.nutrients.protein)}g</p>
          <p>Fat: {Math.round(ingredient.nutrients.fat)}g</p>
          <p>Carbs: {Math.round(ingredient.nutrients.carbs)}g</p>
        </div>
      )}
    </div>
  )
}
