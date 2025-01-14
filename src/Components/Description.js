import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Description() {
  const { mealid } = useParams(); // Fetch the `mealid` parameter from the URL
  console.log(mealid); // It will give the id for the particular meal
  const [info, setInfo] = useState(null);

  // Fetch data when `mealid` changes
  useEffect(() => {
    const getInfo = async () => {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
      const jsonData = await get.json();
      console.log(jsonData.meals[0]);
      setInfo(jsonData.meals[0]); // Set the info with fetched data
    };

    if (mealid) {
      getInfo(); // Fetch the data when mealid is available
    }
  }, [mealid]); // Dependency array ensures this runs only when `mealid` changes


  const getIngredients = () => {
    if (!info) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = info[`strIngredient${i}`];
      const measure = info[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <>
      {!info ? (
        "Data Not Found"
      ) : (
        <div className='mealInfo'>
          <img src={info.strMealThumb} alt={info.strMeal} className='meal-img'/>
          <div className='info'>
            <h1>Recipe Details</h1>
            <button>{info.strMeal}</button>
            <h3>Ingredients</h3>
            <ul>
              {getIngredients().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{info.strInstructions}</p>

            <div className='youtube'>
              <p>YouTube Link</p>
              <a href={info.strYoutube}>
                <img src='https://cdn-icons-png.flaticon.com/512/1384/1384060.png'
                style={{width:'50px', height:'50px'}} alt='youtube'
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
