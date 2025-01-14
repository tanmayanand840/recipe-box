import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import

export default function Mainpage() {
  const [data, setData] = useState(); // State to store fetched recipe data
  const [search, setSearch] = useState(); // State to store the user's search input

  const handleInput = (event) => {
    setSearch(event.target.value); // Update the search state on input change
  };

  const myFun = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)

    if (!search || search.trim() === "") {
      toast.warn("Please enter the dish name"); // Display warning toast if input is empty
      return; // Exit the function early
    }

    try {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await get.json();

      if (jsonData.meals) {
        setData(jsonData.meals); // Update state with meals data
      } else {
        toast.error("No meals found for the search term"); // Show an error if no meals are found
      }
    } catch (error) {
      toast.error("An error occurred while fetching the data"); // Handle fetch errors
    }
  };

  return (
    <>
      <form onSubmit={myFun}> {/* Form will now handle the submit */}
        <div className='container'>
          <input
            className='search-input'
            placeholder='Enter your dishes'
            onChange={handleInput}
          />
          <button type="submit" className='search-button'>Search</button> {/* Use type="submit" */}
        </div>
      </form>
      <RecipeCard detail={data} /> {/* Pass the fetched data to RecipeCard */}
      <ToastContainer /> {/* Ensure this is in your JSX for toasts to show */}
    </>
  );
}
