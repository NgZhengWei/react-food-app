import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);

  const {
    isLoading: mealsIsLoading,
    error: mealsError,
    sendRequest: getMealsData,
  } = useHttp();

  useEffect(() => {
    getMealsData(
      {
        url: 'https://react-learning-4d125-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
      },
      (data) => {
        const meals = [];
        for (const key in data) {
          meals.push(
            <MealItem
              id={key}
              key={key} //key prop is not accessible in component
              name={data[key].name}
              description={data[key].description}
              price={data[key].price}
            />
          );
        }

        setMealsList(meals);
      }
    );
  }, [getMealsData]);

  function displayMealsList() {
    if (mealsIsLoading) {
      return <p>Loading...</p>;
    } else if (mealsError) {
      return <p className={classes['error-text']}>{mealsError}</p>;
    } else if (mealsList.length === 0) {
      return <p>No meals found</p>;
    } else {
      return <ul>{mealsList}</ul>;
    }
  }

  return (
    <section className={classes.meals}>
      <Card>{displayMealsList()}</Card>
    </section>
  );
};

export default AvailableMeals;
