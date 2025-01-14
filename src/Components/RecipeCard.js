import React from 'react'
import { NavLink } from 'react-router-dom';

export default function RecipeCard({detail}) {  
  console.log(detail);
  return (
    <>
    <div className='meals'>
      {
        (!detail)
        ?
        ""
        :
        detail.map((item)=>{
          return(
            <div className='mealCard'>
              <img src={item.strMealThumb}/>
              <p>{item.strMeal}</p>
              <NavLink to={`/${item.idMeal}`} style={{textDecoration:'none'}}><button>Recipe</button></NavLink>
            </div>
          );
        })
      }
    </div>
    </>
  )
}
