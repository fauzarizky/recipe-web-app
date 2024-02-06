import axios from "axios";

const getMealByIngredients = async (ingredient) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getMealByIngredients;
