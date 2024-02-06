import axios from "axios";

const getRandomMeal = async () => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default getRandomMeal;