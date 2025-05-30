import { render, screen } from '@testing-library/react';
import { FoodCard } from './FoodCard';

const food = {
  id: 1,
  title: 'Food Title',
  image: 'Food Image',
  servings: 1,
  nutrition: { nutrients: [{ amount: 100 }] },
};

describe('FoodCard', () => {
  it('should render the food card', () => {
    render(<FoodCard food={food} />);
    expect(screen.getByText('Food Title')).toBeInTheDocument();
    expect(screen.getByText('Calories: 100 kcal')).toBeInTheDocument();
    expect(screen.getByAltText('Food Title')).toBeInTheDocument();
  });
});
